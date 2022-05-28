import React, { useEffect,useState } from 'react';
import styles from './userlist.module.css';
import { Edit, ArrowLeft } from 'react-feather';
import {  Button } from '@material-ui/core';
import axios from 'axios';
import Header from "../../components/header";
import withAuth from "../../components/withAuth";
import { useHistory,Link } from "react-router-dom";


function Users() {
  let history = useHistory();
  const [userList,setUserList] = useState({'data':[],'loading':false});

  useEffect(() => {
    
    function fetchUsers(){
      let uslist = userList;
      uslist = {...uslist,'loading':true};
      setUserList(uslist);
      axios.get(process.env.REACT_APP_APIURL+'v1/users')
      .then(res => {
        let uslist = {'data':res.data.data,'loading':true};
        setUserList(uslist);
      }).catch(err =>{
        console.log(1111);
        let uslist = userList;
        uslist = {...uslist,'loading':false};
        setUserList(uslist);
      });
    }

    if(!userList.loading){
      fetchUsers();
    }

  });

  const editClick = (e,itemId)=>{
    e.preventDefault();
    history.push('/users/edit/'+itemId);
  }


  return (
    <div className="PageBody">

        <Header />

        <div className="Body">
          <div className="Container">
            <div className={`${styles.HomeButtonArea}`}>
              <div className={`${styles.BodyHeadArea}`}>
                <Link to="/dashboard" className={`${styles.BackBU}`}><ArrowLeft/></Link>
                <Link to="/users/add" className={`${styles.HomeMenuBU}`}>CREATE USER</Link>
              </div>

              {userList.data.map((item,index)=>{
                return (<Link to={"/users/view/"+item.id} key={index} className={`${styles.UserList}`}>
                  <div className={`${styles.UserListDe}`}>
                    <p className={`${styles.UserListTitle}`}>{item.fullname}</p>
                    <p className={`${styles.UserListID}`}>{item.emplyee_id} <span className={(parseInt(item.status))?`${styles.Active}`:`${styles.Archive}`}>{(item.status)?`Active`:`Archive`}</span></p>
                    <p className={`${styles.UserListDesig}`}>{item.post}</p>
                  </div>
                  <Button onClick={(e)=>editClick(e,item.id)} className={`${styles.UserEditBU}`}><Edit/></Button>
                </Link>)
              })}

            </div>
          </div>
        </div>

    </div>
  )
}

export default withAuth(Users);