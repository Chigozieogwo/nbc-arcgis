import React from 'react';
import logo from '../images/logo3.png';
import { Link } from 'react-router-dom';
const Footer = () => {
   return (
      <div>
         <footer class="p-4 bg-indigo-900 text-white sm:p-6 dark:bg-gray-800">
            <div class="md:flex md:justify-between">
               <div class="mb-6 md:mb-0">
                  <a href="https://flowbite.com" class="flex items-center">
                     <img src={logo} class="mr-3 h-12" alt=""></img>
                     <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Altuimcreast
                     </span>
                  </a>
               </div>
               <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                     <h2 class="mb-6 text-sm text-white font-semibold text-gray-900 uppercase dark:text-white">
                        Resources
                     </h2>
                     <ul class="text-white dark:text-gray-400">
                        <li class="mb-4">
                           <a
                              href="https://flowbite.com"
                              class="hover:underline"
                           >
                              Flowbite
                           </a>
                        </li>
                        <li>
                           <a
                              href="https://tailwindcss.com/"
                              class="hover:underline"
                           >
                              Tailwind CSS
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                        Follow us
                     </h2>
                     <ul class="text-white dark:text-gray-400">
                        <li class="mb-4">
                           <a
                              href="https://github.com/themesberg/flowbite"
                              class="hover:underline "
                           >
                              Github
                           </a>
                        </li>
                        <li>
                           <a
                              href="https://discord.gg/4eeurUVvTy"
                              class="hover:underline"
                           >
                              Discord
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                        Legal
                     </h2>
                     <ul class="text-white dark:text-gray-400">
                        <li class="mb-4">
                           <a href="#" class="hover:underline">
                              Privacy Policy
                           </a>
                        </li>
                        <li>
                           <a href="#" class="hover:underline">
                              Terms &amp; Conditions
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"></hr>
            <div class="sm:flex sm:items-center sm:justify-between">
               <span class="text-sm text-white sm:text-center dark:text-gray-400">
                  © 2022{' '}
                  <a href="https://flowbite.com" class="hover:underline">
                     Flowbite™
                  </a>
                  . All Rights Reserved.
               </span>
            </div>
         </footer>
      </div>
   );
};

export default Footer;
