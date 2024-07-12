import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/authSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${window.location.origin}/auth/login`,
        {
          email,
          password,
        }
      );
      if (data?.success) {
        dispatch(addUser({ user: data.user, token: data.token }));
        toast.success(data?.message, {
          onClose: () => navigate("/"),
          autoClose: 100,
        });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="register ">
        <div className="col-md-5  text-center">
          <img src="./logo.png" alt="logo" height="288px" />
          <NavLink to="/register" className="nav-link">
            Don't have an Account? Register
          </NavLink>
        </div>
        <div className="col-md-6 reg-left">
          <h1 className="mb-3">LOGIN</h1>
          <Form onSubmit={handleSubmit}>
            <div className="reg-form">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="reg-form">
              <label htmlFor="pass">Password: </label>
              <input
                type="password"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="mt-4 d-flex justify-content-end m-5 mb-0">
              <NavLink to="/auth/mail" className="nav-link">
                Forget Password?
              </NavLink>
            </p>

            <button type="submmit" className="mt-3 btn">
              Login
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};
