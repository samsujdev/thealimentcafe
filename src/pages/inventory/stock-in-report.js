import React, { useState, useEffect } from 'react';
import styles from './stock-in-report.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeft, Calendar, AlertTriangle } from 'react-feather';
import moment from 'moment';
import axios from 'axios';
import Loader from "../../components/loader";

function StockInReport() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inventoryList, setInventoryList] = useState({'data':[],'loading':false});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if(!inventoryList.loading){
      fetchInventory(selectedDate);
    }
  });

  const fetchInventory = (seldDate) =>{
    setLoading(true);
    let cDate = moment(seldDate).format('YYYY-MM-DD');
    let olist = inventoryList;
    olist = {...olist,'loading':true};
    setInventoryList(olist);
    axios.get(process.env.REACT_APP_APIURL+'v1/inventory/stock-in-report/'+cDate)
    .then(res => {
      setLoading(false);
      let olist = {'data':res.data.data,'loading':true};
      setInventoryList(olist);
    }).catch(err =>{
      setLoading(false);
      let olist = inventoryList;
      olist = {...olist,'loading':false};
      setInventoryList(olist);
    });
  }

  const changeDate = (date) =>{
    setSelectedDate(date);
    fetchInventory(date);
  }

  return (
    <div>

        {loading && <Loader />}
        <Header />

        <div className="Body">
          <div className="Container">

            <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Stock In Report</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/inventory/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <div className={`${styles.ReactDatePicker}`}>
                <DatePicker className='ReactDatePicker' selected={selectedDate} onChange={changeDate} />
                <Calendar/>
              </div>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th className='TextCenter'>Unit</th>
                  <th className='TextCenter'>Pack Off</th>
                </tr>
                {inventoryList.data.map((item,index)=>{
                  return (<tr key={index}>
                  <td><p>{(index+1)}</p></td>
                  <td><p>{item.item_name}</p></td>
                  <td><p>{item.category_name}</p></td>
                  <td><p className='TextCenter'>{item.unit}</p></td>
                  <td><p className='TextCenter'>{item.packoff}</p></td>
                </tr>)
                })}
                {!inventoryList.data.length && <tr>
                  <td colSpan={10}>
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
    </div>
  )
}


export default withAuth(StockInReport);
