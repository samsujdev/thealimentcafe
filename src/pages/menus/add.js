import React, { useEffect,useState } from 'react';
import styles from './add.module.css';
import { ArrowLeft, Plus ,Minus} from 'react-feather';
import {  TextField, Button } from '@material-ui/core';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from 'axios';
import Header from "../../components/header";
import Loader from "../../components/loader";
import withAuth from "../../components/withAuth";
import { useHistory,Link } from "react-router-dom";
import Select from 'react-select';

function CeateMenu() {
  const router = useHistory();
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      menu_item: [{item:'',unit: '' }]
    }
  });
  const [itemList,setItemList] = useState({'data':[],'loading':false});
  const { fields, append,remove } = useFieldArray({ control, name: "menu_item" });
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    
    function fetchItems(){
      let ilist = itemList;
      ilist = {...ilist,'loading':true};
      setItemList(ilist);
      axios.get(process.env.REACT_APP_APIURL+'v1/items')
      .then(res => {
        let itemList = res.data.data.map((item)=>{
          return {'value':item.id,'label':item.item_name};
        });

        let ilist = {'data': itemList,'loading':true};
        setItemList(ilist);

      }).catch(err =>{
        let ilist = itemList;
        ilist = {...ilist,'loading':false};
        setItemList(ilist);
      });
    }

    if(!itemList.loading){
      fetchItems();
    }

  });

  const onSubmit = data => {
    setLoading(true);
    axios.post(process.env.REACT_APP_APIURL+'v1/menus',data)
    .then(res => {
      setLoading(false);
      router.push('/menus/list');
    }).catch(err =>{
      setLoading(false);
      console.log(err);
    });
  };

  const onError = error =>{
    console.log(error);
  }

  return (
    <div>

        {loading && <Loader />}
        <Header />

        <div className="Body">
          <div className="Container">
            <div className={`${styles.HomeButtonArea}`}>
              
            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/menus/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Create Menu</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit,onError)}>

            <div className={(errors.menu_name)?`${styles.LoginInput} Error`:`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <TextField id="outlined-basic" label="Menu Name" variant="outlined" size="small" className='LoginInput'  {...register("menu_name", { required: true })} autoComplete="off" /> 
                {errors.menu_name && <p className="LoginErrorText">Menu Name Can&apos;t Be Blank</p>}             
              </div>
            </div>

            {fields.map((items,index)=>{
              return (<div key={items.id} className={`${styles.LoginInput}`}>
              <div className={(errors && errors.menu_item && errors.menu_item.length && errors.menu_item[index]?.item)?`${styles.InputArea} Error`:`${styles.InputArea}`}>
              <Controller
                render={({ field }) => <Select {...field} id="outlined-basi99c" label="Select Item" variant="outlined" size="small" className='LoginInput' options={itemList.data} value={itemList.data.find(c => c.value === field.value)} onChange={val => field.onChange(val.value)} />  }
                name={`menu_item.${index}.item`}
                {...register(`menu_item.${index}.item`, { required: true })}
                control={control}
              />     
               {(errors && errors.menu_item && errors.menu_item.length && errors.menu_item[index]?.item) && <p className="LoginErrorText">Please select Item</p>} 
              </div>
              <div className={(errors && errors.menu_item && errors.menu_item.length && errors.menu_item[index]?.unit)?`${styles.InputAreaUnit} Error`:`${styles.InputAreaUnit}`}>
              <Controller
                render={({ field }) => <TextField {...field}  type={'number'} id="outlined-basic" label="Unit" variant="outlined" size="small" className='LoginInput' />  }
                {...register(`menu_item.${index}.unit`, { required: true })}
                control={control}
              />
              {(errors && errors.menu_item && errors.menu_item.length && errors.menu_item[index]?.unit) && <p className="LoginErrorText">Unit must be a positive number</p>}
                             
              </div>

              <Button onClick={() => { remove(index); }} className={`${styles.LoginBU}`}><Minus/></Button>
            </div>);
            })}

            

            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <Button onClick={() => { append({item:'',unit: '' }); }} className={`${styles.LoginBU}`}><Plus/></Button>
              </div>
            </div>

            <div className={(errors.amount)?`${styles.LoginInput} Error`:`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <TextField type={'number'} id="outlined-basic" label="Total" variant="outlined" size="small" className='LoginInput' {...register("amount", { required: true })} />
                {errors.amount && <p className="LoginErrorText">Amount Can&apos;t Be Blank</p>}
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


export default withAuth(CeateMenu);
