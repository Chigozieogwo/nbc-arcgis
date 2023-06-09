import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message';

import { login } from '../actions/userActions';
// import Header from '../components/header'
import logo from '../images/nbc.png'

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search
     ? location.search.split('=')[1]
     : '/map';

  useEffect(() => {
     if (userInfo) {
        navigate(redirect);
     }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
     e.preventDefault();
     dispatch(login(email, password));
  };



  return (
    <div className=" m-8">


      {/* <Header /> */}
      <div className="py-4 px-8 md:px-16 bg-slate-100 border border-green-500">
        <div style={{ }}>
          <div class="flex justify-center items-center md:block">
          <div class=" ">
              <div class="avatar pr-4 ">
                <div class="h-16 w-16 md:h-24 md:w-24 rounded-full my-5">
                  <img src={logo} class="mr-3 " alt="nbc logo"></img>
                </div>
              </div>
            </div>
           
          </div>
<h3 class="text-center text-3xl font-semibold -mt-6 mb-4">Sign In</h3>
                  {/* {loading && <Loader />} */}
                  {/* {error && <Message variant="danger">{error}</Message>} */}
          <div
            className="py-4 flex justify-center items-center "
            >
            <div class="w-full md:w-2/5  rounded-md bg-base-100">
              <div class="p-8 space-y-5">
              <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"   placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
        </div>
              <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"   placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
        </div>
             
                
                
                <div class="form-control">
                
                  {/* <label class="label">
                    <a href="#" class="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label> */}
                </div>
                <div class="form-control mt-6">
                <Link  onClick={submitHandler}>
                  <button
                      type="button"
                      
                    class="text-white w-full  bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                   Login
                    
                  </button>
                  </Link> 
                  
                </div>
              </div>
            </div>
          </div>
          <div class="text-center pt-12 pb-12 text-sm">
                     <p>
                        Don't have an account?{' '}
                        <Link className="underline underline-green-300 text-green-700 " to={'/register'}>click to register</Link>
                     </p>
                  </div>
        </div>
      </div>
      <div class="mt-20 flex justify-center bg-base-100">
            <h1> National Boundary Commission &copy;  Copyright 2023 </h1>
            
            
          
          </div>
    </div>
  )
}

export default LoginScreen
