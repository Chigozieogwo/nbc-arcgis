import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import document2 from "../images/file.png"
import map from "../images/map.png"
import detail from "../images/search.png"
import layers from "../images/layers.png"

const SidebarLeft = () => {
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
         <aside class="w-20 min-h-screen bg-white" aria-label="SidebarLeft">
           
                <div className="space-y-4 mt-5">
                <Link to="/create">
                  <div className="group ">
                  <div className=" group-hover:bg-green-500 px-4 py-2 cursor-pointer group-hover:text-white">
                     <div className="flex justify-center items-center">
                        <img className="w-10" src={document2}></img>
                     </div>
                     <div className="flex justify-center items-center px-2">
                       
                        <p className="text-center text-xs font-medium mx-2 ">Documents</p>
                     </div>
                  </div>
                  </div>
                  </Link>
                  <Link to="/layer">
                  
                  <div className="group ">

                  <div className=" group-hover:bg-green-500 px-4 py-2 cursor-pointer group-hover:text-white">
                     <div className="flex justify-center items-center">
                        <img className="w-10" src={layers}></img>
                     </div>
                     <div className="flex justify-center items-center px-2">
                       
                        <p className="text-center text-xs font-medium mx-2 ">Layers</p>
                     </div>
                  </div>
                  </div>
                  </Link>
                  
                  <Link to="/details">
                  <div className="group ">
                  <div className=" group-hover:bg-green-500 px-4 py-2 cursor-pointer group-hover:text-white">
                     <div className="flex justify-center items-center">
                        <img className="w-10" src={detail}></img>
                     </div>
                     <div className="flex justify-center items-center px-2">
                       
                        <p className="text-center text-xs font-medium mx-2 ">Details</p>
                     </div>
                  </div>
                  </div>
                  </Link>

                  <Link to="/map">
                  <div className="group ">
                  <div className=" group-hover:bg-green-500 px-4 py-2 cursor-pointer group-hover:text-white">
                     <div className="flex justify-center items-center">
                        <img className="w-10" src={map}></img>
                     </div>
                     <div className="flex justify-center items-center px-2">
                       
                        <p className="text-center text-xs font-medium mx-2 ">Boundaries</p>
                     </div>
                  </div>
                  </div>
                  </Link>

                  
                </div>
         </aside>
      </div>
   );
};

export default SidebarLeft;
