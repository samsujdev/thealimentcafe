import styles from './list.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft,Plus } from 'react-feather';

function List() {

  return (
    <div className="PageBody">

        <Header />

        <div className="Body">
          <div className="Container">
          <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Inventory</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <Link to="/inventory/add" className={`${styles.HomeMenuBU}`}><Plus/> Add Inventory</Link>
              <Link to="/inventory/create" className={`${styles.HomeMenuBU}`}><Plus/> Create Inventory</Link>
              <Link to="/inventory/add-category" className={`${styles.HomeMenuBU}`}><Plus/> Add Category</Link>
              <Link to="/inventory/add-items" className={`${styles.HomeMenuBU}`}><Plus/> Add Items</Link>
              <Link to="/inventory/stock-in-report" className={`${styles.HomeMenuBU}`}><Plus/> Stock In Report</Link>
              <Link to="/inventory/stock-out-report" className={`${styles.HomeMenuBU}`}><Plus/> Stock Out Report</Link>
              <Link to="/inventory/report" className={`${styles.HomeMenuBU}`}><Plus/> INVENTORY Report</Link>
            </div>
          </div>
        </div>
    </div>
  )
}


export default withAuth(List);
