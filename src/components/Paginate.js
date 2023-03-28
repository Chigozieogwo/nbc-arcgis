import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Paginate = ({ pages, page, pageName }) => {
   const { pageNumber } = useParams() || 1;
   const [currentPage, setCurrentPage] = useState(1);
   // const onNext = () => {
   //    onPageChange(currentPage + 1);
   // };
   const navigate = useNavigate();
   function goToPreviousPage() {
      setCurrentPage((page) => page - 1);
   }
   return (
      pages > 1 && (
         <nav aria-label="Page navigation example">
            <ul class="inline-flex items-center -space-x-px">
               <li>
                  <Link
                     to={`/${pageName}/page/${page <= 1 ? 1 : page - 1}`}
                     class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                     <span class="sr-only">Previous</span>
                     <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                           clip-rule="evenodd"
                        ></path>
                     </svg>
                  </Link>
               </li>

               {[...Array(pages).keys()].slice(page, page + 6).map((x) => (
                  <li>
                     <Link key={x + 1} to={`/${pageName}/page/${x + 1}`}>
                        <a
                           // active={x + 1 === page}
                           class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                           {x + 1}
                        </a>
                     </Link>
                  </li>
               ))}
               <li>
                  <Link
                     to={`/${pageName}/page/${
                        pageNumber >= pages ? page : page + 1
                     }`}
                     class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                     <span class="sr-only">Next</span>
                     <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                           clip-rule="evenodd"
                        ></path>
                     </svg>
                  </Link>
               </li>
            </ul>
         </nav>
      )
   );
};

export default Paginate;
