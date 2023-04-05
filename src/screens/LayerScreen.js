/* This example requires Tailwind CSS v2.0+ */
import React, { useState,useRef, useEffect } from 'react';
import HeaderLog from '../components/HeaderLog';
import { Fragment } from 'react';
import file2 from "../images/file2.png"
import SidebarLayer from '../components/SidebarLayer';
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
import { featureLayerDetailsAction } from '../actions/featureLayerActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView.js';
import { loadModules } from 'esri-loader';
import { listFeatureLayerAction } from '../actions/featureLayerActions';
import file from "../images/file2.png"
import document2 from "../images/file.png"



const LayerScreen = ({ match }) => {
   const mapRef = useRef(null);
   const [view, setView] = useState(null);
   // const [featureLayerData, setFeatureLayerData] = useState(null);
   const mapViewRef = useRef();
   const [geojsonData, setGeojsonData] = useState(null);

   // const [map, setMap] = useState(null);
   // const [featureLayer, setFeatureLayer] = useState(null);


   const dispatch = useDispatch();



   const ListFeatureLayer = useSelector(state => state.ListFeatureLayer)
   const { loading : featureLayersLoading, error : featureLayersError, featureLayers } = ListFeatureLayer;

   console.log(featureLayers + "FEATURE LAYER ")
   console.log(JSON.stringify(featureLayers)  + "LAYER FOUND 22")


  


   const location = useLocation();
   const navigate = useNavigate();

   // const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const userDetails = useSelector((state) => state.userDetails);
   const { loading, error, user } = userDetails;
   
   const featureLayerDetails = useSelector(state => state.featureLayerDetails)
   const { loading : layerLoading, error : layerError, layer } = featureLayerDetails;


   // const ListFeatureLayer = useSelector(state => state.ListFeatureLayer)
   // const { loading : featureLayersLoading, error : featureLayersError, featureLayers } = ListFeatureLayer;

   console.log(featureLayers + "FEATURE LAYER ")
   console.log(JSON.stringify(featureLayers)  + "LAYER FOUND 22")

   useEffect(() => {
      dispatch(listFeatureLayerAction());
      // setGeojsonData(layer?.geometryContent);
     
    }, []);

   useEffect(() => {
      dispatch(featureLayerDetailsAction());
      // lazy load the required ArcGIS API modules
      loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/layers/GraphicsLayer'
      ]).then(([Map, MapView, Graphic, GraphicsLayer]) => {
        // create a new Map instance
        const map = new Map({
          basemap: 'hybrid'
        });




        // create a new MapView instance and reference it with the mapRef DOM node
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [7.5, 9.5],
          zoom: 5
        });
  
        // create a new GraphicsLayer instance and add it to the map
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
  
        // create a new Graphic instance and add it to the GraphicsLayer
        const geometryContent = layer?.geometryContent;
        const polygon = {
          type: 'polygon',
          rings: layer?.geometryContent.coordinates[0][0],
          spatialReference: { wkid: 4326 }
        };
        const graphic = new Graphic({
          geometry: polygon,
          symbol: {
            type: 'simple-fill',
            color: [0, 25, 0, 0.5],
            style: 'solid',
            outline: {
              color: [0, 25, 0, 1],
              width: 5
            }
          }
        });
        graphicsLayer.add(graphic);
         // Create a graphic using the GeoJSON data
         const graphic2 = new Graphic({
          geometry: {
            type: 'multipolygon',
            coordinates: geojsonData.coordinates,
          },
          symbol: {
            type: 'simple-fill',
            color: 'rgba(255, 0, 0, 0.2)',
            outline: {
              color: 'red',
              width: 2,
            },
          },
        });
  
        // update the state variable with the MapView instance
        setView(view);
      });
    }, []);

    useEffect(() => {
      dispatch(featureLayerDetailsAction());
      setGeojsonData(layer?.geometryContent);
     
    }, [layer,featureLayers]);
  
  
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
              
               <div className="">
                  <div className="h-10 bg-gray-800 flex justify-between ">
                  <div className="block md:flex -space-x-0.5 items-center cursor-pointer">
                     <div className="h-10 w-10 group relative border flex justify-center items-center border-2 bg-white border-gray-500 ">
                        <img className="w-5 " src={line}></img>
                        <span className="group-hover:visible absolute -right-12 md:right-0 md:-bottom-6 rounded-md shadow-md text-white bg-gray-900  text-xs font-bold transition-all duration-100 px-1 py-0.5 text-center min-w-max invisible">
                line
            </span>
                     </div>
                     <div className="h-10 w-10 group relative border flex justify-center items-center border-2 bg-white border-gray-500 ">
                        <img className="w-5 " src={pentagon}></img>
                        <span className="group-hover:visible absolute -right-12 md:right-0 md:-bottom-6 rounded-md shadow-md text-white bg-gray-900  text-xs font-bold transition-all duration-100 px-1 py-0.5 text-center min-w-max invisible">
                pentagon
            </span>
                     </div>
                     <div className="group relative  h-10 w-10 border flex justify-center items-center border-2 bg-white border-gray-500 ">
                        <img data-tip="circle" data-for="tooltip-button"  alt="" className="w-5 " src={square}></img>
                        <span className="group-hover:visible absolute -right-12 md:right-0 md:-bottom-6 rounded-md shadow-md text-white bg-gray-900  text-xs font-bold transition-all duration-100 px-1 py-0.5 text-center min-w-max invisible">
                square
            </span>
                     </div>
                    
                     <div className="group relative h-10 w-10 border flex justify-center items-center border-2 bg-white border-gray-500 ">
                        <img  alt="" className="w-5 " src={circle}></img>
                        <span className="group-hover:visible absolute -right-12 md:right-0 md:-bottom-6 rounded-md shadow-md text-white bg-gray-900  text-xs font-bold transition-all duration-100 px-1 py-0.5 text-center min-w-max invisible">
                circle
            </span>
                     </div>
                     <div className="group relative h-10 w-10 border flex justify-center items-center border-2 bg-white border-gray-500 ">
                        <img  alt="" className="w-5 " src={pin}></img>
                        <span className="group-hover:visible absolute -right-12 md:right-0 md:-bottom-6 rounded-md shadow-md text-white bg-gray-900  text-xs font-bold transition-all duration-100 px-1 py-0.5 text-center min-w-max invisible">
                pin
            </span>
                     </div>
                     <div className="h-10 w-10 group relative border flex justify-center items-center border-2 bg-white border-gray-500 ">
                        <img  alt="" className="w-5 " src={moon}></img>
                        <span className="group-hover:visible absolute -right-12 md:right-0 md:-bottom-6 rounded-md shadow-md text-white bg-gray-900  text-xs font-bold transition-all duration-100 px-1 py-0.5 text-center min-w-max invisible">
                point
            </span>
                     </div>
                     <div className="h-10 w-10 group relative border flex justify-center items-center border-2 bg-white border-gray-500 ">
                        <img  alt="" className="w-5 " src={edit}></img>
                        <span className="group-hover:visible absolute -right-12 md:right-0 md:-bottom-6 rounded-md shadow-md text-white bg-gray-900  text-xs font-bold transition-all duration-100 px-1 py-0.5 text-center min-w-max invisible">
                edit
            </span>
                     </div>
                     <div className="h-10 w-10 group relative border flex justify-center items-center border-2 bg-white border-gray-500 ">
                        <img  alt="" className="w-5 " src={delete1}></img>
                        <span className="group-hover:visible absolute -right-12 md:right-0 md:-bottom-6 rounded-md shadow-md text-white bg-gray-900  text-xs font-bold transition-all duration-100 px-1 py-0.5 text-center min-w-max invisible">
                delete
            </span>
                     </div>
                  </div>
                  <p className="text-white text-center ml-0 md:-ml-72 flex items-center">National Sokoto Boundaries/Overview</p>
                  <p className="text-white"></p>
                  </div>
                  </div>


                   {/* <div ref={mapRef} className="  min-h-screen  cursor-pointer  ">
                     
                   </div> */}
                   <div ref={mapRef}  className=" min-h-screen   ">
                     
                   </div>
                   
                
                   
                                     </div>
         <div class=" mt-1 bg-blue-200 hidden md:block">
                  {/* <label for="my-drawer-3" class="drawer-overlay"></label> */}
                  <ul class="w-60 ">
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
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
    <input onclick={()=> dispatch(featureLayerDetailsAction(layer?._id)) } id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
    <label onclick={()=> dispatch(featureLayerDetailsAction(layer?._id)) }  for="link-checkbox" class="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">{layer?.description} <a href="#" class="text-teal-600 dark:text-teal-500 hover:underline"></a></label>
</div>
  )
}


                </div>
         </aside>
      </div>
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
