import React from 'react';
import styles from './production-stock.module.css';
import withAuth from "../../components/withAuth";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from 'react-feather';
import { Dialog, DialogTitle, DialogContent, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

function Inventory() {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState('stockIn');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>

        <Header />

        <div className="Body">
          <div className={`${styles.Container}`}>

             <div className={`${styles.BodyHeadArea}`}>
              <Link to="/shop/inventory" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Production Stock</p>
            </div>

            

            <div className={`${styles.TableContainer}`}>
              <table>
                <tr>
                  <th>S.N.</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th className='TextCenter'>Pake Off</th>
                  <th className='TextCenter'>Unit</th>
                  <th className='TextCenter'>Date</th>
                  <th className='TextCenter'>Stock Out</th>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Chicken BL</p></td>
                  <td><p>Meat & Fish</p></td>
                  <td><p className='TextCenter'>2Kg</p></td>
                  <td><p className='TextCenter'>1</p></td>
                  <td><p className='TextCenter'>04/05/2022</p></td>
                  <td><p className='TextCenter'>Stock In</p>
                  </td>
                </tr>
                <tr>
                  <td><p>1</p></td>
                  <td><p>Chicken DS</p></td>
                  <td><p>Meat & Fish</p></td>
                  <td><p className='TextCenter'>1Kg</p></td>
                  <td><p className='TextCenter'>2</p></td>
                  <td><p className='TextCenter'>04/05/2022</p></td>
                  <td><p className='TextCenter'>Stock In</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={9}>
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
          className="Popup"
        >
          <DialogTitle>Choose One</DialogTitle>
          <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="stockIn" control={<Radio />} label="Stock In" />
              <FormControlLabel value="stockOut" control={<Radio />} label="Stock Out" />
            </RadioGroup>
          </FormControl>
          </DialogContent>
        </Dialog>

    </div>
  )
}


export default withAuth(Inventory);
