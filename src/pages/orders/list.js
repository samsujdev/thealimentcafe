import React from 'react';
import styles from './list.module.css';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { ArrowLeft, Plus,AlertTriangle } from 'react-feather';
import axios from 'axios';
import Header from "../../components/header";
import Loader from "../../components/loader";
import withAuth from "../../components/withAuth";
import { Link } from "react-router-dom";


class Order extends React.Component {
  state = {
    loading:false,
    itemList: [],
    orderList:[]
  }

  componentDidMount() {
    this.fetchItems();
    this.fetchOrders();
    this.interval1 = setInterval(() => this.fetchItems(), 5000);
    this.interval2 = setInterval(() => this.fetchOrders(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }

  fetchItems(){
    axios.get(process.env.REACT_APP_APIURL+'v1/items')
    .then(res => {
      this.setState({...this.state,itemList:res.data.data});
    });
  }

  fetchOrders(){
    axios.get(process.env.REACT_APP_APIURL+'v1/take-orders')
    .then(res => {
      this.setState({...this.state,orderList:res.data.data});
    });
  }

  setPayment = (event,itemId)=>{
    this.setState({...this.state,loading:true});
    let is_paid = 0;
    if(event.target.checked){
      is_paid = 1;
    }
    axios.put(process.env.REACT_APP_APIURL+'v1/orders/'+itemId,{is_paid:is_paid})
    .then(res => {
      this.setState({...this.state,loading:false});
      clearInterval(this.interval2);
      this.fetchOrders();
      this.interval2 = setInterval(() => this.fetchOrders(), 5000);
    }).catch(err =>{
      this.setState({...this.state,loading:false});
      console.log(err);
    });
  }

  setDelivered = (event,itemId)=>{
    this.setState({...this.state,loading:true});
    let status = 1;
    if(event.target.checked){
      status = 2;
    }
    axios.put(process.env.REACT_APP_APIURL+'v1/orders/'+itemId,{status:status})
    .then(res => {
      this.setState({...this.state,loading:false});
      clearInterval(this.interval2);
      this.fetchOrders();
      this.interval2 = setInterval(() => this.fetchOrders(), 5000);
    }).catch(err =>{
      this.setState({...this.state,loading:false});
      console.log(err);
    });
  }

  
  render() {
  return (
    <div>

      {this.state.loading && <Loader />}
      <Header />

        

        <div className="Body">
          <div className="Container">

          <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Order</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <Link to="/orders/add-order" className={`${styles.HomeMenuBU}`}><Plus/> Take Order</Link>
            </div>

            <div className={`${styles.StockUpdateRow}`}>
              {this.state.itemList.map((item,index)=>{
                return (<div key={index} className={`${styles.Stock}`}>
                <p className={`${styles.StockName}`}>{item.item_name}</p>
                <p className={`${styles.StockUnit}`}>{item.live_stock}</p>
              </div>)
              })}
            </div>
              
            <div className={`${styles.TableContainer} CheckBoxWithoutLabel`}>
              <table>
               
                <tr>
                  <th>S.N.</th>
                  <th>Name</th>
                  <th>Order</th>
                  <th className='TextCenter'>Qnt</th>
                  <th className='TextCenter'>Price</th>
                  <th className='TextCenter'>Offer</th>
                  <th className='TextCenter'>Total</th>
                  <th className='TextCenter'>Payment</th>
                  <th className='TextCenter'>Status</th>
                </tr>
                
                {this.state.orderList.map((item,index)=>{
                  return (<tr key={index} className={(parseInt(item.status) === 2)?`${styles.Delivered}`:((parseInt(item.status) === 1)?`${styles.Ready}`:`${styles.Cooking}`)}>
                  <td>
                    <p>{index+1}</p>
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>
                  {item.items.map((subItem,subIndex)=>{
                    return (<p key={subIndex}>{subItem.item}</p>)
                  })}
                  </td>
                  <td>
                  {item.items.map((subItem,subIndex)=>{
                    return (<p className='TextCenter' key={subIndex}>{subItem.quantity}</p>)
                  })}
                  </td>
                  <td>
                  {item.items.map((subItem,subIndex)=>{
                    return (<p className='TextCenter' key={subIndex}>{subItem.price}</p>)
                  })}
                  </td>
                  <td>
                    <p className='TextCenter'>{item.offer}%</p>
                    </td>
                  <td>
                    <p className='TextCenter'>{item.totalamount}</p>
                  </td>
                  <td>
                    {parseInt(item.is_paid) === 1 && <p className={`${styles.Paid} TextCenter`}>Paid</p>}
                    {parseInt(item.is_paid) === 0 && <p className='TextCenter'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e)=>this.setPayment(e,item.id)}
                            name="payment"
                            color="primary"
                          />
                        }
                      />
                    </p>}
                  </td>
                  <td>
                  {parseInt(item.status) === 0 && <p className='TextCenter'>Cooking</p>}
                  {(parseInt(item.status) === 1 && parseInt(item.is_paid) === 0) && <p className='TextCenter'>Ready</p>}
                  {(parseInt(item.status) === 1 && parseInt(item.is_paid) === 1) && <p className='TextCenter'><FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e)=>this.setDelivered(e,item.id)}
                            name="payment"
                            color="primary"
                          />
                        }
                      /> Ready</p>}
                  {parseInt(item.status) === 2 && <p className='TextCenter'>Delivered</p>}
                  </td>
                </tr>)
                })}
                
                {!this.state.orderList.length && <tr>
                  <td colSpan={12}>
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
  )}
}

export default withAuth(Order);