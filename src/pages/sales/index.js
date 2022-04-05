import React,{useState,useEffect} from 'react';
import styles from './sales.module.css';
import { InputLabel, MenuItem, FormControl, Select, TextField } from '@material-ui/core';
import { ArrowLeft, Calendar,AlertTriangle } from 'react-feather';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Header from "../../components/header";
import Loader from "../../components/loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import axios from 'axios';
import withAuth from "../../components/withAuth";
import { Link } from "react-router-dom";

function Sales() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteBy, setFilterBy] = useState('date');
  const [orderList,setOrderList] = useState([]);
  const [menuList,setMenuList] = useState([{'data':[],'loading':false}]);
  const [loading, setLoading] = React.useState(false);
  let totalAmount = 0;

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
      fetchOrdersByDate(selectedDate);
    }

  });

  const handleChange = (event) => {
    setOrderList([]);
    totalAmount = 0;
    setFilterBy(event.target.value);
    if(event.target.value === 'date'){
      fetchOrdersByDate(selectedDate);
    }
  };

  const chnageMenu = (e,option)=>{
    if(option){
      fetchOrdersByMenu(option.value);
    }
  }

  const changeDate = (date) =>{
    totalAmount = 0;
    setSelectedDate(date);
    fetchOrdersByDate(date);
  }

  const fetchOrdersByDate = (seldDate) =>{
    setLoading(true);
    let cDate = moment(seldDate).format('YYYY-MM-DD');
    axios.get(process.env.REACT_APP_APIURL+'v1/sale-by-date/'+cDate)
    .then(res => {
      setLoading(false);
      setOrderList(res.data.data);
    }).catch(err =>{
      setLoading(false);
      console.log(err);
    });
  }

  const fetchOrdersByMenu = (menuid) =>{
    setLoading(true);
    axios.get(process.env.REACT_APP_APIURL+'v1/sale-by-menu/'+menuid)
    .then(res => {
      setLoading(false);
      setOrderList(res.data.data);
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
              <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Sales</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <div className={`${styles.SalesDropDownDiv}`}>
                <FormControl variant="outlined" className="LoginInput">
                  <InputLabel id="demo-simple-select-outlined-label">Filter by</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={filteBy}
                    onChange={handleChange}
                    label="Filte by"
                  >
                    <MenuItem value="menu">Menu</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {(filteBy === 'menu') && <div className={`${styles.SalesDropDownDiv}`}>
                <Autocomplete className="LoginInput"
                  id="combo-box-demo"
                  options={menuList.data}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => <TextField {...params} label="Choose" variant="outlined" />}
                  onChange={chnageMenu}
                />
              </div>}
              {(filteBy === 'date') && <div className={`${styles.SalesDropDownDiv}`}>
                <div className={`${styles.ReactDatePicker}`}>
                <DatePicker className='ReactDatePickerBig' selected={selectedDate} onChange={changeDate} />
                <Calendar/>
              </div>
              </div>}
            </div>

            {(filteBy === 'date') && <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Menu</th>
                  <th className='TextCenter'>Qnt</th>
                  <th className='TextCenter'>Value</th>
                </tr>
                {orderList.map((item,index)=>{
                  totalAmount = totalAmount+(item.amount*item.quantity);
                  return (<tr>
                    <td>
                      <p>{index+1}</p>
                    </td>
                    <td>
                      <p>{item.menu_name}</p>
                    </td>
                    <td>
                      <p className='TextCenter'>{item.quantity}</p>
                    </td>
                    <td>
                      <p className='TextCenter'>{item.amount*item.quantity}</p>
                    </td>
                  </tr>)
                })}
                {totalAmount && <tr>
                  <th colSpan={3}>TOTAL</th>
                  <th className='TextCenter'>{totalAmount}</th>
                </tr>}
                {!orderList.length && <tr>
                  <td colSpan={8}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>}
              </table>
            </div>}

            {/* *******************When user select filter by date******************** */}
            {(filteBy === 'menu') && <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Date</th>
                  <th className='TextCenter'>Qnt</th>
                  <th className='TextCenter'>Value</th>
                </tr>
                {orderList.map((item,index)=>{
                  totalAmount = totalAmount+(item.amount*item.quantity);
                  return (<tr>
                  <td>
                    <p>{index+1}</p>
                  </td>
                  <td>
                    <p>{item.order_date}</p>
                  </td>
                  <td>
                    <p className='TextCenter'>{item.quantity}</p>
                  </td>
                  <td>
                    <p className='TextCenter'>{item.amount*item.quantity}</p>
                  </td>
                </tr>)
                })}
                {totalAmount && <tr>
                  <th colSpan={3}>TOTAL</th>
                  <th className='TextCenter'>{totalAmount}</th>
                </tr>}
                {!orderList.length && <tr>
                  <td colSpan={8}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>}
              </table>
            </div>}
            {/* *******************When user select filter by date******************** */}

          </div>
        </div>

    </div>
  )
}

export default withAuth(Sales);