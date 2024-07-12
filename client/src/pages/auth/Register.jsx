import React, { useState } from "react";
import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

export const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${window.location.origin}/auth/register`,
        {
          firstname,
          lastname,
          username,
          email,
          password,
          cPassword,
        }
      );
      if (data?.success) {
        toast.success(data?.message, {
          onClose: () => navigate("/login"),
          autoClose: 1000,
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
          <NavLink to="/login" className="nav-link">
            Already have an Account? Login
          </NavLink>
        </div>
        <div className="col-md-6 reg-left">
          <h1 className="mt-0">REGISTER</h1>

          <Form onSubmit={handleSubmit}>
            <div className="reg-form">
              <label htmlFor="fname">Firstname: </label>
              <input
                type="text"
                id="fname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="reg-form">
              <label htmlFor="lname">Lastname: </label>
              <input
                type="text"
                id="lname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="reg-form">
              <label htmlFor="uname">Username: </label>
              <input
                type="text"
                id="uname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <div className="reg-form">
              <label htmlFor="cPass">Confirm-Password: </label>
              <input
                type="password"
                id="cPass"
                value={cPassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
            </div>
            <button type="submmit" className="mt-2 btn reg-button">
              Register
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};
