import styles from './shopnow.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft } from 'react-feather';

function Shopnow() {

  return (
    <div className="PageBody">

        <Header />

        <div className="Body">
          <div className="Container">
          <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Shopnow</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/inventory/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
            </div>
          </div>
        </div>
    </div>
  )
}


export default withAuth(Shopnow);
