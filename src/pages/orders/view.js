import React, { useEffect,useState } from 'react';
import styles from './view.module.css';
import { ArrowLeft, Calendar, AlertTriangle, X } from 'react-feather';
import axios from 'axios';
import Header from "../../components/header";
import withAuth from "../../components/withAuth";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Loader from "../../components/loader";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';


function ViewOrders() {
  const userDet = localStorage.getItem("userDet");
  const userDetArr = JSON.parse(userDet);
  const [orderList,setOrderList] = useState({'data':[],'loading':false});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [canId, setCanId] = React.useState(0);

  useEffect(() => {
    if(!orderList.loading){
      fetchOrders(selectedDate);
    }
  });

  const fetchOrders = (seldDate) =>{
    setLoading(true);
    let cDate = moment(seldDate).format('YYYY-MM-DD');
    let olist = orderList;
    olist = {...olist,'loading':true};
    setOrderList(olist);
    axios.get(process.env.REACT_APP_APIURL+'v1/orders/'+cDate)
    .then(res => {
      setLoading(false);
      let olist = {'data':res.data.data,'loading':true};
      setOrderList(olist);
    }).catch(err =>{
      setLoading(false);
      let olist = orderList;
      olist = {...olist,'loading':false};
      setOrderList(olist);
    });
  }

  const changeDate = (date) =>{
    setSelectedDate(date);
    fetchOrders(date);
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (itemId) => {
    setCanId(itemId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const cancelOrder = () =>{
    setOpen(false);
    setLoading(true);
    let status = 3;

    axios.put(process.env.REACT_APP_APIURL+'v1/orders/'+canId,{status:status})
    .then(res => {
      let olist = orderList;
      let tempData = orderList.data.map((item)=>{
        if(item.id === canId){
          return {...item,status:3};
        }
        return item;
      });
      olist = {...olist,'data':tempData};
      setOrderList(olist);
      setLoading(false);
    }).catch(err =>{
      setLoading(false);
    });
  }

  return (
    <div>
      
      {loading && <Loader />}
      <Header />

        <div className="Body">
          <div className="Container">

            <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>View Order</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <div className={`${styles.ReactDatePicker}`}>
                <DatePicker className='ReactDatePicker' selected={selectedDate} onChange={changeDate} />
                <Calendar/>
              </div>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tbody>
                <tr>
                  <th>S.N.</th>
                  <th>Name</th>
                  <th>Order</th>
                  <th className='TextCenter'>Qnt</th>
                  <th className='TextCenter'>Price</th>
                  <th className='TextCenter'>Offer</th>
                  <th className='TextCenter'>Total</th>
                  <th className='TextCenter'>Status</th>
                  <th className='TextCenter'>Ord. In</th>
                  <th className='TextCenter'>Ord. Out</th>
                  {userDetArr.post === 'Super Admin' && <th className='TextCenter'>Emp.</th> }
                  {userDetArr.post === 'Super Admin' && <th className='TextCenter'>Cancel</th>}
                </tr>
                {orderList.data.map((item,index)=>{
                  return (<tr>
                  <td>
                    <p>{index+1}</p>
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>
                  {item.items.map((subItem,subIndex)=>{
                    return (<p key={subIndex}>{subItem.item}</p>)
                  })}
                  </td>
                  <td>
                  {item.items.map((subItem,subIndex)=>{
                    return (<p className='TextCenter' key={subIndex}>{subItem.quantity}</p>)
                  })}
                  </td>
                  <td>
                  {item.items.map((subItem,subIndex)=>{
                    return (<p className='TextCenter' key={subIndex}>{subItem.price}</p>)
                  })}
                  </td>
                  <td>
                    <p className='TextCenter'>{item.offer}%</p>
                    </td>
                  <td>
                    <p className='TextCenter'>{item.totalamount}</p>
                  </td>
                  <td key={index} className={(parseInt(item.status) === 2)?`${styles.Delivered}`:((parseInt(item.status) === 1)?`${styles.Ready}`:`${styles.Cooking}`)}>
                  {parseInt(item.status) === 0 && <p className='TextCenter'>Cooking</p>}
                  {parseInt(item.status) === 1 && <p className='TextCenter'>Ready</p>}
                  {parseInt(item.status) === 2 && <p className='TextCenter'>Delivered</p>}
                  {parseInt(item.status) === 3 && <p className='TextCenter'>Cancelled</p>}
                  </td>
                  {userDetArr.post === 'Super Admin' && <td>
                    <p className='TextCenter'>{moment(item.created_at).format('hh:mm A')}</p>
                  </td>}
                  {userDetArr.post === 'Super Admin' && <td>
                    <p className='TextCenter'>{moment(item.updated_at).format('hh:mm A')}</p>
                  </td>}
                  {userDetArr.post === 'Super Admin' && <td>
                    <p className='TextCenter'>{item.empCode}</p>
                  </td>}
                  {userDetArr.post === 'Super Admin'&& <td>
                    <p className='TextCenter'>
                      {(parseInt(item.status) !== 3 && (moment().format('YYYY-MM-DD') === moment(selectedDate).format('YYYY-MM-DD'))) && <Button onClick={handleClickOpen.bind(this,item.id)} className={`${styles.CancelBU}`}><X/></Button>}
                      {/* NA */}
                    </p>
                  </td>}
                </tr>)
                })}

                {!orderList.data.length && <tr>
                  <td colSpan={12}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>}
                
                </tbody>
              </table>
            </div>

          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          
        >
          <DialogTitle>
            Cancel Order
          </DialogTitle>
          <DialogContent>
            Are you want to delete this order?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={cancelOrder} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

    </div>
  )
}

export default withAuth(ViewOrders);
