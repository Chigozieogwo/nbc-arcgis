import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import file from "../images/file2.png"
import document2 from "../images/file.png"
const Sidebar = () => {
   // const dispatch = useDispatch();

   // const userLogin = useSelector((state) => state.userLogin);
   // const { userInfo } = userLogin;
   // console.log(userInfo + 'dashboard');
   // const logoutHandler = () => {
   //    dispatch(logout());
   // };
   return (
      <div>
         {' '}
         <aside class="w-60 min-h-screen bg-slate-100 border border-l-green-500 border-1 px-3" aria-label="Sidebar">
           
                <div className="flex space-x-4 bg-green-500 px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={file}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-sm font-medium mx-2 text-white ">New Document</p>
                  </div>
                </div>
                <p className="text-left text-xs mt-4 mb-2 font-medium mx-2 text-gray-500 ">open saved document</p>

                <div className="space-y-1">
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">National Boundary in Sokoto</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">National-Cameroun boarder</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">Niger-Chad Boarder</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">National Boarder in Borno</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">National Boarder in Jigawa</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">Nigeria-Benin Boarder</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">Nigeria-Niger Boarder</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">National Boarder in Zamfara</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">National Boarder in Oyo</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={document2}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-xs font-medium mx-2 text-gray-500 ">National Boarder in Niger</p>
                  </div>
                </div>
                </div>
         </aside>
      </div>
   );
};

export default Sidebar;
