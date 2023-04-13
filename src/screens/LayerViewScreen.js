/* This example requires Tailwind CSS v2.0+ */

import React, { useState,useRef, useEffect } from 'react';
import HeaderLog from '../components/HeaderLog';
import { Fragment } from 'react';
import file2 from "../images/file2.png"
import line from "../images/line.png"
import circle from "../images/circle.png"
import moon from "../images/moon.png"
import edit from "../images/editing.png"
import square from "../images/square.png"
import pentagon from "../images/pentagon.png"
import pin from "../images/pin.png"
import streetnav from "../images/streetnav.png"
import layer1 from "../images/layer1.png"
import layer2 from "../images/layer2.png"
import layer3 from "../images/layer3.png"
import layer4 from "../images/layer4.png"
import delete1 from "../images/delete.png"
import SidebarView from '../components/SidebarView';
import SidebarLeft from '../components/SidebarLeft';
import SidebarLayer from '../components/SidebarLayer';
// import delete1 from "../images/delete.png"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { logout, getUserDetails } from '../actions/userActions';
import { featureLayerDetailsAction ,updateFeatureLayerAction} from '../actions/featureLayerActions';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useLocation, useNavigate,useParams } from 'react-router-dom';
import moment from 'moment';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView.js';
import { loadModules } from 'esri-loader';
import { listFeatureLayerAction,featureLayerCreateAction } from '../actions/featureLayerActions';
import { documentCreateAction } from '../actions/documentActions';
import file from "../images/file2.png"
import document2 from "../images/file.png"
import  proj4 from 'proj4';


import { Tooltip} from 'react-tooltip';

import {
   USER_UPDATE_PROFILE_RESET,
   USER_UPDATE_PROFILE_ME_RESET
} from '../constants/userConstants';


const LayerViewScreen = ({ handleUpdateFeatureLayer}) => {

   const [showModalSubLayer , setShowModalSubLayer ] = useState(false)
   const [showModalDocument , setShowModalDocument ] = useState(false)
  const [basemap, setBasemap] = useState('streets')
  
   const [name , setName ] = useState('')
   const [description , setDescription ] = useState('')
   const [featureCategorization , setFeatureCategorization ] = useState('foundational')
   const [parentFeatureLayerId , setParentFeatureLayerId ] = useState('')
  const [geometry, setGeometry] = useState({})
  
   const [dataGeometry , setDataGeometry ] = useState({})


   const [view, setView] = useState(null);
   const [graphicsLayer, setGraphicsLayer] = useState(null);

   const mapRef = useRef(null);
  //  const [view, setView] = useState(null);
   const [featureLayerId, setFeatureLayerId] = useState();
   const [polygonGraphic, setPolygonGraphic] = useState(null);
   const [multiPolygonGraphic, setMultiPolygonGraphic] = useState(null);
   // const [graphicsLayer, setGraphicsLayer] = useState(null);
// const [drawnLayers, setDrawnLayers] = useState([]);
  
   const dispatch = useDispatch();
  const params = useParams();
  
  console.log(params.id + " params")
 
   const featureLayerDetails = useSelector(state => state.featureLayerDetails)
   const { loading : layerLoading, error : layerError, layer,success } = featureLayerDetails;
 
   
   const ListFeatureLayer = useSelector(state => state.ListFeatureLayer)
   const { loading : featureLayersLoading, error : featureLayersError, featureLayers } = ListFeatureLayer;

   const documentCreate = useSelector((state) => state.documentCreate);
   const {
      document,
      loading: loadingDocument,
      error: errorDocument
   } = documentCreate;
   
  
  
  const featureLayerUpdate = useSelector((state) => state.featureLayerUpdate);
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate
     
   } = featureLayerUpdate;
  
   // handleUpdateFeatureLayer
  
   const updateFeatureLayerHandler = () => {
   //  e.preventDefault();
    dispatch(
      updateFeatureLayerAction({
          id : layer.featureLayer._id,
          name : layer.featureLayer.name,
          featureCategorization : layer.featureLayer.featureCategorization,
          description : layer.featureLayer.description,
          parentFeatureLayerId : layer.featureLayer.parentFeatureLayerId ,
          geometry : dataGeometry ,
          
          
       })
    );
    console.log( layer.featureLayer._id + 'new revenueLineCode,')
    console.log( featureCategorization + 'featureCategorization,')
    console.log( description + 'description,')
    console.log(  parentFeatureLayerId + ' parentFeatureLayerId,')
    console.log(  geometry + ' geometry update,')
 };
   
   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(
        featureLayerCreateAction(
          name,
          featureCategorization,
          description,
          parentFeatureLayerId ,
          geometry
          // revenueLineFrequency
          )
          
       );
    
      
   };
  
   const handleFeatureLayer = (layerID) => {
   
    dispatch(featureLayerDetailsAction(params.id));
    setFeatureLayerId(layerID)
  };


  useEffect(() => {
    dispatch(listFeatureLayerAction());
     setParentFeatureLayerId(params.id)
    
        
    // setGeojsonData(layer?.geometryContent);
    setTimeout(() => {
     dispatch(featureLayerDetailsAction(params.id));
     
   }, 4000);
  }, []);

  const convertToGeoJSON = (rings) => {
   const coordinates = rings[0].map((point) => {
     return [point[0], point[1]];
   });
   return {
     type: 'polygon',
      coordinates: [coordinates],
      spatialReference: { wkid: 102100 }
   };
 };


  // FOr THe graphic draw
  // FOr THe graphic draw
  useEffect(() => {
    dispatch(featureLayerDetailsAction(params.id));
    loadModules([
       'esri/geometry/geometryEngine',
      "esri/widgets/Sketch",
      "esri/Map",
      "esri/layers/GraphicsLayer",
       "esri/views/MapView",
       'esri/geometry/support/webMercatorUtils'
    ]).then(([geometryEngine,Sketch, Map, GraphicsLayer,MapView,webMercatorUtils ]) => {
      const graphicsLayer = new GraphicsLayer();

      const map = new Map({
        basemap: basemap,
        layers: [graphicsLayer],
      });

      const view = new MapView({
        container: mapRef.current,
        map: map,
        zoom: 5,
        center: [7.5, 9.5],
      });

      view.when(() => {
        const sketch = new Sketch({
          layer: graphicsLayer,
          view: view,
          creationMode: "update",
        });

        map.add(graphicsLayer);
        setView(view);
        setGraphicsLayer(graphicsLayer);

        view.ui.add(sketch, "top-right");
        sketch.on('create', (event) => {
          if (event.state === 'complete') {
            const geometry = event.graphic.geometry.toJSON();
//              const transformFunction = proj4('EPSG:102100', 'EPSG:4326');
             
//              const webMercatorPoint = geometry.rings; // example coordinates in Web Mercator
// const wgs84Point = transformFunction.forward(webMercatorPoint); // converted coordinates in WGS 84
// console.log(wgs84Point + " Convert 1"); // output: [-111.1234567, 44.1234567]
// console.log(JSON.stringify(wgs84Point) + " Convert 12"); // output: [-111.1234567, 44.1234567]


             const geoJSON = convertToGeoJSON(geometry.rings);
             // Convert the point to spatial reference 4326
             const point4326 = webMercatorUtils.webMercatorToGeographic(geometry.rings);
              const point43262 = webMercatorUtils.project(point4326, { wkid: 4326 });

      console.log(point4326 + " converted 1");
      console.log(point43262 + " converted 133");
      console.log(JSON.stringify(point43262) + " converted 12");

            console.log(JSON.stringify(geometry) + "rings Geometry Data Coordinate");
            console.log(JSON.stringify(geoJSON) + " Geometry Data Coordinate");
            console.log(geometry + " Raw Geometry Data Coordinate");
            
            // Send the geometry to the backend
            setDataGeometry(geoJSON)
          }
        });
      //   const graphicsLayer = new GraphicsLayer();
        
        
      });
    });
  }, [basemap]);
  
   
   //   FOr THe graphic display
   //   FOr THe graphic display
   
  


  useEffect(() => {
    dispatch(featureLayerDetailsAction(params.id));
  }, [params.id]);

  


  

   const location = useLocation();
   const navigate = useNavigate();
  //  const mapRef = useRef();
  //  const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const userDetails = useSelector((state) => state.userDetails);
   const { loading, error, user } = userDetails;

   const handleClose = () => {
      setShowModalSubLayer(false); 
      setShowModalDocument(false); 
   };
   
   const showSubLayerHandler = () => { 
      
      setShowModalSubLayer(true); 
      // dispatch(listLocations());
   }
   const showDocumentHandler = () => { 
      
      setShowModalDocument(true); 
      // dispatch(listLocations());
   }

console.log(basemap + " basemap")

  


   return (
      <>

         <HeaderLog handleUpdateFeatureLayer ={updateFeatureLayerHandler} />
         <div className=" flex justify-between">







         <div class="bg-white">
                  {/* <label for="my-drawer-3" class="drawer-overlay"></label> */}
                  <ul class="hidden md:block  w-20 ">
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                     <SidebarLeft className=""></SidebarLeft>
                     
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                  </ul>

                 
               </div>
               
               <div className="w-full bg-slate-100 ">
               <div className="">
                  <div className="h-10 bg-gray-800 flex justify-center items-center ">
                  {/* <div className="block md:flex -space-x-0.5 items-center cursor-pointer">
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
                  </div> */}
               <p className="text-white text-center  flex items-center">{ layer?.featureLayer?.description}</p>
                  <p className="text-white"></p>
                  </div>
               </div>
               
               {showModalSubLayer ? (
                              <div
                              // onClick={handleClose}
                              tabindex="-1"
                              class="flex  justify-center  bg-[rgb(0,0,0,0.35)] align-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
                           >
                              <div class="relative  w-full max-w-md h-full md:h-auto">
                              <div>
                              
                                         </div>
                                 
                                 <div class="">
                                     
                                    <div class=" max-w-sm bg-white mt-28 ml-1 p-4 md:ml-1 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <div class="flex justify-end">
                                              <div></div>
                                          
                                          <button
                                             onClick={handleClose}
                                             type="button"
                                             class=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                             data-modal-toggle="popup-modal"
                                          >
                                             <svg
                                                class="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   fill-rule="evenodd"
                                                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                   clip-rule="evenodd"
                                                ></path>
                                             </svg>
                                          </button>
                                       </div> 
                                       {/* {message && (
                                          <Message variant="danger">
                                             {message}
                                          </Message>
                                       )} */}
                                       <form
                                         //  onSubmit={submitHandler}
                                          class="space-y-6 px-4 md:p-0"
                                       >
                                          

                                       <h5 class="text-xl text-center font-medium text-gray-900 dark:text-white">
                                             Create New SubLayer
                                           </h5>   
                                          
                                         
                 <div class="relative">
        <input onChange={(e) => setName(e.target.value)} type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"> Name</label>
                                 </div>  
                                 {/* <div class="relative">
        <input type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Feature Categorization</label>
                       </div>    */}
                       <div class="relative">
        <input onChange={(e) => setDescription(e.target.value)} type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Description</label>
    </div>
                    
                       <div>
                                         <label for="lga" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Feature Categorization</label>
<select onChange={(e) => setFeatureCategorization(e.target.value)} id="frequency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
<option selected>Select Option</option>
<option value="foundational">Foundational</option>
<option value="non-foundational">Non Foundational</option>


                                                    </select>
                                         </div>                   
                                        
              
                    
             
                                         
                                          

    <div className="flex justify-center items-center mt-4">
                                    <button
                                       onClick={submitHandler}
                                       className="px-14 py-2 bg-green-500 hover:bg-green-600 text-white text-md mb-8"> Create</button>

                    </div>
                                         

                                        
                                       </form>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           ) : null}

               {showModalDocument ? (
                              <div
                              // onClick={handleClose}
                              tabindex="-1"
                              class="flex  justify-center  bg-[rgb(0,0,0,0.35)] align-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
                           >
                              <div class="relative  w-full max-w-md h-full md:h-auto">
                              <div>
                              
                                         </div>
                                 
                                 <div class="">
                                     
                                    <div class=" max-w-sm bg-white mt-28 ml-1 p-4 md:ml-1 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <div class="flex justify-end">
                                              <div></div>
                                          
                                          <button
                                             onClick={handleClose}
                                             type="button"
                                             class=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                             data-modal-toggle="popup-modal"
                                          >
                                             <svg
                                                class="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   fill-rule="evenodd"
                                                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                   clip-rule="evenodd"
                                                ></path>
                                             </svg>
                                          </button>
                                       </div> 
                                       {/* {message && (
                                          <Message variant="danger">
                                             {message}
                                          </Message>
                                       )} */}
                                       <form
                                         //  onSubmit={submitHandler}
                                          class="space-y-6 px-4 md:p-0"
                                       >
                                          

                                       <h5 class="text-xl text-center font-medium text-gray-900 dark:text-white">
                                             Create New Document
                                           </h5>   
                                          
                                         
                 <div class="relative">
        <input type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"> Name</label>
                                 </div>  
                                 <div class="relative">
        <input type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Feature Categorization</label>
    </div>                             
                                        
                 <div class="relative">
        <input type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Description</label>
    </div>
                    
             
                                         
                                          

    <div className="flex justify-center items-center ">
                                    <button
                                       // onClick={submitHandler}
                                       className="px-14 py-2 bg-green-500 hover:bg-green-600 text-white text-md mb-8"> Create</button>

                    </div>
                                         

                                        
                                       </form>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           ) : null}

           {/* {layerLoading && <Loader />} */}
            <div ref={mapRef} style={{height:"530px6"}} className="min-h-screen relative" >
                  <div className='hidden md:block absolute bottom-0 left-0 right-0 h-18 '>
                     <div className='flex justify-between items-end flex-row space-x-0.5 text-white'>
                        <div className="p-2">
                           <div onClick={() => setBasemap('streets-navigation-vector')} className='bg-opacity-50 bg-white group  rounded-md px-3 my-1  mb-5 cursor-pointer'>
                              <img className='hidden group-hover:block w-full h-28 py-2 ' src={streetnav} alt='map-image'></img>
                              <p className='text-sm text-black font-semibold  py-2 w-44 text-center'> streets-navigation-vector </p></div>
                        </div>
                        <div className="p-2">
                           <div onClick={() => setBasemap('oceans')} className='bg-opacity-50 bg-white group  rounded-md px-3 my-1  mb-5 cursor-pointer'>
                              <img className='hidden group-hover:block w-full h-28 py-2 ' src={layer4} alt='map-image'></img>
                              <p className='text-sm text-black font-semibold  py-2 w-44 text-center'> Oceans </p></div>
                        </div>
                        <div className="p-2">
                           <div onClick={() => setBasemap('hybrid')} className='bg-opacity-50 bg-white group  rounded-md px-3 my-1  mb-5 cursor-pointer'>
                              <img className='hidden group-hover:block w-full h-28 py-2 ' src={layer1} alt='map-image'></img>
                              <p className='text-sm text-black font-semibold  py-2 w-44 text-center'> Satelite </p></div>
                        </div>
                        <div className="p-2">
                           <div onClick={() => setBasemap('streets-night-vector')} className='bg-opacity-50 bg-white group  rounded-md px-3 my-1  mb-5 cursor-pointer'>
                              <img className='hidden group-hover:block w-full h-28 py-2 ' src={layer3} alt='map-image'></img>
                              <p className='text-sm text-black font-semibold  py-2 w-44 text-center'> streets-night-vector </p></div>
                        </div>
                        <div className="p-2">
                           <div onClick={() => setBasemap('national-geographic')} className='bg-opacity-50 bg-white group  rounded-md px-3 my-1  mb-5 cursor-pointer'>
                              <img className='hidden group-hover:block w-full h-28 py-2 ' src={layer2} alt='map-image'></img>
                              <p className='text-sm text-black font-semibold  py-2 w-44 text-center'> national-geographic </p></div>
                        </div>
                      
                       
                       
                     </div>

                  </div>
                  
                  </div> 
           
              
                   {/* <div className=" ficon min-h-screen flex justify-center items-center cursor-pointer  ">
                     <div className="bg-white rounded-md group px-8 py-3 group-hover:bg-green-500">
                        <div className="flex justify-center items-center mb-4">
                           <img alt="" className="w-10" src={file2}></img> 
                           
                        </div>
                           <h4 className="text-xl font-bold  text-gray-500">Create New Document</h4>
                     </div>
                   </div> */}
                   
                  
                   
                                     </div>
         <div class=" mt-1 bg-blue-200 hidden md:block">
                  {/* <label for="my-drawer-3" class="drawer-overlay"></label> */}
                  <ul class="w-60 ">
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
             <SidebarView
               handleID={params.id}
               handleDocumentModal={showDocumentHandler}
               handleSubLayerModal={showSubLayerHandler}></SidebarView>
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                  </ul>
                 
               </div>

               
           
               {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
               
               

               {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          
         </div>
      </>
   );
};

export default LayerViewScreen;
