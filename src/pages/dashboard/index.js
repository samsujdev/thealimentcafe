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
              {userDetArr.post === 'Admin' && <Link to="/users/list" className={`${styles.HomeMenuBU}`}>USER</Link>}
              {userDetArr.post === 'Admin' && <Link to="/orders/view" className={`${styles.HomeMenuBU}`}>VIEW ORDER</Link>}
              {userDetArr.post === 'Admin' && <Link to="/sales" className={`${styles.HomeMenuBU}`}>SALES</Link>}
              {userDetArr.post === 'Admin' && <Link to="/stocks/list" className={`${styles.HomeMenuBU}`}>STOCK</Link>}
              {userDetArr.post === 'Admin' && <Link to="/menus/list" className={`${styles.HomeMenuBU}`}>MENU</Link>}

              <Link to="/inventory/list" className={`${styles.HomeMenuBU}`}>INVENTORY</Link>
              <Link to="/shop/inventory" className={`${styles.HomeMenuBU}`}>SHOP</Link>
              <Link to="/shop-now" className={`${styles.HomeMenuBU}`}>shop-now</Link>
              
              {(userDetArr.post === 'Admin' || userDetArr.post === 'Store Manager') && <Link to="/stocks/stock-update" className={`${styles.HomeMenuBU}`}>STOCK UPDATE</Link>}
              {(userDetArr.post === 'Admin' || userDetArr.post === 'Store Manager') && <Link to="/orders/list" className={`${styles.HomeMenuBU}`}>TAKE ORDER</Link>}
              {(userDetArr.post === 'Admin' || userDetArr.post === 'Store Manager' || userDetArr.post === 'Cook') && <Link to="/orders/live" className={`${styles.HomeMenuBULive}`}>GO LIVE</Link>}

            </div>
          </div>
        </div>
    </div>
  )
}


export default withAuth(Home);
