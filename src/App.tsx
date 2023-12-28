import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "./routes";
import Login from "./admin/login/login";
import Header from "./admin/sidebar.admin/header";

function App() {
  const auth = localStorage.getItem("admin");
  return (
    <>
    <Header/>
      {auth ? (
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
