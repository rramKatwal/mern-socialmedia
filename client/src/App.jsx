import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage/Homepage";
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { PostPage } from "./pages/postpage/PostPage";
import { Sendmail } from "./pages/auth/SendMail";
import { ResetPassword } from "./pages/auth/ResetPassword";

const App = () => {
  return (
    <>
      <div className="app">
        <div
          className="blur"
          style={{ height: "5rem", top: "-3px", left: "15%" }}
        ></div>
        <div className="blur" style={{ top: "400px", left: "-19px" }}></div>
        <div className="blur" style={{ top: "-2px", right: "1px" }}></div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition:Bounce
        />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/post/edit/:postId/:postType" element={<PostPage />} />
          <Route path="/post/edit/:postId/" element={<PostPage />} />
          <Route path="/auth/mail" element={<Sendmail />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
