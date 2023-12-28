import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { routes } from "./routes";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/slice/authSlice";
import { callFetchUserApi } from "./utils/Auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function login() {
      const res: any = await callFetchUserApi();
      
      if (res) {
        dispatch(loginSuccess(res.data));
      }
    }
    login();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
