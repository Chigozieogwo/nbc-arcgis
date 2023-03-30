import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import file from "../images/file2.png"
import document2 from "../images/file.png"
const SidebarDetail = () => {
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
                  {/* <img className='w-7' src={file}></img> */}
                  <div className="flex justify-center items-center">

                  <p className="text-center text-sm font-medium mx-2 text-white py-2">Open Map Viewer</p>
                  </div>
                </div>
                <p className="text-left text-xs mt-4 mb-2 font-medium mx-2 text-gray-500 "></p>

                <div className="space-y-2">
                <div className="flex justify-center items-center  bg-white border border-gray-800 px-4 py-3 cursor-pointer ">

<p className="text-center text-sm font-medium mx-2 text-gray-500 ">Layers</p>
</div>
                <div className="flex justify-center items-center  bg-white border border-gray-800 px-4 py-3 cursor-pointer ">

<p className="text-center text-sm font-medium mx-2 text-gray-500 ">Details</p>
</div>
                <div className="flex justify-center items-center  bg-white border border-gray-800 px-4 py-3 cursor-pointer ">

<p className="text-center text-sm font-medium mx-2 text-gray-500 ">Boundaries</p>
</div>
                </div>

                <div className="space-y-1">
                
               
                
                
                </div>
         </aside>
      </div>
   );
};

export default SidebarDetail;
