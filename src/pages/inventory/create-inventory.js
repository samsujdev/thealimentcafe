import styles from './create-inventory.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft } from 'react-feather';

function Create() {

  return (
    <div>

        <Header />

        <div className="Body">
          <div className="Container">

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/inventory/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Create Inventory</p>
            </div>

            <div className={`${styles.HomeButtonArea}`}>
              <Link to="/inventory/add-category" className={`${styles.HomeMenuBU}`}>Add Category</Link>
              <Link to="/inventory/add-items" className={`${styles.HomeMenuBU}`}>Add Items</Link>
            </div>

          </div>
        </div>
    </div>
  )
}


export default withAuth(Create);
