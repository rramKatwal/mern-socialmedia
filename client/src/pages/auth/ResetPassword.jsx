import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${window.location.origin}/auth/reset-password`,
        {
          otp,
          password,
          cPassword,
        }
      );
      if (data?.success) {
        if (user) {
          toast.success(data?.message, {
            onClose: () => navigate(`/profile/${user.username}`),
            autoClose: 500,
          });
        } else {
          toast.success(data?.message, {
            onClose: () => {
              user ? navigate(`/`) : navigate(`/login`);
            },
            autoClose: 500,
          });
        }
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="container register-form">
        <h1 className="text-center"> Reset Password</h1>
        <div className="row ">
          <div className="col-md-4 text-end">
            {" "}
            <NavLink to="/">
              <img src="/logo.png" alt="logo" height="288px" />
            </NavLink>
          </div>
          <div className="col-md-8 d-flex justify-content-start align-items-center">
            <Form onSubmit={handlesubmit}>
              <div className="inputbox">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <label htmlFor="otp">
                  <FontAwesomeIcon icon={faKey} className="reg-icon" /> Otp
                </label>
              </div>

              <div className="inputbox">
                <input
                  type="password"
                  id="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="pass">
                  <FontAwesomeIcon icon={faLock} className="reg-icon" />{" "}
                  Password
                </label>
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  id="cpass"
                  value={cPassword}
                  onChange={(e) => setcPassword(e.target.value)}
                  required
                />
                <label htmlFor="cpass">
                  <FontAwesomeIcon icon={faLock} className="reg-icon" />{" "}
                  Confirm-Password
                </label>
              </div>

              <button type="submit" className="btn ">
                Update Password
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
