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
              
              {(userDetArr.post === 'Admin' || userDetArr.post === 'Store Manager') && <Link to="/stocks/stock-update" className={`${styles.HomeMenuBU}`}>STOCK UPDATE</Link>}
              {(userDetArr.post === 'Admin' || userDetArr.post === 'Store Manager') && <Link to="/orders/list" className={`${styles.HomeMenuBU}`}>TAKE ORDER</Link>}
              {(userDetArr.post === 'Admin' || userDetArr.post === 'Cook') && <Link to="/orders/live" className={`${styles.HomeMenuBULive}`}>GO LIVE</Link>}

            </div>
          </div>
        </div>

        <div className='Loader'>
        <svg version="1.1" id="L9" x="0px" y="0px"
          viewBox="0 0 100 100" enable-background="new 0 0 0 0">
            <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
              <animateTransform 
                attributeName="transform" 
                attributeType="XML" 
                type="rotate"
                dur="1s" 
                from="0 50 50"
                to="360 50 50" 
                repeatCount="indefinite" />
          </path>
        </svg>
        </div>

    </div>
  )
}


export default withAuth(Home);
