import React, { useEffect,useState } from 'react';
import styles from './additem.module.css';
import { ArrowLeft, Plus } from 'react-feather';
import { TextField, Button, Snackbar } from '@material-ui/core';
import axios from 'axios';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";


function AddItem() {
  const [itemList,setItemList] = useState({'data':[],'loading':false});
  const [addData,setAddData] = useState('');
  const [editData,setEditData] = useState([]);
  

  const [state, setState] = React.useState({
    Archive: true,
    open: false,
    open2:false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open,open2 } = state;
  const handleClose = () => {
    setState({ ...state, open: false, open2:false });
  };


  useEffect(() => {
    
    function fetchItems(){
      let iList = itemList;
      iList = {...iList,'loading':true};
      setItemList(iList);
      axios.get(process.env.REACT_APP_APIURL+'v1/items')
      .then(res => {
        let iList = {'data':res.data.data,'loading':true};
        setItemList(iList);

        let eData = [];
        res.data.data.forEach((item)=>{
          eData.push(item.item_name);
        });
        setEditData(eData);

      }).catch(err =>{
        let iList = itemList;
        iList = {...iList,'loading':false};
        setItemList(iList);
      });
    }

    if(!itemList.loading){
      fetchItems();
    }

  });

  const addItem = () =>{
    if(addData !== ''){
      axios.post(process.env.REACT_APP_APIURL+'v1/items',{item_name:addData})
      .then(res => {
        setAddData('');
        let newState = state;
        setState({ ...newState, open: true });

        let itemL = itemList;
        itemL.data.push(res.data.data);
        let eDataNew = editData;
        eDataNew.push(res.data.data.item_name);

        setItemList(itemL);
        setEditData(eDataNew);

        setTimeout(()=>{
          let newState = state;
          setState({ ...newState, open: false });
        },2000);

      }).catch(err =>{
        console.log(err);
      });
    }
  }

  const editItem = (id,index)=>{
    let item_name = editData[index];
    axios.put(process.env.REACT_APP_APIURL+'v1/items/'+id,{item_name:item_name})
      .then(res => {
        let newState = state;
        setState({ ...newState, open2: true });

        setTimeout(()=>{
          let newState = state;
          setState({ ...newState, open2: false });
        },2000);

      }).catch(err =>{
        console.log(err);
      });
  }

  const itemNameChage = (e,index) =>{
    let itemL = editData;
    itemL[index] = e.target.value;
    setEditData(itemL);
  }

  return (
    <div>

        <Header />

        <div className="Body">
          <div className="Container">
            <div className={`${styles.HomeButtonArea}`}>
              
            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/stocks/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>List Of Items</p>
            </div>

            {itemList.data.map((item,index)=>{
              return (<div key={index} className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <TextField id={"outlined-basic"+index} label="Item Name" defaultValue={item.item_name} variant="outlined" size="small" className='LoginInput' onChange={(e)=>itemNameChage(e,index)} autoComplete="off" />                
              </div>
              <Button onClick={editItem.bind(this,item.id,index)} className={`${styles.AddEditBU}`}><Plus/> Edit</Button>
            </div>)
            })}

            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <TextField id="outlined-basic" label="Item Name" variant="outlined" size="small" className='LoginInput' value={addData} onChange={evt => setAddData(evt.target.value)} autoComplete="off" />                
              </div>
              <Button onClick={addItem} className={`${styles.AddEditBU}`}><Plus/> Add</Button>
            </div>

            

            {/*<div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <Button className={`${styles.LoginBU}`}><Plus/></Button>
              </div>
            </div>*/}

            </div>
          </div>
        </div>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="New item added successfully"
          key={vertical + horizontal}
        />

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open2}
          onClose={handleClose}
          message="Item updated successfully"
          key={vertical + horizontal}
        />

    </div>
  )
}

export default withAuth(AddItem);