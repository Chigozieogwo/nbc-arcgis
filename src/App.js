import { BrowserRouter, Routes, Route,HashRouter } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import MapScreen from './screens/MapScreen.js'
import DocumentScreen from './screens/DocumentScreen.js'
import LayerScreen from './screens/LayerScreen.js'
import DetailScreen from './screens/DetailScreen.js'
import esriConfig from "@arcgis/core/config.js";
esriConfig.assetsPath = "./assets"; 

function App() {
  return (
    <>
       
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/map" element={<MapScreen />} />
        <Route exact path="/create" element={<DocumentScreen />} />
        <Route exact path="/layer" element={<LayerScreen />} />
        <Route exact path="/layer" element={<LayerScreen />} />
        <Route exact path="/details" element={<DetailScreen />} />
        
        {/* <Route
                   exact
                   path="/dashboard/profile"
                   element={<DashboardScreen />}
                /> */}
      
        {/* <Route
                   exact
                   path="/DemandNotice"
                   element={<BlankScreen />}
                />
        <Route
                   exact
                   path="/blank"
                   element={<Blank />}
                /> */}
      
      
         
      
        
      </Routes>
    </BrowserRouter>
    {/* <Footer /> */}
  </>
  );
}

export default App;
