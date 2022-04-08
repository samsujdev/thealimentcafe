import React from 'react';
import styles from './inventory.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, FilePlus, AlertTriangle } from 'react-feather';

function Inventory() {

  return (
    <div>

        <Header />

        <div className="Body">
          <div className="Container">

            <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Stock</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <Link to="/shop-now" className={`${styles.HomeMenuBU}`}><FilePlus/> Shop Now</Link>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Category</th>
                  <th>Items</th>
                  <th className='TextCenter'>Unit</th>
                  <th className='TextCenter'>Pack Off</th>
                  <th className='TextCenter'>Date</th>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Fresh</p></td>
                  <td><p>Chicken</p></td>
                  <td><p className='TextCenter'>1</p></td>
                  <td><p className='TextCenter'>1</p></td>
                  <td><p className='TextCenter'>02/03/2022</p></td>
                </tr>
                <tr>
                  <td><p>2</p></td>
                  <td><p>Packing Materials</p></td>
                  <td><p>250ml Flat Container</p></td>
                  <td><p className='TextCenter'>1</p></td>
                  <td><p className='TextCenter'>5</p></td>
                  <td><p className='TextCenter'>02/03/2022</p></td>
                </tr>
                <tr>
                  <td><p>3</p></td>
                  <td><p>Packing Materials</p></td>
                  <td><p>72mtr Foil Roll</p></td>
                  <td><p className='TextCenter'>1</p></td>
                  <td><p className='TextCenter'>1</p></td>
                  <td><p className='TextCenter'>02/03/2022</p></td>
                </tr>
                <tr>
                  <td colSpan={8}>
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


export default withAuth(Inventory);
