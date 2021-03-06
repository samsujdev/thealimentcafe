import React, { useEffect,useState } from 'react';
import styles from './adduser.module.css';
import { ArrowLeft } from 'react-feather';
import { TextField, Button, Snackbar, FormControlLabel, Switch, Checkbox } from '@material-ui/core';
import { useForm,Controller } from "react-hook-form";
import axios from 'axios';
import Select from 'react-select';
import Header from "../../components/header";
import Loader from "../../components/loader";
import withAuth from "../../components/withAuth";
import { useHistory,Link,useParams } from "react-router-dom";

const postList = [
  {label:'Super Admin',value:'Super Admin'},
  {label:'Admin',value:'Admin'},
  {label:'Store Manager',value:'Store Manager'},
]

function EditUser() {
  let history = useHistory();
  const {id} = useParams();
  const { register, handleSubmit, formState: { errors },setValue,control } = useForm();
  const [userCall,setUserCall] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isStatus, setIsStatus] = React.useState(false);
  

  const [state, setState] = React.useState({
    Archive: true,
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };


  useEffect(() => {
    
    function fetchUser(){
      console.log(id);

      setUserCall(true);
      axios.get(process.env.REACT_APP_APIURL+'v1/users/'+id)
      .then(res => {
        let resData = res.data.data;
        setUserCall(true);

        setValue('fullname',resData.fullname);
        setValue('emplyee_id',resData.emplyee_id);
        setValue('post',resData.post);
        setValue('contact_no',resData.contact_no);
        setValue('email',resData.email);
        setValue('area',resData.area);
        setValue('other',resData.other);
        //setValue('status',resData.status);
        
        if(parseInt(resData.status) === 0){
          setIsStatus(true);
        }

      }).catch(err =>{
        setUserCall(false);
      });
    }

    if(!userCall){
      fetchUser();
    }

  });

  const onSubmit = data => {
    if(data.status){
      data = {...data,status:0};
    }else{
      data = {...data,status:1};
    }
    setLoading(true);
    axios.put(process.env.REACT_APP_APIURL+'v1/users/'+id,data)
    .then(res => {
      setLoading(false);
      let newState = state;
      setState({ ...newState, open: true });
      history.push('/users/list');
    }).catch(err =>{
      setLoading(false);
      console.log(err);
    });
  };

  return (
    <div className="PageBody">
      
      {loading && <Loader />}
      <Header />

        <div className="Body">
          <div className="Container">
            <div className={`${styles.HomeButtonArea}`}>
              
            <div className={`${styles.BodyHeadArea}`}>
              <Link to="/users/list" className={`${styles.BackBU}`}><ArrowLeft/></Link>
              <p className={`${styles.ViewUserTitle}`}>Edit User</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

            <div className={(errors.fullname)?`${styles.LoginInput} Error`:`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Name *</label>
                <TextField id="outlined-basic1" variant="outlined" size="small" className='LoginInput' {...register("fullname", { required: true })} autoComplete="off" />
                {errors.fullname && <p className="LoginErrorText">Name Can&apos;t Be Blank</p>}
                </div>
            </div>

            <div className={(errors.emplyee_id)?`${styles.LoginInput} Error`:`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Employee ID *</label>
                <TextField id="outlined-basic2" variant="outlined" size="small" className='LoginInput'  {...register("emplyee_id", { required: true })} autoComplete="off" />
                {errors.emplyee_id && <p className="LoginErrorText">Employee ID Can&apos;t Be Blank</p>}
              </div>
            </div>

            <div className={(errors.post)?`${styles.LoginInput} Error`:`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
              <label className={`${styles.FormLabel}`}>Post *</label>
              <Controller
                render={({ field }) => <Select {...field} id="outlined-basi99c" label="Post" variant="outlined" size="small" className='LoginInput SelectForm' options={postList}
                value={postList.find(c => c.value === field.value)} onChange={val => field.onChange(val.value)} />  } {...register("post", { required: true })} control={control}
              />
                {errors.post && <p className="LoginErrorText">Post Can&apos;t Be Blank</p>}
              </div>
            </div>

            <div className={(errors.contact_no)?`${styles.LoginInput} Error`:`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Contact No. *</label>
                <TextField type="tel" id="outlined-basic4" variant="outlined" size="small" className='LoginInput'  {...register("contact_no", { required: true })} autoComplete="off" />
                {errors.contact_no && <p className="LoginErrorText">Contact Number Can&apos;t Be Blank</p>}
              </div>
            </div>

            <div className={(errors.email)?`${styles.LoginInput} Error`:`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Email ID *</label>
                <TextField type="email" id="outlined-basic5" variant="outlined" size="small" className='LoginInput' {...register("email", { required: true })} autoComplete="off" />
                {errors.email && <p className="LoginErrorText">Email Can&apos;t Be Blank</p>}
              </div>
            </div>

            <div className={(errors.area)?`${styles.LoginInput} Error`:`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Area *</label>
                <TextField id="outlined-basic6" variant="outlined" size="small" className='LoginInput' {...register("area", { required: true })} autoComplete="off" />
                {errors.area && <p className="LoginErrorText">Area Can&apos;t Be Blank</p>}
              </div>
            </div>

            {/* ************************Not maindate field************************ */}
            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Other</label>
                <TextField id="outlined-basic7" variant="outlined" size="small" className='LoginInput'  {...register("other")} autoComplete="off" />
              </div>
            </div>
            {/* ************************Not maindate field************************ */}

            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <FormControlLabel className='CheckBox'
                  control={<Checkbox {...register('is_password')} onChange={(e)=> setIsPassword(e.target.checked)} name="checkedA" />}
                  label="Change Password?"
                />
                {/* <input name="is_password" type="checkbox" {...register('is_password')} onChange={(e)=> setIsPassword(e.target.checked)} /> */}
                {/* <label className={`${styles.FormLabel}`}>Change Password?</label> */}
              </div>
            </div>

            {isPassword && <div className={(errors.password)?`${styles.LoginInput} Error`:`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <label className={`${styles.FormLabel}`}>Password *</label>
                <TextField type="password" id="outlined-basic8" variant="outlined" size="small" className='LoginInput'  {...register("password", { required: true })} autoComplete="off" />
                {errors.password && <p className="LoginErrorText">Password Can't Be Blank</p>}
              </div>
            </div>}

          {/* ************************Only for Edit and add a snackbar message when user will archive************************ */}
          {(isStatus === true) && <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <FormControlLabel className="ToggleSwitch" control={<Switch  defaultChecked color="primary" {...register("status")} />}
                  label={"Archive"}
                />

              </div>
            </div>}
           
            {(isStatus === false) && <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <FormControlLabel className="ToggleSwitch" control={<Switch  color="primary" {...register("status")} />}
                  label={"Archive"}
                />

              </div>
            </div>}
           
            {/* ************************Only for Edit and add a snackbar message when user will archive************************ */}

            <div className={`${styles.LoginInput}`}>
              <div className={`${styles.InputArea}`}>
                <Button type='submit' className="LoginBU">Edit User</Button>
              </div>
            </div>

            </form>

            </div>
          </div>
        </div>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="User Updated"
          key={vertical + horizontal}
        />

    </div>
    
  )
}

export default withAuth(EditUser);


