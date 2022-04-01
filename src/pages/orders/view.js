import React, { useEffect,useState } from 'react';
import styles from './view.module.css';
import { ArrowLeft, Calendar, AlertTriangle } from 'react-feather';
import axios from 'axios';
import Header from "../../components/header";
import withAuth from "../../components/withAuth";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Loader from "../../components/loader";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


function ViewOrders() {
  const [orderList,setOrderList] = useState({'data':[],'loading':false});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = React.useState(false);

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
                  <th>Qnt</th>
                  <th>Price</th>
                  <th>Offer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
                {orderList.data.map((item,index)=>{
                  return (<tr key={index} className={(parseInt(item.status) === 2)?`${styles.Delivered}`:((parseInt(item.status) === 1)?`${styles.Ready}`:`${styles.Cooking}`)}>
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
                    return (<p key={subIndex}>{subItem.quantity}</p>)
                  })}
                  </td>
                  <td>
                  {item.items.map((subItem,subIndex)=>{
                    return (<p key={subIndex}>{subItem.price}</p>)
                  })}
                  </td>
                  <td>
                    <p>{item.offer}%</p>
                    </td>
                  <td>
                    <p>{item.totalamount}</p>
                  </td>
                  <td>
                  {parseInt(item.status) === 0 && <p>Cooking</p>}
                  {parseInt(item.status) === 1 && <p>Ready</p>}
                  {parseInt(item.status) === 2 && <p>Delivered</p>}
                  </td>
                </tr>)
                })}

                {!orderList.data.length && <tr>
                  <td colSpan={8}>
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

    </div>
  )
}

export default withAuth(ViewOrders);
