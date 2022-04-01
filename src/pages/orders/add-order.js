import React, { useEffect,useState } from 'react';
import styles from './add-order.module.css';
import { ArrowLeft, Plus } from 'react-feather';
import { TextField, Button, FormControlLabel, Checkbox, Radio, RadioGroup } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { useForm,Controller,useFieldArray } from "react-hook-form";
import Header from "../../components/header";
import withAuth from "../../components/withAuth";
import { useHistory,Link } from "react-router-dom";


function AddOrder() {
  const router = useHistory();
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      menu_items: [{ unit: '' }],
      payment_type: 'cash',
      is_paid:false,
      offer:0
    }
  });
  const { fields, append } = useFieldArray({ control, name: "menu_items" });
  const [menuList,setMenuList] = useState({'data':[],'loading':false});
  const [subTotalAmount,setSubTotalAmount] = useState(0);
  const [discountAmount,setDiscountAmount] = useState(0);
  const [radioDisabled,setRadioDisabled] = useState(true);

  useEffect(() => {
    
    function fetchMenus(){
      let ilist = menuList;
      ilist = {...ilist,'loading':true};
      setMenuList(ilist);
      axios.get(process.env.REACT_APP_APIURL+'v1/menus')
      .then(res => {
        let itemList = res.data.data.map((item)=>{
          return {'value':item.id,'label':item.menu_name,'price':item.amount};
        });

        let ilist = {'data': itemList,'loading':true};
        setMenuList(ilist);

      }).catch(err =>{
        let ilist = menuList;
        ilist = {...ilist,'loading':false};
        setMenuList(ilist);
      });
    }

    if(!menuList.loading){
      fetchMenus();
    }

  });

  const selectMenu = ()=>{
    let menu_items = getValues('menu_items');
    let totalA = 0;
    menu_items.forEach((item)=>{
      if(typeof(item.item) !== 'undefined' && typeof(item.unit) !== 'undefined' && item.item !== '' && item.unit !== ''){
        let unit = parseInt(item.unit);
        let itemID = parseInt(item.item);
        let itemNew = menuList.data.filter(i=> i.value === itemID);
        let price = itemNew[0].price;
        if(unit){
          totalA += price*unit;
        }
      }
    });

    setSubTotalAmount(totalA);
  }

  const calculateDiscount = () =>{
    let offer = getValues('offer');
    if(typeof(offer) !== 'undefined' && offer !== ''){
      let offerNew = parseInt(offer);
      let subTotal = subTotalAmount;
      if(subTotal){
        let disAmount = (subTotal * offerNew)/100;
        setDiscountAmount(disAmount);
      }
    }
  }

  const onSubmit = data => {
    let payLoad = data;
    payLoad = {
      ...payLoad,
      is_paid: (payLoad.is_paid)?1:0,
      subamount:subTotalAmount,
      discount: discountAmount
    }
    
    axios.post(process.env.REACT_APP_APIURL+'v1/orders',payLoad)
    .then(res => {
      router.push('/orders/list');
    }).catch(err =>{
      console.log(err);
    });

  }
  
  
  
  return (
    <div>

        <Header />

        <div className="Body">
          <div className="Container">
            <div className={`${styles.HomeButtonArea}`}>
              
            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/orders/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Take Order</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <TextField id="outlined-basic" label="Name" variant="outlined" size="small" className='LoginInput'  {...register("name")} autoComplete="off" />             
              </div>
            </div>

            {fields.map((items,index)=>{
              return (
              <div key={index} className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
              <Controller
                render={({ field }) => <Autocomplete  {...field} className='LoginInput'
                
                id="combo-box-demo"
                options={menuList.data}
                getOptionLabel={(option) => option.label}
                onChange={(e, options) =>{  if(options){ setValue(`menu_items.${index}.item`, options.value); setValue(`menu_items.${index}.price`, options.price); }else{ setValue(`menu_items.${index}.item`, 0); setValue(`menu_items.${index}.price`, 0); } selectMenu(); }}
                renderInput={(params) => <TextField {...params} label="Select Item" size="small" variant="outlined" />}
              />  }
                name={`menu_items.${index}.item`}
                control={control}
              />     

                              
              </div>
              <div className={`${styles.InputAreaUnit}`}>
                 <Controller
                render={({ field }) => <TextField {...field} value={field.value} onChange={(e) =>{  field.onChange(e.target.value); selectMenu(); }} id="outlined-basic" type={'number'} label="Unit" variant="outlined" size="small" className='LoginInput'  />  }
                name={`menu_items.${index}.unit`}
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
              <Controller
                render={({ field }) => <TextField {...field} value={field.value} onChange={(e) =>{  field.onChange(e.target.value); calculateDiscount(); }} id="outlined-basic" label="Offer(%)" variant="outlined" size="small" className='LoginInput' type={'number'} />  }
                name={`offer`}
                control={control}
              />             
              </div>
            </div>

            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <p className={`${styles.TakeOrderText}`}>Sub Total: {subTotalAmount}</p>           
              </div>
            </div>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <p className={`${styles.TakeOrderText}`}>Discount: {discountAmount}</p>           
              </div>
            </div>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <p className={`${styles.TakeOrderText}`}>Total: {(subTotalAmount-discountAmount)}</p>           
              </div>
            </div>

            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
              <Controller
              control={control}
              name="is_paid"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <FormControlLabel className="CheckBox"
                control={
                  <Checkbox
                  onBlur={onBlur}
                  onChange={(e)=>{onChange(e); setRadioDisabled(!(e.target.checked));}}
                  checked={value}
                  inputRef={ref}
                  />
                }
                label="Paid"
              />
            )}
          />
          </div>
              <div className={`${styles.CheckboxSec}`}>
              <Controller
                render={({ field })=>
                  (<RadioGroup {...field} className="CheckboxGroup">
                    <FormControlLabel value="cash" control={<Radio />} disabled={radioDisabled} label="Cash" />
                    <FormControlLabel value="online" control={<Radio />} disabled={radioDisabled} label="Online" />
                  </RadioGroup>)
                }
                name="payment_type"
                control={control}
              />
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

export default withAuth(AddOrder);