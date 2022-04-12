import React, { useEffect,useState } from 'react';
import styles from './add-category.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, FilePlus, AlertTriangle } from 'react-feather';
import { Button, Dialog, TextField, DialogContent, DialogTitle } from '@material-ui/core';
import axios from 'axios';
import Loader from "../../components/loader";
import moment from 'moment';

function AddCategory() {
  const [catName, setCatName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [categoryList,setCategoryList] = useState({'data':[],'loading':false});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setCatName('');
    setOpen(false);
  };

  useEffect(() => {
    if(!categoryList.loading){
      fetchInventoryCategories();
    }
  });

  const fetchInventoryCategories = () =>{
    let olist = categoryList;
    olist = {...olist,'loading':true};
    setCategoryList(olist);
    axios.get(process.env.REACT_APP_APIURL+'v1/inventory-categories',)
    .then(res => {
      let olist = {'data':res.data.data,'loading':true};
      setCategoryList(olist);
    }).catch(err =>{
      let olist = categoryList;
      olist = {...olist,'loading':true};
      setCategoryList(olist);
    });
  }

  const addCategory = () =>{
    if(catName === '')
      return false;

    setOpen(false);
    setLoading(true);

    axios.post(process.env.REACT_APP_APIURL+'v1/inventory-categories',{category_name:catName})
    .then(res => {
      setLoading(false);
      let catList = categoryList.data;
      catList.push(res.data.data);
      setCategoryList({'data':catList,'loading':false});
    }).catch(err =>{
      setLoading(false);
      console.log(err);
    });
  }

  return (
    <div>

        {loading && <Loader />}
        <Header />

        <div className="Body">
          <div className="Container">
            
            <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Category</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/inventory/create" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <Link onClick={handleClickOpen} className={`${styles.HomeMenuBU}`}><FilePlus/> Add Category</Link>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Category</th>
                  <th className='TextCenter'>Items</th>
                  <th className='TextCenter'>Date</th>
                </tr>
                {categoryList.data.map((item,index)=>{
                  return (<tr key={index}>
                    <td><p>{(index+1)}</p></td>
                    <td><p>{item.category_name}</p></td>
                    <td><p className='TextCenter'>{item.items}</p></td>
                    <td><p className='TextCenter'>{moment(item.created_at).format('DD/MM/YYYY')}</p></td>
                  </tr>)
                })}
                {!categoryList.data.length && <tr>
                  <td colSpan={8}>
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

        <Dialog
          open={open}
          onClose={handleClose}
          
        >
          <DialogTitle className='TextCenter'>
            Create Category
          </DialogTitle>
          <DialogContent>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Category Name</label>
                <TextField id="outlined-basic1" variant="outlined" size="small" className='LoginInput Black' autoComplete="off" onChange={(e)=>setCatName(e.target.value)} />
              </div>
            </div>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <Button type='button' onClick={addCategory} className="LoginBU">Submit</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

    </div>
  )
}


export default withAuth(AddCategory);
