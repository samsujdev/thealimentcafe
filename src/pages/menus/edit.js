import React, { useEffect,useState } from 'react';
import styles from './add.module.css';
import { ArrowLeft, Plus , Minus} from 'react-feather';
import {  TextField, Button } from '@material-ui/core';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from 'axios';
import Header from "../../components/header";
import Loader from "../../components/loader";
import withAuth from "../../components/withAuth";
import { useHistory,Link,useParams } from "react-router-dom";
import Select from 'react-select';

function EditMenu() {
  const router = useHistory();
  const {id} = useParams();
  const { register, handleSubmit, control,setValue, formState: { errors }  } = useForm();
  const [itemList,setItemList] = useState({'data':[],'loading':false});
  const { fields, append,remove } = useFieldArray({ control, name: "menu_item" });
  const [loading, setLoading] = React.useState(false);
  const [menuCall, setMenuCall] = useState(false);

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

    function fetchMenu(){
      console.log(id);

      setMenuCall(true);
      axios.get(process.env.REACT_APP_APIURL+'v1/menus/'+id)
      .then(res => {
        let resData = res.data.data;
        setMenuCall(true);

        console.log(resData);

        setValue('menu_name', resData.menu_name);
        setValue('amount', resData.amount);

        resData.items.map((item,index)=>{
          console.log(item);
          append({ item: item.item_id, unit: item.unit });
          return true;
        });
      }).catch(err =>{
        setMenuCall(false);
      });
    }

    if(!menuCall){
      fetchMenu();
    }

  });

  const onSubmit = data => {
    setLoading(true);
    axios.put(process.env.REACT_APP_APIURL+'v1/menus/'+id,data)
    .then(res => {
      setLoading(false);
      router.push('/menus/list');
    }).catch(err =>{
      setLoading(false);
      console.log(err);
    });
  };

  return (
    <div>

        {loading && <Loader />}
        <Header />

        <div className="Body">
          <div className="Container">
            <div className={`${styles.HomeButtonArea}`}>
              
            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/menus/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Edit Menu</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

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
                render={({ field }) => <Select {...field} id={"outlined-basi99c"+index} label="Select Item" variant="outlined" size="small" className='LoginInput' options={itemList.data} value={itemList.data.find(c => c.value === field.value)} onChange={val => field.onChange(val.value)} />  }
                name={`menu_item.${index}.item`}
                {...register(`menu_item.${index}.item`, { required: true })}
                control={control}
              />     
               {(errors && errors.menu_item && errors.menu_item.length && errors.menu_item[index]?.item) && <p className="LoginErrorText">Please select Item</p>} 
              </div>
              <div className={(errors && errors.menu_item && errors.menu_item.length && errors.menu_item[index]?.unit)?`${styles.InputAreaUnit} Error`:`${styles.InputAreaUnit}`}>
              <Controller
                render={({ field }) => <TextField {...field}  type={'number'} id={"outlined-basic"+index} label="Unit" variant="outlined" size="small" className='LoginInput' />  }
                name={`menu_item.${index}.unit`}
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
                <Button onClick={() => { append(); }} className={`${styles.LoginBU}`}><Plus/></Button>
              </div>
            </div>

            <div className={`${styles.LoginInput}`}>
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


export default withAuth(EditMenu);
