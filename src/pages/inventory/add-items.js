import React from 'react';
import styles from './add-items.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, FilePlus, AlertTriangle } from 'react-feather';
import { Button, Dialog, TextField, DialogContent, DialogTitle, MenuItem, FormControl, Select } from '@material-ui/core';

function AddItems() {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectCategory, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>

        <Header />

        <div className="Body">
          <div className="Container">

            <div className={`${styles.BodyHeadArea}`}>
              <p className={`${styles.ViewUserTitle}`}>Items</p>
            </div>

            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/inventory/create" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <Link onClick={handleClickOpen} className={`${styles.HomeMenuBU}`}><FilePlus/> Add Items</Link>
            </div>

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Items</th>
                  <th>Category</th>
                  <th className='TextCenter'>Date</th>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Chicken</p></td>
                  <td><p>Fresh</p></td>
                  <td><p className='TextCenter'>02/03/2022</p></td>
                </tr>
                <tr>
                  <td><p>2</p></td>
                  <td><p>Vetki</p></td>
                  <td><p>Fresh</p></td>
                  <td><p className='TextCenter'>02/03/2022</p></td>
                </tr>
                <tr>
                  <td><p>3</p></td>
                  <td><p>Prawn</p></td>
                  <td><p>Fresh</p></td>
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
            Create Items
          </DialogTitle>
          <DialogContent>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Category Name</label>
                <FormControl variant="outlined" className="LoginInput BlIcon CusPadd">
                  <Select
                    
                    value={selectCategory}
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value="fresh">Fresh</MenuItem>
                    <MenuItem value="spices">Spices</MenuItem>
                    <MenuItem value="packing">Packing Materials</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Category Name</label>
                <TextField id="outlined-basic1" variant="outlined" size="small" className='LoginInput' autoComplete="off" />
              </div>
            </div>
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Pack Off</label>
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


export default withAuth(AddItems);
