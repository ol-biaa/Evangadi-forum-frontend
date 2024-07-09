import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import ForgotPassword from "../../Pages/ForgotPassword/ForgotPassword";
import QuesWithAns from "../../Pages/SingleQuestion/SingleQuestion";
import Ask from "../../Pages/AskQuestion/AskQuestion";
import Empty from "../../Pages/Empty/Empty";
import ResetPassword from "../../Pages/ResetPassword/ResetPassword";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes redirect={"/login"}>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/question/:qnid"
          element={
            <ProtectedRoutes redirect={"/login"}>
              <QuesWithAns />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/ask"
          element={
            <ProtectedRoutes redirect={"/login"}>
              <Ask />
            </ProtectedRoutes>
          }
        />
        <Route path="/reset/:resetToken" element={<ResetPassword />} />
        <Route path="*" element={<Empty />} />
      </Routes>
    </Router>
  );
}

export default Routing;