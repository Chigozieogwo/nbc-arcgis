/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react';
import HeaderLog from '../components/HeaderLog';
import { Fragment } from 'react';
import file2 from "../images/file2.png"
import Sidebar from '../components/Sidebar';
import SidebarLeft from '../components/SidebarLeft';
import line from "../images/line.png"
import circle from "../images/circle.png"
import moon from "../images/moon.png"
import edit from "../images/editing.png"
import square from "../images/square.png"
import pentagon from "../images/pentagon.png"
import pin from "../images/pin.png"
import delete1 from "../images/delete.png"

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

const DocumentScreen = ({ match }) => {
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
                  <ul class="hidden md:block   w-20 ">
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                     <SidebarLeft></SidebarLeft>
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                  </ul>
                 
               </div>
               <div className="w-full bg-slate-100 ">
               


               




                   <div className=" ficon min-h-screen flex justify-center items-center cursor-pointer  ">
                     <div className="bg-white rounded-md group px-8 py-3 group-hover:bg-green-500 w-4/5 md:w-2/5">
                        <h3 className="text-lg font-bold text-gray-500 mt-8 mb-4 text-center">Create New Document</h3>
                     <div className="space-y-8">
                        

                     <div class="relative">
        <input type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Document Name</label>
    </div>
                     <div class="relative">
        <input type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Description</label>
    </div>
                     <div class="relative">
        <input type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Terms of Use</label>
    </div>
                    <div className="flex justify-center items-center ">
                    <button className="px-14 py-2 bg-green-500 hover:bg-green-600 text-white text-md mb-8"> Create</button>

                    </div>
                     </div>

                     


                     </div>
                   </div>
                   
                  
                   
                                     </div>
         <div class=" mt-1 bg-blue-200 hidden md:block">
                  {/* <label for="my-drawer-3" class="drawer-overlay"></label> */}
                  <ul class="w-60 ">
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                     <Sidebar></Sidebar>
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                  </ul>
                 
               </div>
           
               {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
               
               

               {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          
         </div>
      </>
   );
};

export default DocumentScreen;
