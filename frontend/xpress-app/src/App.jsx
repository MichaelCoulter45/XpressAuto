import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/contexts/AuthContext";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
import Profile from "./Components/Profile.jsx";
import OilChange from "./Components/OilChange.jsx";
import TireService from "./Components/TireService.jsx";
import BrakeService from "./Components/BrakeService.jsx";
import Diagnostics from "./Components/Diagnostics.jsx";
import CheckUp from "./Components/CheckUp.jsx";
import Repair from "./Components/Repair.jsx";
import Maintenance from "./Components/Maintenance.jsx";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services/oil-change" element={<OilChange />} />
          <Route path="/services/tire-service" element={<TireService />} />
          <Route path="/services/brake-service" element={<BrakeService />} />
          <Route path="/services/diagnostics" element={<Diagnostics />} />
          <Route path="/services/check-up" element={<CheckUp />} />
          <Route path="/services/repair" element={<Repair />} />
          <Route path="/services/maintenance" element={<Maintenance />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;