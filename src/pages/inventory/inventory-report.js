import styles from './inventory-report.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from 'react-feather';

function InventoryReport() {

  return (
    <div>

        <Header />

        <div className="Body">
          <div className="Container">

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/inventory/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Inventory Report</p>
            </div>

            {/* Samsuj da eigulo tumi age lagiye dio */}
            {/* <div className={`${styles.BodyHeadArea}`}>
              1. Date range filter
              2. Select inventory type autocomplete box
              3. Download button
            </div> */}

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Category</th>
                  <th>Item Name</th>
                  <th className='TextCenter'>Unit</th>
                  <th className='TextCenter'>Pack Off</th>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Meat & Fish</p></td>
                  <td><p>Chicken BL</p></td>
                  <td><p className='TextCenter'>2</p></td>
                  <td><p className='TextCenter'>2kg</p></td>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Meat & Fish</p></td>
                  <td><p>Chicken DS</p></td>
                  <td><p className='TextCenter'>2</p></td>
                  <td><p className='TextCenter'>1kg</p></td>
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


export default withAuth(InventoryReport);
