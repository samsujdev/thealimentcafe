import React, { useEffect,useState } from 'react';
import styles from './inventory.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, FilePlus, AlertTriangle } from 'react-feather';
import axios from 'axios';

function Inventory() {
  const [inventoryList, setInventoryList] = useState({'data':[],'loading':false});

  useEffect(() => {
    if(!inventoryList.loading){
      fetchInventory();
    }
  });

  const fetchInventory = () =>{
    let olist = inventoryList;
    olist = {...olist,'loading':true};
    setInventoryList(olist);
    axios.get(process.env.REACT_APP_APIURL+'v1/inventories')
    .then(res => {
      let olist = {'data':res.data.data,'loading':true};
      setInventoryList(olist);
    }).catch(err =>{
      let olist = inventoryList;
      olist = {...olist,'loading':false};
      setInventoryList(olist);
    });
  }

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
              <Link to="/shop-now" className={`${styles.HomeMenuBU}`}><FilePlus/> Shop Now</Link>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th className='TextCenter'>Pake Off</th>
                  <th className='TextCenter'>Unit</th>
                  {/*<th className='TextCenter'>Date</th>*/}
                </tr>
                {inventoryList.data.map((item,index)=>{
                  return (<tr key={index}>
                  <td><p>{index+1}</p></td>
                  <td><p>{item.item_name}</p></td>
                  <td><p>{item.category_name}</p></td>
                  <td><p className='TextCenter'>{item.packoff}</p></td>
                  <td><p className='TextCenter'>{item.current_unit}</p></td>
                  {/*<td><p className='TextCenter'>{moment(item.created_at).format('DD/MM/YYYY')}</p></td>*/}
                </tr>)
                })}

                {!inventoryList.data.length && <tr>
                  <td colSpan={6}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>}
              </table>
            </div>

          </div>
        </div>
    </div>
  )
}


export default withAuth(Inventory);
