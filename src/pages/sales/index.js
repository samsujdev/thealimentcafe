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
  const [startDate, setStartDate] = useState(new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)));
  const [endDate, setEndDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)));
  const [endDate2, setEndDate2] = useState(new Date());
  const [menuId, setMenuId] = useState(0);
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
      fetchOrdersByDate(startDate,endDate);
    }

  });

  const handleChange = (event) => {
    setStartDate(new Date());
    setEndDate(new Date());
    setOrderList([]);
    totalAmount = 0;
    setFilterBy(event.target.value);
    if(event.target.value === 'date'){
      fetchOrdersByDate(startDate,endDate);
    }
  };

  const chnageMenu = (e,option)=>{
    if(option){
      setMenuId(option.value);
      fetchOrdersByMenu(option.value,startDate2,endDate2);
    }
  }

  const changeDateNew1 = (sDate)=>{
    totalAmount = 0;
    fetchOrdersByDate(sDate,endDate);
  }

  const changeDateNew2 = (eDate)=>{
    totalAmount = 0;
    fetchOrdersByDate(startDate,eDate);
  }

  const changeDateNew21 = (sDate)=>{
    if(menuId){
      totalAmount = 0;
      fetchOrdersByMenu(menuId,sDate,endDate2);
    }
  }

  const changeDateNew22 = (eDate)=>{
    if(menuId){
      totalAmount = 0;
      fetchOrdersByMenu(menuId,startDate2,eDate);
    }
  }

  const fetchOrdersByDate = (stDate,eDate) =>{
    setLoading(true);
    let stDateNew = moment(stDate).format('YYYY-MM-DD');
    let eDateNew = moment(eDate).format('YYYY-MM-DD');
    axios.get(process.env.REACT_APP_APIURL+'v1/sale-by-date/'+stDateNew+'/'+eDateNew)
    .then(res => {
      setLoading(false);
      setOrderList(res.data.data);
    }).catch(err =>{
      setLoading(false);
      console.log(err);
    });
  }

  const fetchOrdersByMenu = (menuid,stDate,eDate) =>{
    setLoading(true);
    let stDateNew = moment(stDate).format('YYYY-MM-DD');
    let eDateNew = moment(eDate).format('YYYY-MM-DD');
    axios.get(process.env.REACT_APP_APIURL+'v1/sale-by-menu/'+menuid+'/'+stDateNew+'/'+eDateNew)
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
              {(filteBy === 'menu') && <div className={`${styles.SalesDateRange}`}>
                <Autocomplete className={`${styles.MenuDropDown} LoginInput`}
                  id="combo-box-demo"
                  options={menuList.data}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => <TextField {...params} label="Choose" variant="outlined" />}
                  onChange={chnageMenu}
                />
                <div className={`${styles.ReactDatePicker}`}>
                  <div className={`${styles.DatePickerWidget}`}>
                    <DatePicker className='ReactDatePickerBig' selected={startDate2} onChange={(date) => {changeDateNew21(date); setStartDate2(date);}} selectsStart startDate={startDate2} endDate={endDate2}  maxDate={new Date()} />
                    <Calendar/>
                  </div>
                  <p className={`${styles.DateRangeTo}`}>To</p>
                  <div className={`${styles.DatePickerWidget}`}>
                    <DatePicker className='ReactDatePickerBig' selected={endDate2} onChange={(date) => {changeDateNew22(date); setEndDate2(date)}} selectsEnd startDate={startDate2} endDate={endDate2} minDate={startDate2} maxDate={new Date()} />
                    <Calendar/>
                  </div>
                </div>
              </div>}
              {(filteBy === 'date') && <div className={`${styles.SalesDateRange2}`}>
                <div className={`${styles.ReactDatePicker}`}>
                  <div className={`${styles.DatePickerWidget}`}>
                    <DatePicker className='ReactDatePickerBig' selected={startDate} onChange={(date) => {changeDateNew1(date); setStartDate(date);}} selectsStart startDate={startDate} endDate={endDate}  maxDate={new Date()} />
                    <Calendar/>
                  </div>
                  <p className={`${styles.DateRangeTo}`}>To</p>
                  <div className={`${styles.DatePickerWidget}`}>
                    <DatePicker className='ReactDatePickerBig' selected={endDate} onChange={(date) => {changeDateNew2(date); setEndDate(date)}} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} maxDate={new Date()} />
                    <Calendar/>
                  </div>
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
                  totalAmount = totalAmount+(item.total_amount);
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
                      <p className='TextCenter'>{item.total_amount}</p>
                    </td>
                  </tr>)
                })}
                {(totalAmount > 0) && <tr>
                  <th colSpan={3}>TOTAL</th>
                  <th className='TextCenter'>{totalAmount}</th>
                </tr>}
                {(orderList.length === 0) && <tr>
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
                  totalAmount = totalAmount+(item.total_amount);
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
                    <p className='TextCenter'>{item.total_amount}</p>
                  </td>
                </tr>)
                })}
                {(totalAmount > 0) && <tr>
                  <th colSpan={3}>TOTAL</th>
                  <th className='TextCenter'>{totalAmount}</th>
                </tr>}
                {(orderList.length === 0) && <tr>
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