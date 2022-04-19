import React, { useEffect,useState } from 'react';
import styles from './shopnow.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { ArrowLeft, Plus } from 'react-feather';
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm,Controller,useFieldArray } from "react-hook-form";
import axios from 'axios';
import Loader from "../../components/loader";
import { useHistory,Link } from "react-router-dom";

function Shopnow() {
  const userDet = localStorage.getItem("userDet");
  const userDetArr = JSON.parse(userDet);
  const router = useHistory();
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      inventory_items: [{ unit: '' }]
    }
  });
  const [categoryList,setCategoryList] = useState({'data':[],'loading':false});
  const [itemList, setItemList] = useState({'data':[],'loading':false});
  const [loading, setLoading] = React.useState(false);
  const { fields, append , remove } = useFieldArray({ control, name: "inventory_items" });

  
  useEffect(() => {
    if(!categoryList.loading){
      fetchInventoryCategories();
    }
  });

  const fetchInventoryCategories = () =>{
    setLoading(true);
    let olist = itemList;
    olist = {...olist,'loading':true};
    setCategoryList(olist);
    axios.get(process.env.REACT_APP_APIURL+'v1/inventory-categories',)
    .then(res => {
      setLoading(false);
      let tempData = res.data.data.map(item =>{
        return {label:item.category_name,value:item.id};
      });
      setCategoryList({'data':tempData,'loading':true});
    }).catch(err =>{
      setLoading(false);
      let olist = categoryList;
      olist = {...olist,'loading':true};
      setCategoryList(olist);
    });
  }

  const fetchInventoryitems = (catId) =>{
    setLoading(true);
    let olist = categoryList;
    olist = {...olist,'loading':true};
    setItemList(olist);
    axios.get(process.env.REACT_APP_APIURL+'v1/inventory-items-by-category/'+catId)
    .then(res => {
      setLoading(false);
      let tempData = res.data.data.map(item =>{
        return {label:item.item_name,value:item.id, current_unit:item.current_unit};
      });
      setItemList({'data':tempData,'loading':true});
    }).catch(err =>{
      setLoading(false);
      let olist = categoryList;
      olist = {...olist,'loading':true};
      setItemList(olist);
    });
  }

  const changeCategory = (item) =>{
    if(item){
      fetchInventoryitems(item.value);
    }else{
      setItemList({'data':[],'loading':true});
    }

    if(fields.length){
      let n =0;
      for(n=(fields.length-1);n >0; n-- ){
        console.log(n);
        remove(n);
      }
    }

    let index =0;

    setValue(`inventory_items.${index}.item`,'');
    setValue(`inventory_items.${index}.unit`, '');
  }

  const onSubmit = data => {
    data = {...data,added_by:userDetArr.id, stock_in_out:2 };
    setLoading(true);
    
    axios.post(process.env.REACT_APP_APIURL+'v1/inventories',data)
    .then(res => {
      setLoading(false);
      router.push('/shop/inventory');
    }).catch(err =>{
      setLoading(false);
      console.log(err);
    });
  }

  return (
    <div className="PageBody">

        {loading && <Loader />}
        <Header />

        <div className="Body">
          <div className="Container">
            <div className={`${styles.HomeButtonArea}`}>
            
              <div className={`${styles.BodyHeadArea}`}>
                <Link to="/shop/inventory" className={`${styles.BackBU}`}><ArrowLeft/></Link>
                <p className={`${styles.ViewUserTitle}`}>Shop Now</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>

              <div className={`${styles.LoginInput}`}>
                  <div className={`${styles.InputArea}`}>
                    <label className={`${styles.FormLabel}`}>Category Name</label>
                    <Controller
                    render={({ field }) => <Autocomplete  {...field} className='LoginInput' id="combo-box-demo"
                    options={categoryList.data}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, options) =>{  if(options){ setValue(`category_id`, options.value); }else{ setValue(`category_id`, ''); } changeCategory(options); }}
                    renderInput={(params) => <TextField {...params} label="Select Category" size="small" variant="outlined" />}
                    />  }
                    {...register("category_id", { required: true })}
                    control={control}
                  />
                  {errors.category_id && <p className="LoginErrorText">Category Can&apos;t Be Blank</p>}
                  </div>
                </div>

                {fields.map((items,index)=>{
                return (<div className={`${styles.LoginInput}`}>

                  <div className={`${styles.InputArea}`}>
                    <label className={`${styles.FormLabel}`}>Select Item</label>
                    <Autocomplete className="LoginInput"
                      id="combo-box-demo"
                      options={itemList.data.filter(item => item.current_unit > 0 )}
                      getOptionLabel={(option) => option.label}
                      onChange={(e, options) =>{  if(options){ setValue(`inventory_items.${index}.item`, options.value); }else{ setValue(`inventory_items.${index}.item`, ''); }  }}
                      renderInput={(params) => <TextField {...params} label="Select Item" size="small" variant="outlined" />}
                  />
                  </div>
                  <div className={`${styles.InputAreaUnit}`}>
                    <label className={`${styles.FormLabel}`}>Units</label>
                    <Controller render={({ field }) => <TextField {...field} value={field.value} onChange={(e) =>{  field.onChange(e.target.value); }} id="outlined-basic" type={'number'} variant="outlined" size="small" className='LoginInput'  />  } name={`inventory_items.${index}.unit`} control={control} />
                </div>

                </div>)
              })}

                <div className={`${styles.LoginInput}`}>
                  <div className={`${styles.InputArea}`}>
                    <Button onClick={() => { append(); }} className={`${styles.LoginBU}`}><Plus/></Button>
                  </div>
                </div>

                <div className={`${styles.LoginInput}`}>
                  <div className={`${styles.InputArea}`}>
                    <Button type="submit" className="LoginBU">Submit</Button>
                  </div>
                </div>
                </form>

            </div>            
          </div>
        </div>
    </div>
  )
}


export default withAuth(Shopnow);
