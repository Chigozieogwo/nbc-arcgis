/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react';
import HeaderLog from '../components/HeaderLog';
import { Fragment } from 'react';
import file2 from "../images/file2.png"
import SidebarLayer from '../components/SidebarLayer';
import SidebarLeft from '../components/SidebarLeft';


import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { logout, getUserDetails } from '../actions/userActions';
// import { userDepositAction } from '../actions/depositActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

// import {
//    USER_UPDATE_PROFILE_RESET,
//    USER_UPDATE_PROFILE_ME_RESET
// } from '../constants/userConstants';

const LayerScreen = ({ match }) => {
//    const [userDepositm, setUserDepositm] = useState({});
//    const location = useLocation();
//    const navigate = useNavigate();

//    const dispatch = useDispatch();

//    const userLogin = useSelector((state) => state.userLogin);
//    const { userInfo } = userLogin;

//    const userDetails = useSelector((state) => state.userDetails);
//    const { loading, error, user } = userDetails;
//    const { acctBalance } = user;

   // }
   // console.log(JSON.stringify(userDeposits) + 'dashboard userInfo');

//    useEffect(() => {
//       // if (user.name) {
//       //    dispatch(userDepositAction());
//       //    console.log(userDeposits + 'nice come and see the goodness');
//       // }
//       // dispatch(getUserDetails('profile'));
//       if (!userInfo) {
//          navigate('/login');
//       } else {
//          // dispatch(getUserDetails('profile'));
//          if (!user || !user.name) {
//             // dispatch({ type: USER_UPDATE_PROFILE_RESET });
//             dispatch(getUserDetails('profile'));
//             // dispatch(userDepositAction());

//             // const depo = setUserDepositm(userDeposits);
//             // console.log(depo + 'come and see the goodness');
//          }
//       }
//    }, [navigate, userInfo, user]);

   return (
      <>

         <HeaderLog />
         <div className=" flex justify-between">







         <div class="bg-white">
                  {/* <label for="my-drawer-3" class="drawer-overlay"></label> */}
                  <ul class="  w-20 ">
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                     <SidebarLeft></SidebarLeft>
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                  </ul>
                 
               </div>
               <div className="w-full bg-slate-100 ">
                  <div className="h-10"></div>
                   <div className=" ficonlayer min-h-screen flex justify-center items-center cursor-pointer  ">
                     
                   </div>
                   
                  
                   
                                     </div>
         <div class=" mt-1 bg-blue-200 hidden md:block">
                  {/* <label for="my-drawer-3" class="drawer-overlay"></label> */}
                  <ul class="w-60 ">
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                     <SidebarLayer></SidebarLayer>
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                  </ul>
                 
               </div>
           
               {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
               
               

               {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          
         </div>
      </>
   );
};

export default LayerScreen;
