import React from "react";
import "../App.css";
import { BrowserRouter, Link, Route, Routes ,useLocation,useParams } from "react-router-dom";
import Dash from "../Admin_Screen/Dash";
// import Institute from '../components/Institute'
// import InstituteForm from '../components/instituteForm'
import LogIn from "../Screens/Login";
import Register from "../Admin_Screen/Register";
import StDash from "../Student_screen/StDash";
import Tdash from "../Teacher_screen/Tdash";
import InstiDash from "../Institute_screen/Insti-Dash";

function AppRouter() {
  
  
  // let {id}= prams;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="register/:id" element={<Register />} />
          <Route path="/Admin-dash/*" element={<Dash />} />
          <Route path="stdash/*" element={<StDash />} />
          <Route path="tdash" element={<Tdash />} />
          <Route path="/institute-dash/:id/*" element={<InstiDash />} />
0          <Route
            path="*"
            element={
              <img
                className="ms-5 mt-5 gif"
                src="https://media.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
