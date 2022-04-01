import React, { useEffect,useState } from 'react';
import styles from './stockupdate.module.css';
import { ArrowLeft, Plus } from 'react-feather';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Header from "../../components/header";
import Loader from "../../components/loader";
import withAuth from "../../components/withAuth";
import { useHistory,Link } from "react-router-dom";
import moment from 'moment';




function StockUpdate() {
  const router = useHistory();
  const { handleSubmit, control,setValue } = useForm({
    defaultValues: {
      menu_item: [{ unit: 0 }]
    }
  });
  const [itemList,setItemList] = useState({'data':[],'loading':false});
  const { fields, append } = useFieldArray({ control, name: "menu_item" });
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    
    function fetchItems(){
      let iList = itemList;
      iList = {...iList,'loading':true};
      setItemList(iList);
      axios.get(process.env.REACT_APP_APIURL+'v1/items')
      .then(res => {
        let itemList = res.data.data.map((item)=>{
          return {'value':item.id,'label':item.item_name};
        });

        let ilist = {'data': itemList,'loading':true};
        setItemList(ilist);

      }).catch(err =>{
        let iList = itemList;
        iList = {...iList,'loading':false};
        setItemList(iList);
      });
    }

    if(!itemList.loading){
      fetchItems();
    }

  });

  const onSubmit = data => {
    setLoading(true);
    axios.post(process.env.REACT_APP_APIURL+'v1/item-stock-update',data)
    .then(res => {
      setLoading(false);
      router.push('/dashboard');
    }).catch(err =>{
      setLoading(false);
      console.log(err);
    });
  }

  return (
    <div>

        {loading && <Loader />}
        <Header />

        <div className="Body">
          <div className="Container">
            <div className={`${styles.HomeButtonArea}`}>
              
            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Stock Update</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserSubTitle}`}>Date: {moment().format('DD/MM/YYYY')}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

            {fields.map((items,index)=>{
              return (<div key={index} className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
              <Controller
                render={({ field }) => <Autocomplete  {...field} className='LoginInput'
                id="combo-box-demo"
                options={itemList.data}
                getOptionLabel={(option) => option.label}
                onChange={(e, options) =>{  if(options){ setValue(`menu_item.${index}.item`, options.value); }else{ setValue(`menu_item.${index}.item`, 0); } }}
                renderInput={(params) => <TextField {...params} label="Select Item" size="small" variant="outlined" />}
              />  }
                name={`menu_item.${index}.item`}
                control={control}
              />
              </div>
              <div className={`${styles.InputAreaUnit}`}>
              <Controller
                render={({ field }) => <TextField {...field}  type={'number'} id="outlined-basic" label="Unit" variant="outlined" size="small" className='LoginInput' />  }
                name={`menu_item.${index}.unit`}
                control={control}
              />

                             
              </div>

              
            </div>);
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

export default withAuth(StockUpdate);