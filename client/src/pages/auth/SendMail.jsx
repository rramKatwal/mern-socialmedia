import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./register.css";

export const Sendmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${window.location.origin}/auth/email`,
        {
          email,
        }
      );
      if (data?.success) {
        toast.success(data?.message, {
          onClose: () => navigate("/auth/reset-password"),
          autoClose: 1000,
        });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  return (
    <>
      <div className="container register-form text-center">
        <h1>Email Verification!!</h1>
        <p>Please Enter your valid Email address below to get OTP:</p>
        <div className="row">
          <div className="col-md-4">
            <NavLink to="/">
              <img src="/logo.png" alt="logo" height="288px" />
            </NavLink>
          </div>
          <div className="col-md-8 d-flex justify-content-start align-items-center">
            <Form className="reset" onSubmit={sendOtp}>
              <div className="inputbox">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} className="reg-icon" />{" "}
                  Email
                </label>
              </div>
              <button type="submit" className="btn">
                Send OTP
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
