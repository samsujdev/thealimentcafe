import React, { useEffect,useState } from 'react';
import styles from './list.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, AlertTriangle, ShoppingBag, Calendar, ShoppingCart, Clipboard } from 'react-feather';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

function List() {
  const [inventoryList, setInventoryList] = useState({'data':[],'loading':false});
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectItem, setSelectItem] = useState(0);

  useEffect(() => {
    if(!inventoryList.loading){
      fetchInventory();
    }
  });

  const fetchInventory = () =>{
    let olist = inventoryList;
    olist = {...olist,'loading':true};
    setInventoryList(olist);
    axios.get(process.env.REACT_APP_APIURL+'v1/inventories')
    .then(res => {
      let olist = {'data':res.data.data,'loading':true};
      setInventoryList(olist);

      let tempData = res.data.data.map(item=>{
        return {label:item.item_name, value:item.id};
      });
      setInventoryItems(tempData);

    }).catch(err =>{
      let olist = inventoryList;
      olist = {...olist,'loading':false};
      setInventoryList(olist);
    });
  }

  return (
    <div>

        <Header />

        <div className="Body">
          <div className={`${styles.Container}`}>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Inventory</p>
            </div>

            <div className={`${styles.BodyFilterArea}`}>
              <div className={`${styles.SalesDropDownDiv}`}>
                <Autocomplete className="LoginInput"
                  id="combo-box-demo"
                  options={inventoryItems}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, options) =>{  if(options){ setSelectItem(options.value); }else{  setSelectItem(0); }}}
                  renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                />
              </div>
              <div className={`${styles.SalesDropDownDiv}`}>
                <Link to="/inventory/add" className={`${styles.HomeMenuBU}`}><Plus/> Add Inventory</Link>
              </div>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th className='TextCenter'>Pake Off</th>
                  <th className='TextCenter'>Unit</th>
                  {/*<th className='TextCenter'>Date</th>*/}
                </tr>
                {inventoryList.data
                .filter(item => {
                  if(selectItem === 0)
                    return true;
                    
                  return item.id === selectItem;
                })
                .map((item,index)=>{
                  return (<tr key={index}>
                  <td><p>{index+1}</p></td>
                  <td><p>{item.item_name}</p></td>
                  <td><p>{item.category_name}</p></td>
                  <td><p className='TextCenter'>{item.packoff}</p></td>
                  <td><p className='TextCenter'>{item.current_unit}</p></td>
                  {/*<td><p className='TextCenter'>{moment(item.created_at).format('DD/MM/YYYY')}</p></td>*/}
                </tr>)
                })}

                {!inventoryList.data.length && <tr>
                  <td colSpan={6}>
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

        <div className={`${styles.InventoryTab}`}>
          <div className={`${styles.TabConatiner}`}>
            <div className={`${styles.TabRow}`}>
              <Link to="/inventory/create" className={`${styles.TabButtons}`}><ShoppingBag/></Link>
              <Link to="/inventory/stock-in-report" className={`${styles.TabButtons}`}><Calendar/></Link>
              <Link to="/inventory/stock-out-report" className={`${styles.TabButtons}`}><ShoppingCart/></Link>
              <Link to="/inventory/report" className={`${styles.TabButtons}`}><Clipboard/></Link>
            </div>
          </div>
        </div>

    </div>
  )
}


export default withAuth(List);
