import React, { useState,useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { listDocumentsAction } from '../actions/documentActions';
import file from "../images/file2.png"
import document2 from "../images/file.png"
import layers from "../images/layers.png"
import map4 from "../images/map4.png"
let url = process.env.REACT_APP_BASE_URL;


const Sidebar = ({handleDocumentModal,handleSubLayerModal,handleID,handleFileID}) =>  {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

   const  documentList = useSelector(state => state. documentList)
     const { loading : documentsLoading, error : documentsError,documents } =  documentList;
  console.log(documents + " documents")
  
  const documentCreate = useSelector((state) => state.documentCreate);
  const {
     document,
     loading: loadingDocument,
     error: errorDocument
 } = documentCreate;
  const handleLayerEditor = () => {
    Navigate(`/featureLayers/r/${handleID}`)
  }
     useEffect(() => {
      dispatch(listDocumentsAction(handleID));
      // setGeojsonData(layer?.geometryContent);
     
    }, [document]);

  
    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
  
  return (
     <div>
         {' '}
         <aside class="w-60 min-h-screen bg-slate-100 border border-l-green-500 border-1 px-3" aria-label="Sidebar">
           
                
                <div onClick={handleDocumentModal} className="flex space-x-4 bg-green-500 px-4 py-2 cursor-pointer hover:opacity-70 ">
                  <img className='w-7' src={file}></img>
                  <div className="flex justify-center items-center">

                  <p  className="text-center text-sm font-medium mx-2 text-white ">New Document</p>
                  </div>
        </div>
        { handleFileID && <div onClick={handleLayerEditor} className="flex space-x-4 bg-white border border-green-500 hover:bg-green-500 hover:bg-opacity-75 group px-4 py-2 mt-2 cursor-pointer  ">
                  <img className='w-7' src={map4}></img>
                  <div className="flex justify-center items-center">

                  <p  className="text-center text-sm font-medium mx-2 group-hover:text-white ">View Layer</p>
                  </div>
                </div> }
         {/* <div onClick={handleLayerEditor} className="flex space-x-4 bg-white border border-green-500 hover:bg-green-500 hover:bg-opacity-75 group px-4 py-2 mt-2 cursor-pointer  ">
                  <img className='w-7' src={map4}></img>
                  <div className="flex justify-center items-center">

                  <p  className="text-center text-sm font-medium mx-2 group-hover:text-white ">Open Layer Editor</p>
                  </div>
                </div> */}
         <div onClick={handleSubLayerModal} className="flex space-x-4 bg-white border border-green-500 hover:bg-green-500 hover:bg-opacity-75 group px-4 py-2 mt-2 cursor-pointer  ">
                  <img className='w-7' src={layers}></img>
                  <div className="flex justify-center items-center">

                  <p  className="text-center text-sm font-medium mx-2 group-hover:text-white ">New SubLayer</p>
                  </div>
                </div>

                <p className="text-left text-xs mt-4 mb-2 font-medium mx-2 text-gray-500 ">open saved document</p>

                <div className="space-y-1">
                
                
                {
            documents?.map((document, index) =>
              <Link  to={`/featureLayers/r/${handleID}/${document._id}` } >
    <div  className="flex items-center space-x-4 bg-white hover:bg-green-500 hover:bg-opacity-75 group px-4 py-2 mt-2 cursor-pointer  ">
                  <img className=' w-7 h-5' src={document2}></img>
                  <div className="flex justify-center items-center">

          <p className="text-center text-xs font-medium mx-2 group-hover:text-white ">{ document.title}</p>
                  </div>
                  
                </div></Link>
  ).reverse().slice(0,20)
}
          
                </div>
         </aside>
      </div>
   );
};

export default Sidebar;




