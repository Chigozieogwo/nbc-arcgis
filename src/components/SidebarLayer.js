import React, { useState,useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { listFeatureLayerAction } from '../actions/featureLayerActions';
import file from "../images/file2.png"
import document2 from "../images/file.png"
const Sidebar = () => {
   const dispatch = useDispatch();



   const ListFeatureLayer = useSelector(state => state.ListFeatureLayer)
   const { loading : featureLayersLoading, error : featureLayersError, featureLayers } = ListFeatureLayer;

   console.log(featureLayers + "FEATURE LAYER ")
   console.log(JSON.stringify(featureLayers)  + "LAYER FOUND 22")


   useEffect(() => {
    dispatch(listFeatureLayerAction());
    // setGeojsonData(layer?.geometryContent);
   
  }, []);

   return (
      <div>
         {' '}
         <aside class="w-60 min-h-screen bg-slate-100 border border-l-green-500 border-1 px-3" aria-label="Sidebar">
           
                <div className="flex space-x-4 bg-green-500 px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={file}></img>
                  <div className="flex justify-center items-center">

                  <p className="text-center text-sm font-medium mx-2 text-white ">New Layer</p>
                  </div>
                </div>
                <p className="text-left text-xs mt-4 mb-2 font-medium mx-2 text-gray-500 ">Select Layer</p>

                <div className="space-y-4 bg-white rounded-sm px-3 py-2 mt-4">
                <div class="flex items-center mt-3">
    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
    <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Layers <a href="#" class="text-teal-600 dark:text-teal-500 hover:underline"></a></label>
</div>
                
{
    featureLayers?.map((layer, index) =>
    <div class="flex items-center ml-4">
    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
    <label for="link-checkbox" class="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">{layer?.description} <a href="#" class="text-teal-600 dark:text-teal-500 hover:underline"></a></label>
</div>
  )
}


                </div>
         </aside>
      </div>
   );
};

export default Sidebar;
