import React, { useEffect,useState } from 'react';
import styles from './list.module.css';
import { ArrowLeft, Plus,AlertTriangle } from 'react-feather';
import axios from 'axios';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";

function Stock() {
  const [itemList,setItemList] = useState({'data':[],'loading':false});

  useEffect(() => {
    
    function fetchItems(){
      let ilist = itemList;
      ilist = {...ilist,'loading':true};
      setItemList(ilist);
      axios.get(process.env.REACT_APP_APIURL+'v1/items')
      .then(res => {
        let ilist = {'data':res.data.data,'loading':true};
        setItemList(ilist);
      }).catch(err =>{
        console.log(1111);
        let ilist = itemList;
        ilist = {...ilist,'loading':false};
        setItemList(ilist);
      });
    }

    if(!itemList.loading){
      fetchItems();
    }

  });

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
              <Link to="/stocks/add-item" className={`${styles.HomeMenuBU}`}><Plus/> Add Items</Link>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tbody>
                <tr>
                  <th colSpan={3} className={`${styles.TextCenter}`}>Live Stocks</th>
                </tr>
                <tr>
                  <th>S.N.</th>
                  <th>Items</th>
                  <th>Units</th>
                </tr>

                {itemList.data.map((item,index)=>{

                  return (<tr key={index}>
                    <td>
                      <p>{(index+1)}</p>
                    </td>
                    <td>
                      <p>{item.item_name}</p>
                    </td>
                    <td>
                      <p>{item.live_stock}</p>
                    </td>
                  </tr>);

                })}
                {!itemList.data.length && <tr>
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

export default withAuth(Stock);
