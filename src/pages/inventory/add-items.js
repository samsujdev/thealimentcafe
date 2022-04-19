import React, { useEffect,useState } from 'react';
import styles from './add-items.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, FilePlus, AlertTriangle } from 'react-feather';
import { Button, Dialog, TextField, DialogContent, DialogTitle, MenuItem, FormControl, Select } from '@material-ui/core';
import axios from 'axios';
import Loader from "../../components/loader";
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete';

function AddItems() {
  const [selCat, setSelCat] = React.useState('');
  const [itemName, setItemName] = React.useState('');
  const [packOff, setPackOff] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [categoryList,setCategoryList] = useState({'data':[],'loading':false});
  const [itemList, setItemList] = useState({'data':[],'loading':false});
  const [loading, setLoading] = React.useState(false);
  const [filterItems, setFilterItems] = useState([]);
  const [selectItem, setSelectItem] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelCat('');
    setItemName('');
    setPackOff('');
  };

  useEffect(() => {
    if(!categoryList.loading){
      fetchInventoryCategories();
    }
    if(!itemList.loading){
      fetchInventoryitems();
    }
  });

  const fetchInventoryCategories = () =>{
    let olist = itemList;
    olist = {...olist,'loading':true};
    setCategoryList(olist);
    axios.get(process.env.REACT_APP_APIURL+'v1/inventory-categories',)
    .then(res => {
      let olist = {'data':res.data.data,'loading':true};
      setCategoryList(olist);
      let tempData = res.data.data.map(item=>{
        return {label:item.category_name, value:item.id};
      });
      setFilterItems(tempData);
    }).catch(err =>{
      let olist = categoryList;
      olist = {...olist,'loading':true};
      setCategoryList(olist);
    });
  }

  const fetchInventoryitems = () =>{
    let olist = categoryList;
    olist = {...olist,'loading':true};
    setItemList(olist);
    axios.get(process.env.REACT_APP_APIURL+'v1/inventory-items',)
    .then(res => {
      let olist = {'data':res.data.data,'loading':true};
      setItemList(olist);
    }).catch(err =>{
      let olist = categoryList;
      olist = {...olist,'loading':true};
      setItemList(olist);
    });
  }
  
  const changeCat = (event) => {
    setSelCat(event.target.value);
  };

  const addItem = () =>{
    if(selCat === '' || itemName === '' || packOff === '')
      return false;

    setOpen(false);
    setLoading(true);

    axios.post(process.env.REACT_APP_APIURL+'v1/inventory-items',{category_id:selCat, item_name:itemName, packoff:packOff})
    .then(res => {
      setLoading(false);
      let iList = itemList.data;
      iList.push(res.data.data);
      setItemList({'data':iList,'loading':false});
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

            <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Items</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/inventory/create" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <div className={`${styles.SalesDropDownDiv}`}>
                <Autocomplete className="LoginInput"
                  id="combo-box-demo"
                  options={filterItems}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, options) =>{  if(options){ setSelectItem(options.value); }else{  setSelectItem(0); }}}
                  renderInput={(params) => <TextField {...params} label="Type of Inventory" variant="outlined" />}
                />
              </div>
              <Link onClick={handleClickOpen} className={`${styles.HomeMenuBU}`}><FilePlus/> Add Items</Link>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Items</th>
                  <th>Pack Off</th>
                  <th>Category</th>
                  <th className='TextCenter'>Date</th>
                </tr>
                {itemList.data.filter(item => {
                  if(selectItem === 0)
                    return true;
                    
                  return item.category_id === selectItem;
                }).map((item,index)=>{
                  return (<tr key={index}>
                  <td><p>{(index+1)}</p></td>
                  <td><p>{item.item_name}</p></td>
                  <td><p>50Pcs</p></td>
                  <td><p>{item.category_name}</p></td>
                  <td><p className='TextCenter'>{moment(item.created_at).format('DD/MM/YYYY')}</p></td>
                </tr>)
                })}
                {!itemList.data.length && <tr>
                  <td colSpan={8}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>}
              </table>
            </div>

          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          
        >
          <DialogTitle className='TextCenter'>
            Create Items
          </DialogTitle>
          <DialogContent>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Category Name</label>
                <FormControl variant="outlined" className="LoginInput Black BlIcon CusPadd">
                  <Select
                    
                    value={selCat}
                    onChange={changeCat}
                    size="small"
                  >
                    {categoryList.data.map((item,index)=>{
                      return <MenuItem key={index} value={item.id}>{item.category_name}</MenuItem>
                    })}

                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Item Name</label>
                <TextField id="outlined-basic1" variant="outlined" size="small" className='LoginInput Black' autoComplete="off"  onChange={(e)=>setItemName(e.target.value)} />
              </div>
            </div>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Pack Off</label>
                <TextField id="outlined-basic1" variant="outlined" size="small" className='LoginInput Black' autoComplete="off"  onChange={(e)=>setPackOff(e.target.value)} />
              </div>
            </div>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <Button type='button' onClick={addItem} className="LoginBU">Submit</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

    </div>
  )
}


export default withAuth(AddItems);
