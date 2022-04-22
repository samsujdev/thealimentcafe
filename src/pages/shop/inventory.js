import React, { useEffect,useState } from 'react';
import styles from './inventory.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, FilePlus, AlertTriangle, Layers, Clipboard } from 'react-feather';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Dialog, DialogTitle, DialogContent, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

function Inventory() {
  const [inventoryList, setInventoryList] = useState({'data':[],'loading':false});
  const [filterItems, setFilterItems] = useState([]);
  const [tempIds, setTempIds] = useState([]);
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
        return {label:item.category_name, value:item.category_id};
      });

      let tempData2 = tempData.filter(item=>{
        let tmpIds = tempIds;
        if(!tmpIds.includes(item.value)){
          tempIds.push(item.value);
          setTempIds(tmpIds);
          return true;
        }else{
          return false;
        }
      });

      setFilterItems(tempData2);

    }).catch(err =>{
      let olist = inventoryList;
      olist = {...olist,'loading':false};
      setInventoryList(olist);
    });
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState('stockIn');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>

        <Header />

        <div className="Body">
          <div className={`${styles.Container}`}>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Shop</p>
            </div>

            <div className={`${styles.BodyHeadArea2}`}>
              <div className={`${styles.SalesDropDownDiv}`}>
                <Autocomplete className="LoginInput"
                  id="combo-box-demo"
                  options={filterItems}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, options) =>{  if(options){ setSelectItem(options.value); }else{  setSelectItem(0); }}}
                  renderInput={(params) => <TextField {...params} label="Type of Inventory" variant="outlined" />}
                />
              </div>
              <Link to="/shop-now" className={`${styles.HomeMenuBU}`}><FilePlus/> Shop Now</Link>
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
                    
                  return item.category_id === selectItem;
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

            {/* ************************ Production stock layout ************************* */}
            {/* <div className={`${styles.BodyHeadArea}`}>
              <Link to="/shop/inventory" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Production Stock</p>
            </div>

            <div className={`${styles.BodyHeadArea2}`}>
              <div className={`${styles.SalesDropDownDiv}`}>
                <Autocomplete className="LoginInput"
                  id="combo-box-demo"
                  options={filterItems}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, options) =>{  if(options){ setSelectItem(options.value); }else{  setSelectItem(0); }}}
                  renderInput={(params) => <TextField {...params} label="Type of Inventory" variant="outlined" />}
                />
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
                  <th className='TextCenter'>Date</th>
                  <th className='TextCenter'>Stock Out</th>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Chicken BL</p></td>
                  <td><p>Meat & Fish</p></td>
                  <td><p className='TextCenter'>2Kg</p></td>
                  <td><p className='TextCenter'>1</p></td>
                  <td><p className='TextCenter'>04/05/2022</p></td>
                  <td><p className='TextCenter' onClick={handleClickOpen}>Stock In</p>
                  </td>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Chicken DS</p></td>
                  <td><p>Meat & Fish</p></td>
                  <td><p className='TextCenter'>1Kg</p></td>
                  <td><p className='TextCenter'>2</p></td>
                  <td><p className='TextCenter'>04/05/2022</p></td>
                  <td><p className='TextCenter' onClick={handleClickOpen}>Stock In</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={9}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div> */}
            {/* ************************ Production stock layout ************************* */}

            {/* ************************ Production stock Report ************************* */}
            {/* <div className={`${styles.BodyHeadArea}`}>
              <Link to="/shop/inventory" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Production Stock Report</p>
            </div>

            <div className={`${styles.BodyHeadArea2}`}>Put here a date range filter @MR Jaman</div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th className='TextCenter'>Pake Off</th>
                  <th className='TextCenter'>Unit</th>
                  <th className='TextCenter'>Stock In</th>
                  <th className='TextCenter'>Stock Out</th>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Chicken BL</p></td>
                  <td><p>Meat & Fish</p></td>
                  <td><p className='TextCenter'>2Kg</p></td>
                  <td><p className='TextCenter'>1</p></td>
                  <td><p className='TextCenter'>04/05/2022</p></td>
                  <td><p className='TextCenter'>04/05/2022</p>
                  </td>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Chicken DS</p></td>
                  <td><p>Meat & Fish</p></td>
                  <td><p className='TextCenter'>1Kg</p></td>
                  <td><p className='TextCenter'>2</p></td>
                  <td><p className='TextCenter'>04/05/2022</p></td>
                  <td><p className='TextCenter'>04/05/2022</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={9}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div> */}
            {/* ************************ Production stock Report ************************* */}

          </div>
        </div>

        <div className={`${styles.InventoryTab}`}>
          <div className={`${styles.TabConatiner}`}>
            <div className={`${styles.TabRow}`}>
              {/* ************************ Production stock ************************* */}
              <Link className={`${styles.TabButtons}`}><Layers/></Link>
              {/* ************************ Production stock ************************* */}
              {/* ************************ Production stock Report ************************* */}
              <Link className={`${styles.TabButtons}`}><Clipboard/></Link>
              {/* ************************ Production stock Report ************************* */}
            </div>
          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          className="Popup"
        >
          <DialogTitle>Choose One</DialogTitle>
          <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="stockIn" control={<Radio />} label="Stock In" />
              <FormControlLabel value="stockOut" control={<Radio />} label="Stock Out" />
            </RadioGroup>
          </FormControl>
          </DialogContent>
        </Dialog>

    </div>
  )
}


export default withAuth(Inventory);
