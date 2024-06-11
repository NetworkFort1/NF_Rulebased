
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Routes, Route } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Navbar from './pages/Navbar';
// import Login from "./pages/LoginPage"
// import MainDash from './pages/MainDashboard';
// import DDOSPage from './pages/DDOSPage';
// import DNSPage from './pages/DNSPage';
// import DNSExPage from './pages/DNSExPage';
// import EncryptPage from "./pages/EncryptedPage"
// import DNS_AlertComp from './components/AlertComp'; // Import the DNS_AlertComp component
// import { toggleAlerts } from './redux/actions'; // Import the toggleAlerts action

// function App() {
//   const dispatch = useDispatch();
//   const alertsEnabled = useSelector((state) => state.alertsEnabled);
 


//   return (
//     <div className="App">
//       {/* Pass alertsEnabled state to NavBar component */}
//        <Navbar alertsEnabled={alertsEnabled} setAlertsEnabled={() => dispatch(toggleAlerts())} />
//       <DNS_AlertComp alertsEnabled={true} />
     


//        <Routes>
      
//         <Route path="/" element={<MainDash  />} />
//         <Route path="/DDOSPage" element={<DDOSPage />} />
//         <Route path="/DNSPage" element={<DNSPage />} />
//         <Route path="/DNSExPage" element={<DNSExPage />} />
//         <Route path="/EncryptedPage" element={<EncryptPage/>}/>
//         {/* <Route path='/hh' element={<Login/>}/> */}
//       </Routes> 
      
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './pages/Navbar';
import MainDash from './pages/MainDashboard';
import MainDashLogin from './pages/MainDashboardLogin';
import RansomPage from './pages/RansomPage'
import DDOSPage from './pages/DDOSPage';
import DNSPage from './pages/DNSPage';
import DNSExPage from './pages/DNSExPage';
import EncryptedPage from './pages/EncryptedPage';
import DNS_AlertComp from './components/AlertComp';
import AnomalyPage from './pages/AnomalyPage';
import MitrePage from './pages/MitrePage';
import LateralPage from './pages/LateralPage'
import { toggleAlerts } from './redux/actions';
import Login from './pages/LoginPage';

function App() {
  const dispatch = useDispatch();
  const alertsEnabled = useSelector((state) => state.alertsEnabled);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const NavbarComponent = () => (
    <>
      <Navbar alertsEnabled={alertsEnabled} setAlertsEnabled={() => dispatch(toggleAlerts())} />
      <DNS_AlertComp alertsEnabled={true} />
    </>
  );

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <>
                <NavbarComponent />
                <MainDashLogin />
              </>
            ) : (
              <Login setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route path="/DDOSPage" element={<DDOSPage />} />
        <Route path="/DNSPage" element={<DNSPage />} />
        <Route path="/DNSExPage" element={<DNSExPage />} />
        <Route path='/Ransom' element={<RansomPage />} />
        <Route path="/EncryptedPage" element={<EncryptedPage />} />
        <Route path="/LateralPage" element={<LateralPage />} />
        <Route path="/AnomalyPage" element={<AnomalyPage />} />
        <Route path="/MitrePage" element={<MitrePage />} />
        <Route path="/dash" element={<MainDash />} />
      </Routes>
    </div>
  );
}

export default App;

