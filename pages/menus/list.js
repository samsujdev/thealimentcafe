import React, { useEffect,useState } from 'react';
import styles from './list.module.css';
import { Link } from '@material-ui/core';
import { Power, ArrowLeft, FilePlus } from 'react-feather';
import axios from 'axios';
import Header from "../component/header";

export default function MenuList() {
  const [menuList,setMenuList] = useState({'data':[],'loading':false});
  useEffect(() => {
    
    function fetchMenu(){
      let mlist = menuList;
      mlist = {...mlist,'loading':true};
      setMenuList(mlist);
      axios.get(process.env.apiUrl+'v1/menus')
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
              <Link href="/home" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <Link href="/menus/add" className={`${styles.HomeMenuBU}`}><FilePlus/> Create Menu</Link>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tbody>
                <tr>
                  <th>S.N.</th>
                  <th>Menu</th>
                  <th>Items</th>
                  <th>Units</th>
                  <th>Value</th>
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
                        return <p key={subIndex}>{subItem.unit}</p>
                      })}
                      </td>
                    <td>
                      <p>{item.amount}</p>
                    </td>
                  </tr>);
                })}
                </tbody>
              </table>
            </div>

          </div>
        </div>

    </div>
  )
}