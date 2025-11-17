import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectLogin from "./pages/SelectLogin";
import HostLogin from "./pages/HostLogin";

import AppLayout from "./layout/AppLayout";
import Calendar from "./pages/Calender";
import VendorRequests from "./pages/VendorRequests";
import TrackVisitor from "./pages/TrackVisitor";

import Dashboard from "./pages/Dashboard";
import UnderConstruction from "./pages/UnderConstruction";
// import Vendor from "./pages/Vendor";
// import Calendar from "./pages/Calendar";
// import Profile from "./pages/Profile";
// import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<SelectLogin />} />
        <Route path="/host-login" element={<HostLogin />} />
      

        {/* AUTH ROUTES WITH SIDEBAR */}
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<Calendar />} />
              <Route path="vendor" element={<VendorRequests />}/>
               <Route path ="track-visitor" element={<TrackVisitor/>}/>
                <Route path="profile" element={<UnderConstruction text={"Profile Module"} />} />
                <Route path="help" element={<UnderConstruction text={"Help Module"} />} />
          {/*  />
        
         
           */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
