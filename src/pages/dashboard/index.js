import styles from './home.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";

function Home() {
  const userDet = localStorage.getItem("userDet");
  const userDetArr = JSON.parse(userDet);

  return (
    <div className="PageBody">

        <Header />

        <div className="Body">
          <div className="Container">
            <div className={`${styles.HomeButtonArea}`}>
            
              
              {/* ********************User name should be visible on span area*************** */}
              <p className={`${styles.HomeTitle}`}>Hello, <span>{userDetArr?.fullname}</span></p>
              {/* ********************User name should be visible on span area*************** */}
              {(userDetArr.post === 'Super Admin' || userDetArr.post === 'Admin') && <Link to="/orders/view" className={`${styles.HomeMenuBU}`}>VIEW ORDER</Link>}
              {(userDetArr.post === 'Super Admin' || userDetArr.post === 'Admin' || userDetArr.post === 'Store Manager') && <Link to="/orders/list" className={`${styles.HomeMenuBU}`}>TAKE ORDER</Link>}
              {(userDetArr.post === 'Super Admin' || userDetArr.post === 'Admin' || userDetArr.post === 'Store Manager') && <Link to="/sales" className={`${styles.HomeMenuBU}`}>SALES</Link>}
              {(userDetArr.post === 'Super Admin' || userDetArr.post === 'Store Manager') && <Link to="/stocks/stock-update" className={`${styles.HomeMenuBU}`}>STOCK UPDATE</Link>}
              {(userDetArr.post === 'Super Admin' || userDetArr.post === 'Store Manager') && <Link to="/shop/inventory" className={`${styles.HomeMenuBU}`}>SHOP</Link>}
              {userDetArr.post === 'Super Admin' && <Link to="/inventory/list" className={`${styles.HomeMenuBU}`}>INVENTORY</Link>}
              {(userDetArr.post === 'Super Admin' || userDetArr.post === 'Admin') && <Link to="/stocks/list" className={`${styles.HomeMenuBU}`}>STOCK</Link>}
              {(userDetArr.post === 'Super Admin' || userDetArr.post === 'Admin' || userDetArr.post === 'Store Manager') && <Link to="/menus/list" className={`${styles.HomeMenuBU}`}>MENU</Link>}
              {(userDetArr.post === 'Super Admin' || userDetArr.post === 'Store Manager') && <Link to="/orders/live" className={`${styles.HomeMenuBULive}`}>GO LIVE</Link>}
              {userDetArr.post === 'Super Admin' && <Link to="/users/list" className={`${styles.HomeMenuBU}`}>USER</Link>}

            </div>
          </div>
        </div>
    </div>
  )
}


export default withAuth(Home);
