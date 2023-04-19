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
import Sidebar from '../components/Sidebar';
import SidebarLeft from '../components/SidebarLeft';
import SidebarLayer from '../components/SidebarLayer';
// import delete1 from "../images/delete.png"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { logout, getUserDetails } from '../actions/userActions';
import { featureLayerDetailsAction ,updateFeatureLayerAction} from '../actions/featureLayerActions';
// import { documentCreateAction} from '../actions/documentActions';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useLocation, useNavigate,useParams } from 'react-router-dom';
import moment from 'moment';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView.js';
import { loadModules } from 'esri-loader';
import { listFeatureLayerAction,featureLayerCreateAction } from '../actions/featureLayerActions';
import { documentDetailsAction } from '../actions/documentActions';
import { documentCreateAction } from '../actions/documentActions';
import file from "../images/file2.png"
import document2 from "../images/file.png"
import { DOCUMENT_CREATE_SUCCESS,DOCUMENT_CREATE_FAIL,DOCUMENT_CREATE_RESET } from '../constants/documentConstants';


import { Tooltip} from 'react-tooltip';

import {
   USER_UPDATE_PROFILE_RESET,
   USER_UPDATE_PROFILE_ME_RESET
} from '../constants/userConstants';
let url = process.env.REACT_APP_BASE_URL;

const LayerDocScreen = ({ handleUpdateFeatureLayer}) => {

   const [showModalSubLayer , setShowModalSubLayer ] = useState(false)
   const [showModalCreate , setShowModalCreate ] = useState(false)
   const [showModalDocument , setShowModalDocument ] = useState(false)
  const [basemap, setBasemap] = useState('streets')
  
   const [name , setName ] = useState('')
   const [description , setDescription ] = useState('')
   const [featureCategorization , setFeatureCategorization ] = useState('foundational')
   const [parentFeatureLayerId, setParentFeatureLayerId] = useState('')
   
   const [title , setTitle ] = useState('')
   const [descriptionDoc , setDescriptionDoc ] = useState('')
   const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

   const [spartialReference , setSpartialReference ] = useState('polygon')
  const [geometry, setGeometry] = useState({})
  
   const [dataGeometry , setDataGeometry ] = useState({})


   const [view, setView] = useState(null);
   const [graphicsLayer, setGraphicsLayer] = useState(null);

   const mapRef = useRef(null);
  //  const [view, setView] = useState(null);
   const [featureLayerId, setFeatureLayerId] = useState();
   const [polygonGraphic, setPolygonGraphic] = useState(null);
   const [multiPolygonGraphic, setMultiPolygonGraphic] = useState(null);
 
// const [drawnLayers, setDrawnLayers] = useState([]);
  
   const dispatch = useDispatch();
  const params = useParams();
  
  console.log(params.id + " params")
  console.log(params.fileID + " params File id")
 
   const featureLayerDetails = useSelector(state => state.featureLayerDetails)
   const { loading : layerLoading, error : layerError, layer,success } = featureLayerDetails;
 

   
   const ListFeatureLayer = useSelector(state => state.ListFeatureLayer)
   const { loading : featureLayersLoading, error : featureLayersError, featureLayers } = ListFeatureLayer;

   const  documentDetails = useSelector((state) => state. documentDetails);
   const {
      document : documentSingle,
      loading: loadingDocumentSingle,
      error: errorDocumentSingle
   } = documentDetails;
   
   console.log(documentSingle + " <<<<<<<<<>>>>>>>>>>>>>>")


   const documentCreate = useSelector((state) => state.documentCreate);
   const {
      document,
      loading: loadingDocument,
      error: errorDocument
  } = documentCreate;
  

  const openInNewTab = url => {
   window.open(url, '_blank', 'noopener,noreferrer');
 };
    
  const featureLayerUpdate = useSelector((state) => state.featureLayerUpdate);
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate
     
   } = featureLayerUpdate;
  
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;


   const featureLayerCreate = useSelector((state) => state.featureLayerCreate);
   const {
      featureLayer,
      success:successFeature,
      loading: loadingFeature,
      error: errorFeature
  } = featureLayerCreate;


  
   const convertToGeoJSON = (rings) => {
    const coordinates = rings[0].map((point) => {
      return [point[0], point[1]];
    });
    return {
      type: 'polygon',
      coordinates: [coordinates],
    };
  };

  const navigateCreate = () => {
    navigate(`/featureLayers/r/${featureLayer._id}/view`)
  }
  
   const updateFeatureLayerHandler = (e) => {
    e.preventDefault();
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

   
 const handleChange = (e) => {
   if (e.target.name === 'title') setTitle(e.target.value);
   else if (e.target.name === 'description') setDescription(e.target.value);
   else setFile(e.target.files[0]);
 };

   
   const submitDocumentHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("featureLayerId", featureLayerId);

    axios.post(`${url}/documents/`, formData, {
      headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${userInfo.accessToken}`,
      },
      onUploadProgress: (progressEvent) => {
        setProgress(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
      },
    })
      .then((response) => {
        dispatch({ type: "DOCUMENT_CREATE_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "DOCUMENT_CREATE_FAIL", payload: error });
      });
      dispatch({ type: "DOCUMENT_CREATE_RESET", payload: {} });
      setShowModalDocument(false)
      // console.log(response.data);
      console.log(progress + " <<<<<<<<<<<<<<<<<<< progress >>>>>>>>>>>>>>");
      // try {
      //   const response =  axios.post(`${url}/documents/`, formData, {
      //     onUploadProgress: (progressEvent) => {
      //       const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //       setProgress(progress);
      //     },
      //   });
      //   console.log(response.data);
      // } catch (error) {
      //   console.error(error);
      // }
      
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
       setShowModalSubLayer(false)
    setShowModalCreate(true)
      //  setTimeout(() => {
      //   //  dispatch(featureLayerDetailsAction(params.id));
      //    if (successFeature) {
      //     navigate(`/featureLayers/r/${featureLayer._id}/view`)
      //    }
      //  }, 1000);
   };
  
   const handleFeatureLayer = (layerID) => {
   
    dispatch(featureLayerDetailsAction(params.id));
    setFeatureLayerId(layerID)
  };


  useEffect(() => {
    dispatch(listFeatureLayerAction());
    dispatch(documentDetailsAction(params.fileID));
    setParentFeatureLayerId(params.id)
    setFeatureLayerId(params.id)
    // setGeojsonData(layer?.geometryContent);
    if (successFeature) {
      navigate(`/featureLayers/r/${featureLayer._id}/view`)
   }
   
  }, [featureLayer,progress,params.fileID]);


  const [polygonLayer, setPolygonLayer] = useState(null);
  const viewDivRef = useRef(null);

  // useEffect(() => {
  //   // Create a new map
  //   const map = new Map({
  //     basemap: 'topo-vector'
  //   });
  //   setMap(map);

  //   // Create a new view
  //   const view = new MapView({
  //     container: viewDivRef.current,
  //     map: map,
  //     center: [7.5, 9.5],
  //     zoom: 9
  //   });
  //   setView(view);

  //   // Create a new graphics layer
  //   const polygonLayer = new GraphicsLayer({
  //     hitTestEnabled: true
  //   });
  //   setPolygonLayer(polygonLayer);

  //   // Add the graphics layer to the map
  //   map.add(polygonLayer);

  //   return () => {
  //     // Clean up resources
  //     view.destroy();
  //     map.destroy();
  //   };
  // }, []);


  




  // FOr THe graphic draw
  // FOr THe graphic draw
  // useEffect(() => {
  //   dispatch(featureLayerDetailsAction(params.id));
  //   loadModules([
  //     "esri/widgets/Sketch",
  //     "esri/Map",
  //     "esri/layers/GraphicsLayer",
  //     "esri/views/MapView",
     
  //   ]).then(([Sketch, Map, GraphicsLayer,MapView]) => {
  //     const graphicsLayer = new GraphicsLayer();

  //     const map = new Map({
  //       basemap: basemap,
  //       layers: [graphicsLayer],
  //     });

  //     const view = new MapView({
  //       container: mapRef.current,
  //       map: map,
  //       zoom: 5,
  //       center: [7.5, 9.5],
  //     });

  //     view.when(() => {
  //       const sketch = new Sketch({
  //         layer: graphicsLayer,
  //         view: view,
  //         creationMode: "update",
  //       });

  //       view.ui.add(sketch, "top-right");
  //       sketch.on('create', (event) => {
  //         if (event.state === 'complete') {
  //           const geometry = event.graphic.geometry.toJSON();

  //           const geoJSON = convertToGeoJSON(geometry.rings);

  //           console.log(JSON.stringify(geometry.rings) + "rings Geometry Data Coordinate");
  //           console.log(JSON.stringify(geoJSON) + " Geometry Data Coordinate");
  //           console.log(geoJSON + " Raw Geometry Data Coordinate");
            
  //           // Send the geometry to the backend
  //           setDataGeometry(geoJSON)
  //         }
  //       });
      
        
  //     });
  //   });
  // }, [basemap]);
  
   
     // FOr THe graphic display
     // FOr THe graphic display
//   useEffect(() => {
//     dispatch(featureLayerDetailsAction(params.id));
//     loadModules([
//       'esri/Map',
//       'esri/views/MapView',
//       'esri/Graphic',
//       'esri/layers/GraphicsLayer',
//       "esri/geometry/Polygon",
//     ]).then(([Map, MapView, Graphic, GraphicsLayer,Polygon]) => {
      

//       const map = new Map({
//         basemap: basemap
//       });

//       const view = new MapView({
//         container: mapRef.current,
//         map: map,
//         center: [7.5, 9.5],
//         zoom: 5
//       });

//       const polygonJson = geometryContent?.coordinates[0];

//       const polygon = new Polygon({
//         rings: polygonJson.coordinates,
//         spatialReference: { wkid: 102100 }
//     });

//     const graphic = new Graphic({
//         geometry: polygon,
//         symbol: {
//             type: "simple-fill",
//             color: [23, 114, 183, 0.8],
//             outline: {
//                 color: [23, 114, 183],
//                 width: 1
//             }
//         }
//     });




//       const geometryContent = layer?.geometryContent;
// console.log(geometryContent?.coordinates[0] + " Typical coordinate in system")
//       // create a polygon graphic
//       const polygon2 = {
//         type: 'polygon',
//         rings: geometryContent?.coordinates[0],
//         spatialReference: { wkid: 4326 }
//       };

      
//       const polygonGraphic = new Graphic({
//         geometry: polygon,
//         symbol: {
//           type: 'simple-fill',
//           color: [0, 25, 0, 0.5],
//           style: 'solid',
//           outline: {
//             color: [0, 25, 0, 1],
//             width: 5
//           }
//         }
//       });
//       const polygonGraphicsLayer = new GraphicsLayer();
//       polygonGraphicsLayer.add(polygonGraphic);
//       map.add(polygonGraphicsLayer);

//       // create a multipolygon graphic
//       const multiPolygon = {
//         type: 'multipolygon',
//         coordinates: geometryContent.coordinates,
//       };
//       const multiPolygonGraphic = new Graphic({
//         geometry: polygon,
//         symbol: {
//           type: 'simple-fill',
//           color: 'rgba(255, 0, 0, 0.2)',
//           outline: {
//             color: 'red',
//             width: 2,
//           },
//         },
//       });
//       const multiPolygonGraphicsLayer = new GraphicsLayer();
//       multiPolygonGraphicsLayer.add(graphic);
//       map.add(graphic);


//       view.graphics.add(graphic);

//       setView(view);
//       setPolygonGraphic(polygonGraphic);
//       setMultiPolygonGraphic(multiPolygonGraphic);
//     });
//   }, [basemap,featureLayerId]);

  // useEffect(() => {
  //   dispatch(featureLayerDetailsAction(params.id));
  //   loadModules([
  //     'esri/Map',
  //     'esri/views/MapView',
  //     'esri/Graphic',
  //     'esri/geometry/Polygon'
  //   ]).then(([Map, MapView, Graphic, Polygon]) => {

  //     const polygonJson = layer?.geometryContent
  //     console.log(polygonJson + " Poly gon json")
  //     console.log(polygonJson + " Poly gon json")
  //     console.log(JSON.stringify(polygonJson) + " Poly gon json")
  //     const polygon = new Polygon({
  //       rings: polygonJson?.coordinates,
  //       spatialReference: {  wkid: 4326 }
  //     });

  //     const graphic = new Graphic({
  //       geometry: polygon,
  //       symbol: {
  //         type: "simple-fill",
  //         // color: [0, 25, 0, 0.8],
  //         outline: {
  //           color: [23, 114, 183],
  //           width: 5
  //         }
  //       }
  //     });
  //     const graphic2 = new Graphic({
  //       geometry: polygon,
  //       symbol: {
  //         type: "simple-fill",
  //         // color: [0, 25, 0, 0.8],
  //         outline: {
  //           color: 'red',
  //           width: 2
  //         }
  //       }
  //     });

  //     const map = new Map({
  //       basemap: basemap
  //     });

  //     const view = new MapView({
  //       container: mapRef.current,
  //       map: map,
  //       center: [7.5, 9.5],
  //       zoom: 5
  //     });

  //     view.graphics.add(graphic);
  //     view.graphics.add(graphic2);
  //   });
  // }, [basemap,view]);

//   useEffect(() => {
//     dispatch(featureLayerDetailsAction(params.id));
//     loadModules([
//       'esri/Map',
//       'esri/views/MapView',
//       'esri/Graphic',
//       'esri/layers/GraphicsLayer',
     
//     ]).then(([Map, MapView, Graphic, GraphicsLayer, geometryEngine]) => {
      

//       const map = new Map({
//         basemap: basemap
//       });

//       const view = new MapView({
//         container: mapRef.current,
//         map: map,
//         center: [7.5, 9.5],
//         zoom: 5
//       });

//       const geometryContent = layer?.geometryContent;
// console.log(geometryContent?.coordinates[0] + " Typical coordinate in system")
//       // create a polygon graphic
//       const polygon = {
//         type: 'polygon',
//         rings: geometryContent?.coordinates[0],
//         spatialReference: { wkid: 4326 }
//       };

      
//       const polygonGraphic = new Graphic({
//         geometry: polygon,
//         symbol: {
//           type: 'simple-fill',
//           color: [0, 25, 0, 0.5],
//           style: 'solid',
//           outline: {
//             color: [0, 25, 0, 1],
//             width: 5
//           }
//         }
//       });
//       const polygonGraphicsLayer = new GraphicsLayer();
//       polygonGraphicsLayer.add(polygonGraphic);
//       map.add(polygonGraphicsLayer);

//       // create a multipolygon graphic
//       const multiPolygon = {
//         type: 'multipolygon',
//         coordinates: geometryContent.coordinates,
//       };
//       const multiPolygonGraphic = new Graphic({
//         geometry: polygon,
//         symbol: {
//           type: 'simple-fill',
//           color: 'rgba(255, 0, 0, 0.2)',
//           outline: {
//             color: 'red',
//             width: 2,
//           },
//         },
//       });
//       const multiPolygonGraphicsLayer = new GraphicsLayer();
//       multiPolygonGraphicsLayer.add(multiPolygonGraphic);
//       map.add(multiPolygonGraphicsLayer);

//       setView(view);
//       setPolygonGraphic(polygonGraphic);
//       setMultiPolygonGraphic(multiPolygonGraphic);
//     });
//   }, [basemap,featureLayerId]);


  

  //  useEffect(() => {
  //   dispatch(featureLayerDetailsAction(params.id));
  //   loadModules([
  //     'esri/Map',
  //     'esri/views/MapView',
  //     'esri/Graphic',
  //     "esri/widgets/Sketch",
  //     'esri/layers/GraphicsLayer'
  //   ]).then(([Map, MapView, Graphic, GraphicsLayer,Sketch]) => {
  //     const map = new Map({
  //       basemap: basemap
  //     });

  //     const view = new MapView({
  //       container: mapRef.current,
  //       map: map,
  //       center: [7.5, 9.5],
  //       zoom: 5
  //     });

  //     const geometryContent = layer?.geometryContent;

  //     console.log(layer?.featureLayer._id + "  Details ID FEATURE LAYER ")
  // console.log(featureLayerId + " List ID FEATURE LAYER ")

      
  //     console.log(layer?.featureLayer.name  + " Name Of Layer to render ")

  //     // create a polygon graphic
  //     const polygon = {
  //       type: 'polygon',
  //       rings: geometryContent.coordinates[0][0],
  //       spatialReference: { wkid: 4326 }
  //     };
      
  //     const polygonGraphic = new Graphic({
  //       geometry: polygon,
  //       symbol: {
  //         type: 'simple-fill',
  //         color: [0, 25, 0, 0],
  //         style: 'solid',
  //         outline: {
  //           color: [0, 25, 0, 1],
  //           width: 5
  //         }
  //       }
  //     });
  //     const polygonGraphicsLayer = new GraphicsLayer();
  //     polygonGraphicsLayer.add(polygonGraphic);
  //     map.add(polygonGraphicsLayer);

  //     // create a multipolygon graphic
  //     const multiPolygon = {
  //       type: 'multipolygon',
  //       coordinates: geometryContent.coordinates,
  //     };
  //     const multiPolygonGraphic = new Graphic({
  //       geometry: polygon,
  //       symbol: {
  //         type: 'simple-fill',
  //         color: 'rgba(255, 0, 0, 0)',
  //         outline: {
  //           color: 'red',
  //           width: 2,
  //         },
  //       },
  //     });
  //     const multiPolygonGraphicsLayer = new GraphicsLayer();
  //     multiPolygonGraphicsLayer.add(multiPolygonGraphic);
  //     map.add(multiPolygonGraphicsLayer);

  //      //     map.add(graphicsLayer);
  //     //     setView(view);
  //         // setGraphicsLayer(polygonGraphicsLayer);

  //     // if (view && graphicsLayer) {
  //     //   const sketch = new Sketch({
  //     //     view: view,
  //     //     layer: graphicsLayer,
  //     //     creationMode: 'update'
  //     //   });
  //     //   view.ui.add(sketch, 'top-right');
  //     //   sketch.on('create', (event) => {
  //     //     if (event.state === 'complete') {
  //     //       const geometry = event.graphic.geometry.toJSON();
  //     //       console.log(geometry);
  //     //       // Send the geometry to the backend
  //     //     }
  //     //   });
  //     // }


  //     setView(view);
  //     setPolygonGraphic(polygonGraphic);
  //     setMultiPolygonGraphic(multiPolygonGraphic);

  //     // const graphicsLayer = new GraphicsLayer();
     
  //   });
 
  //  }, [view, basemap]);

  useEffect(() => {
     dispatch(featureLayerDetailsAction(params.id));
     
    // setSpartialReference(layer?.geometryContent.type)
  }, [params.id,featureLayerId]);

  


  

   const location = useLocation();
   const navigate = useNavigate();
  //  const mapRef = useRef();
  //  const dispatch = useDispatch();

   // const userLogin = useSelector((state) => state.userLogin);
   // const { userInfo } = userLogin;

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

//   useEffect(() => {
//     dispatch(featureLayerDetailsAction(params.id));
//   loadModules([
//     "esri/Map",
//     "esri/views/MapView",
//     "esri/Graphic",
//     "esri/geometry/Polygon",
//     "esri/layers/GraphicsLayer"
//   ]).then(([Map, MapView, Graphic, Polygon, GraphicsLayer]) => {

//     const polygonJson = layer?.geometryContent;

//     if (polygonJson) {
      
//       setSpartialReference(layer?.geometryContent.type)
//     }

//     let polygon;
//     // console.log(layer?.geometryContent + " wkid")
//     if (spartialReference === "polygon") {
     
//       polygon = new Polygon({
//         rings: polygonJson?.coordinates,
//         spatialReference: { wkid: 102100 }
//       });
//     } else if (spartialReference === "MultiPolygon") {
//       polygon = new Polygon({
//         rings: polygonJson?.coordinates[0],
//         spatialReference: { wkid: 4326 }
//       });
      
// }
    
//     const graphic = new Graphic({
//       geometry: polygon,
//       symbol: {
//         type: "simple-fill",
//         // color: [23, 114, 183, 0.8],
//         outline: {
//           color: [23, 114, 183],
//           width: 2
//         }
//       }
//     });

//     const polygonLayer = new GraphicsLayer({
//       hitTestEnabled: true
//     });

//     polygonLayer.add(graphic);

//     const map = new Map({
//       basemap: basemap,
//       layers: [polygonLayer]
//     });

//     const view = new MapView({
//       container: mapRef.current,
//       map: map,
//       center: [7.5, 9.5],
//       zoom: 5
//     });

//     view.on("pointer-down", (event) => {
//       // only include graphics from polygonLayer in the hitTest
//       const opts = {
//         include: polygonLayer
//       };
//       view.hitTest(event, opts).then((response) => {
//         if (response.results && response.results.length > 0) {
//           console.log(`layer got clicked `, response);
//           alert(`hello, got clicked`);
//         }
//       });
//     });
//   });
// }, [basemap]);

const [spatialReference, setSpatialReference] = useState(null);
   useEffect(() => {
   dispatch(featureLayerDetailsAction(params.id));
   loadModules([
     'esri/Map',
     'esri/views/MapView',
     'esri/Graphic',
     'esri/geometry/Polygon',
     'esri/layers/GraphicsLayer',
     'esri/widgets/Popup',
     'esri/PopupTemplate'
   ]).then(([Map, MapView, Graphic, Polygon, GraphicsLayer, Popup, PopupTemplate]) => {
     const polygonJson = layer?.geometryContent;
 
     if (polygonJson) {
       setSpatialReference(layer?.geometryContent.type);
     }
 
     let polygon;
 
     if (spatialReference === 'polygon') {
       polygon = new Polygon({
         rings: polygonJson?.coordinates,
         spatialReference: { wkid: 102100 }
       });
     } else if (spatialReference === 'MultiPolygon') {
       polygon = new Polygon({
         rings: polygonJson?.coordinates[0],
         spatialReference: { wkid: 4326 }
       });
     }
 
     const graphic = new Graphic({
       geometry: polygon,
       symbol: {
         type: 'simple-fill',
         color: 'rgba(255, 0, 0, 0)',
         outline: {
           color: 'green',
           width: 6,
         },
       },
       attributes: {
         name: `${ layer?.featureLayer?.name}`,
         description: `${ layer?.featureLayer?.description}`
       },
       popupTemplate: new PopupTemplate({
         title: '{name}',
         content: '{description}'
       })
     });
 
     const graphicWhite = new Graphic({
       geometry: polygon,
       symbol: {
         type: 'simple-fill',
         color: 'rgba(255, 0, 0, 0)',
         outline: {
           color: 'white',
           width: 4,
         },
       },
     });
 
     const graphic2 = new Graphic({
       geometry: polygon,
       symbol: {
         type: 'simple-fill',
         color: 'rgba(255, 0, 0, 0)',
         outline: {
           color: 'red',
           width: 1,
         },
       },
     });
 
     const polygonLayer = new GraphicsLayer({
       hitTestEnabled: true
     });
 
     polygonLayer.add(graphic);
     polygonLayer.add(graphicWhite);
     polygonLayer.add(graphic2);
 
     const map = new Map({
       basemap: basemap,
       layers: [polygonLayer]
     });
 
     const view = new MapView({
       container: mapRef.current,
       map: map,
       center: [7.5, 9.5],
       zoom: 5
     });
 
     const popup = new Popup({
       dockEnabled: true,
       dockOptions: {
         buttonEnabled: true,
         position: 'top-right'
       },
       view: view
     });
 
     view.popup = popup;
     view.when(() => {
       view.on('click', (event) => {
         view.hitTest(event).then((response) => {
           const feature = response.results[0].graphic;
           if (feature) {
             view.popup.open({
               location: feature.geometry.centroid,
               feature: feature
             });
           }
         });
       });
       });
     });
 }, [basemap]);

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
               
               {showModalCreate ? (
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
                                             onClick={()=>setShowModalCreate(false)}
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
                     <div className='flex justify-center items-center'>
                       
                       <Loader />
                       {successFeature && navigateCreate }
                     </div>
                                       {/* {message && (
                                          <Message variant="danger">
                                             {message}
                                          </Message>
                                       )} */}
                                       
                                    </div>
                                 </div>
                              </div>
                           </div>
                           ) : null}
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
        <input type="text"  name="title" value={title} onChange={(e) => setTitle(e.target.value)} id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"> Name</label>
                                 </div>  
                                 {/* <div class="relative">
        <input type="text" id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Feature Categorization</label>
    </div>                              */}
                                        
                 <div class="relative">
        <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} id="small_filled" class="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " ></input>
        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Description</label>
                                 </div>
                                 
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" ></input>
<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF .</p>


    {/* <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" name="file" onChange={(e) => setFile(e.target.files[0])} class="hidden" />
    </label>
                                 </div> */}
                                 {/* {progress > 0 && <progress value={progress} max="100" />} */}
                                 {/* {progress > 0 && 
  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: progress + '%'}} > {progress }</div>
  </div>
 } */}
                    
             
                                         
                                          

    <div className="flex justify-center items-center ">
                                    <button
                                       onClick={submitDocumentHandler}
                                       className="px-14 py-2 bg-green-500 hover:bg-green-600 text-white text-md mb-8"> Create</button>

                    </div>
                                         

                                        
                                       </form>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           ) : null}

           {/* {layerLoading && <Loader />} */}
           
               <div>
                  <div style={{ height: "200px" }} className="flex  p-4 space-x-4 bg-white my-2 rounded-lg" >
                     <div className="">
                  <iframe src={`${documentSingle?.presignedUrl}`} width="100%" height="170px" />

                     </div>
                     <div className="space-y-4 ">
                        <h4 className="font-bold text-md ">Title : { documentSingle?.document.title }</h4>
                        <p className="font-normal text-sm ">Description : {documentSingle?.document.description}</p>
                        
                        <div onClick={() => openInNewTab(`${documentSingle?.presignedUrl}`)} className="flex space-x-4 bg-white border border-green-500 hover:bg-green-500 hover:bg-opacity-75 group px-4 py-2 mt-2 cursor-pointer  ">
                  <img className='w-7' src={file2}></img>
                  <div className="flex justify-center items-center">

                  <p  className="text-center text-sm font-medium mx-2 group-hover:text-white ">View Document</p>
                  </div>
                </div>
                     </div>
                  
                  </div>
                    <div ref={mapRef} style={{height:"300px"}} className="min-h-screen1 mt-2 relative" >
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
             <Sidebar
               handleID={params.id}
               handleFileID={params.fileID}
               handleDocumentModal={showDocumentHandler}
               handleSubLayerModal={showSubLayerHandler}></Sidebar>
                     {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
                  </ul>
                 
               </div>

               
           
               {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
               
               

               {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<< the Sidebar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          
         </div>
      </>
   );
};

export default LayerDocScreen;
