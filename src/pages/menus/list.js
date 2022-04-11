import React, { useEffect,useState } from 'react';
import styles from './list.module.css';
import { ArrowLeft, FilePlus,AlertTriangle } from 'react-feather';
import axios from 'axios';
import Header from "../../components/header";
import withAuth from "../../components/withAuth";
import { Link } from "react-router-dom";

function MenuList() {
  const userDet = localStorage.getItem("userDet");
  const userDetArr = JSON.parse(userDet);
  const [menuList,setMenuList] = useState({'data':[],'loading':false});
  useEffect(() => {
    
    function fetchMenu(){
      let mlist = menuList;
      mlist = {...mlist,'loading':true};
      setMenuList(mlist);
      axios.get(process.env.REACT_APP_APIURL+'v1/menus')
      .then(res => {
        let mlist = {'data':res.data.data,'loading':true};
        setMenuList(mlist);
      }).catch(err =>{
        let mlist = menuList;
        mlist = {...mlist,'loading':false};
        setMenuList(mlist);
      });
    }

    if(!menuList.loading){
      fetchMenu();
    }

  });

  return (
    <div>

        <Header />

        

        <div className="Body">
          <div className="Container">

            <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Menu</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              {userDetArr.post === 'Super Admin' && <Link to="/menus/add" className={`${styles.HomeMenuBU}`}><FilePlus/> Create Menu</Link>}
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tbody>
                <tr>
                  <th>S.N.</th>
                  <th>Menu</th>
                  <th>Items</th>
                  <th className='TextCenter'>Units</th>
                  <th className='TextCenter'>Value</th>
                </tr>

                {menuList.data.map((item,index)=>{
                  return (<tr key={index}>
                    <td>
                      <p>{(index+1)}</p>
                    </td>
                    <td>
                      <p>{item.menu_name}</p>
                    </td>
                    <td>
                      {item.items.map((subItem,subIndex)=>{
                        return <p key={subIndex}>{subItem.item}</p>
                      })}
                    </td>
                    <td>
                    {item.items.map((subItem,subIndex)=>{
                        return <p className='TextCenter' key={subIndex}>{subItem.unit}</p>
                      })}
                      </td>
                    <td>
                      <p className='TextCenter'>{item.amount}</p>
                    </td>
                  </tr>);
                })}
                {!menuList.data.length && <tr>
                  <td colSpan={8}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>}
                </tbody>
              </table>
            </div>

          </div>
        </div>

    </div>
  )
}
export default withAuth(MenuList);