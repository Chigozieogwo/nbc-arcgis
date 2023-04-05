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


const LayerScreen = ({ match }) => {
   const mapRef = useRef(null);
   const [view, setView] = useState(null);
   // const [featureLayerData, setFeatureLayerData] = useState(null);
   const mapViewRef = useRef();
   const [geojsonData, setGeojsonData] = useState(null);

   // const [map, setMap] = useState(null);
   // const [featureLayer, setFeatureLayer] = useState(null);

   const location = useLocation();
   const navigate = useNavigate();

   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const userDetails = useSelector((state) => state.userDetails);
   const { loading, error, user } = userDetails;
   
   const featureLayerDetails = useSelector(state => state.featureLayerDetails)
   const { loading : layerLoading, error : layerError, layer } = featureLayerDetails;

   // console.log(featureLayerData + "LAYER FOUND 22")
   console.log(JSON.stringify(layer?.geometryContent?.coordinates)  + "LAYER FOUND 22")

  

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
          basemap: 'streets-navigation-vector'
        });
  
        // create a new MapView instance and reference it with the mapRef DOM node
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [7.497, 4.837],
          zoom: 12
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
     
    }, []);
  
  
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
                     <SidebarLayer></SidebarLayer>
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
