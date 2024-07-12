import React from "react";
import "./right.css";
import { Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEllipsisVertical,
  faGear,
  faHome,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RightBody } from "./body/RightBody";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../features/authSlice";

export const Right = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleNavLinkClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.location.reload();
    } else {
      navigate("/");
    }
  };
  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };
  return (
    <>
      <div className="right mt-2">
        <div className="d-flex m-0">
          <div className="col-md-10 ms-3 navicons d-flex align-items-center justify-content-between">
            <NavLink to="/" className="nav-link" onClick={handleNavLinkClick}>
              <FontAwesomeIcon icon={faHome} className="h-icon" />
            </NavLink>
            <div className="noti">
              <Badge count="4">
                <FontAwesomeIcon icon={faBell} className="h-icon" />
              </Badge>
            </div>
            <div className="friends">
              <Badge count="4">
                <FontAwesomeIcon icon={faUserGroup} className="h-icon" />
              </Badge>
            </div>
            <div className="setting">
              <FontAwesomeIcon icon={faGear} className="h-icon" />
            </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              className="toogle-btn mt-0"
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="h-icon m-0"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as="div">
                <NavLink to={`/profile/${user.username}`} className="nav-link">
                  My Profile
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <main style={{ minHeight: "72vh" }}>
          <RightBody />
        </main>
        <footer className="right-footer mt-5 cursor">
          <p className="footer-p">
            <NavLink to={`https://rishiramkatwal.com.np`} target="_blank">
              Designed by: Rishiram Katwal <sup> &copy; </sup>
            </NavLink>
          </p>
        </footer>
      </div>
    </>
  );
};
