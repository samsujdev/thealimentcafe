import React from 'react';
import styles from './add-category.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, FilePlus, AlertTriangle } from 'react-feather';
import { Button, Dialog, TextField, DialogContent, DialogTitle } from '@material-ui/core';

function AddCategory() {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

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
                <tr>
                  <td><p>1</p></td>
                  <td><p>Fresh</p></td>
                  <td><p className='TextCenter'>20</p></td>
                  <td><p className='TextCenter'>02/03/2022</p></td>
                </tr>
                <tr>
                  <td><p>2</p></td>
                  <td><p>Spices</p></td>
                  <td><p className='TextCenter'>57</p></td>
                  <td><p className='TextCenter'>02/03/2022</p></td>
                </tr>
                <tr>
                  <td><p>3</p></td>
                  <td><p>Packing Materials</p></td>
                  <td><p className='TextCenter'>17</p></td>
                  <td><p className='TextCenter'>02/03/2022</p></td>
                </tr>
                <tr>
                  <td colSpan={8}>
                    <div className={`${styles.NoDataFound}`}>
                      <AlertTriangle />
                      <p>No data Found</p>
                    </div>
                  </td>
                </tr>
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
                <TextField id="outlined-basic1" variant="outlined" size="small" className='LoginInput' autoComplete="off" />
              </div>
            </div>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <Button type='submit' className="LoginBU">Submit</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

    </div>
  )
}


export default withAuth(AddCategory);
