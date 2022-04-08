import React, { useState } from 'react';
import styles from './stock-in-report.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeft, Calendar, AlertTriangle } from 'react-feather';

function StockInReport() {

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>

        <Header />

        <div className="Body">
          <div className="Container">

            <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Stock In Report</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/inventory/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <div className={`${styles.ReactDatePicker}`}>
                <DatePicker className='ReactDatePicker' selected={startDate} onChange={(date) => setStartDate(date)} />
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
                <tr>
                  <td><p>1</p></td>
                  <td><p>250ml Flat Container</p></td>
                  <td><p>Packing Materials</p></td>
                  <td><p className='TextCenter'>5</p></td>
                  <td><p className='TextCenter'>50</p></td>
                </tr>
                <tr>
                  <td><p>2</p></td>
                  <td><p>Chicken</p></td>
                  <td><p>Fresh</p></td>
                  <td><p className='TextCenter'>1</p></td>
                  <td><p className='TextCenter'>1</p></td>
                </tr>
                <tr>
                  <td colSpan={10}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

          </div>
        </div>
    </div>
  )
}


export default withAuth(StockInReport);
