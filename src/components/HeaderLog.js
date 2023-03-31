
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import nbc from '../images/nbc.png';
import user from '../images/user.png';
import React, { useState, useEffect } from 'react';
const HeaderLog = ( ) => {

   const dispatch = useDispatch();
const [open ,setOpen] = useState(false)
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;
   // open= handleOpen

   const logoutHandler = () => {
      dispatch(logout());
   };
   return (
      <div>
         <div class="w-full navbar py-0 px-4 bg-white">
            <div class="flex-1">
               {' '}
               <Link to={''} class="flex items-center">
                  <img
                     src={nbc}
                     class="mr-10 h-9 sm:h-9"
                     alt=""
                  ></img>
                  <div class="flex-none hidden lg:block">
               <ul class="flex flex-col  md:flex-row  md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                  <div className="">

                  <li className="">
                     <Link
                        to={''}
                        class="block rounded py-2 mt-1 pr-4 pl-3 text-gray-800  border-gray-100 hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    
                        >
                        View
                     </Link>
                  </li>
                       </div>
                  <li>
                     <Link
                        to={''}
                        class="block rounded py-2 mt-1 pr-4 pl-3 text-gray-800  border-gray-100 hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    
                    >
                        Tools
                     </Link>
                  </li>
                  <li>
                     <Link
                        to={''}
                        onClick={() => window.print()}
                        class="block rounded py-2 mt-1 pr-4 pl-3 text-gray-800  border-gray-100 hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Print
                     </Link>
                  </li>

                  <li>
                     <Link
                        to={''}
                        class="block rounded py-2 mt-1 pr-4 pl-3 text-gray-800  border-gray-100 hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Settings
                     </Link>
                  </li>
                  
               </ul>
            </div>
               </Link>
            </div>
            
            <button class="btn btn-ghost px-2 text-black btn-circle">
               <div class="indicator">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     class="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                     />
                  </svg>
                  <span class="badge badge-xs bg-green-400 indicator-item"></span>
               </div>
            </button>
            <div class="dropdown px-2 dropdown-end">
               <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                  <div class="w-7 rounded-full">
                     <img className="w-7"
                       src={user}
                        alt=""
                     />
                  </div>
               </label>
               <ul
                  tabindex="0"
                  class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
               >
                  <Link to="">
                     {' '}
                     <li>
                        <a class="justify-between">Profile</a>
                     </li>
                  </Link>
                  {/* <Link to="/profile">
                     {' '}
                     <li>
                        <Link onClick={showHandler2}>Settings</Link>
                     </li>
                  </Link> */}

                  <Link to="/">
                     <li >
                        <a>Logout</a>
                     </li>
                  </Link>
               </ul>
            </div>
            <div onClick={() => setOpen(true)} class="flex-none hidden">
               <label
                  for="my-drawer-3"
                  class="btn btn-square text-gray-800 btn-ghost"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     class="inline-block w-6 h-6 stroke-current"
                  >
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                     ></path>
                  </svg>
               </label>
            </div>
         </div>
      </div>
   );
};

export default HeaderLog;
