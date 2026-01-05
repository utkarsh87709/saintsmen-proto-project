import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectLogin from "./pages/SelectLogin";
import Login from "./pages/Login";

import AppLayout from "./layout/AppLayout";
import Calendar from "./pages/Calender";
import VendorRequests from "./pages/VendorRequests";
import TrackVisitor from "./pages/TrackVisitor";
import VisitorRequestForm from "./pages/RequestVisit";
import Security from "./pages/Security";
import Profile from './pages/Profile'
import Dashboard from "./pages/Dashboard";
import UnderConstruction from "./pages/UnderConstruction";
import CreateUserForm from "./pages/CreateUsers";
import MyVisits from "./pages/MyVisits";
import Help from './pages/Help'
// import Vendor from "./pages/Vendor";
// import Calendar from "./pages/Calendar";
// import Profile from "./pages/Profile";
// import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
       
        <Route path="/" element={<Login />} />
      

        {/* AUTH ROUTES WITH SIDEBAR */}
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
           <Route path="create-users" element={<CreateUserForm />} />
           <Route path="request-visit" element={<VisitorRequestForm />} />
            <Route path="calendar" element={<Calendar />} />
              <Route path="vendor" element={<VendorRequests />}/>
               <Route path="security" element={<Security />}/>
                  <Route path="myvisits" element={<MyVisits />}/>
               <Route path ="track-visitor" element={<TrackVisitor/>}/>
                <Route path="profile" element={<Profile />} />
                <Route path="help" element={<Help />} />
          {/*  />
        
         
           */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
