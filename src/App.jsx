import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddNewJob from "./pages/Recuriter/AddNewJob";
import ViewDetails from "./pages/ViewDetails";

const App = () => {
  const [isLogin, setIslogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar setIslogin={setIslogin} />
              <Dashboard isLogin={isLogin} />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Navbar setIslogin={setIslogin} />
              <Dashboard isLogin={isLogin} />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newjob" element={<AddNewJob />} />
        <Route
          path="/job/:id"
          element={
            <>
              <Navbar setIslogin={setIslogin} />
              <ViewDetails isLogin={isLogin}/>
            </>
          }
        />
        <Route path="/editjob/:id" element={<AddNewJob/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
