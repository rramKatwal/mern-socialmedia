import React from "react";
import { Card } from "react-bootstrap";
import "./middle.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const Middle = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className=" mt-3">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={
              user.coverImg &&
              user.coverImg !==
                "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                ? `${window.location.origin}/images/${user.coverImg}`
                : user.coverImg
            }
            height="178px"
            className="img img-responsive"
          />
          <Card.Img
            variant="top"
            src={
              user.profileImg &&
              user.profileImg !==
                "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                ? `${window.location.origin}/images/${user.profileImg}`
                : user.profileImg
            }
          />
          <Card.Body>
            <Card.Title className="mb-0" style={{ fontWeight: "600" }}>
              {user.fullname}
            </Card.Title>
            <Card.Text className="mb-2 mt-0">{user.username}</Card.Text>
            <hr className="mb-2 mt-1" />
            <div className="row text-center">
              <div className="col-md-6">
                <Card.Text>
                  <span style={{ color: "#242d49", fontWeight: "600" }}>
                    {user.following.length}
                  </span>
                  <br /> following
                </Card.Text>
              </div>

              <div
                className="col-md-6 "
                style={{ borderLeft: "1px solid gray" }}
              >
                <Card.Text>
                  <span style={{ color: "#242d49", fontWeight: "600" }}>
                    {user.followers.length}
                  </span>
                  <br />
                  followers
                </Card.Text>
              </div>
            </div>
            <hr className="mb-3" />
            <Card.Text style={{ color: "#242d49", fontWeight: "600" }}>
              <NavLink to={`/profile/${user.username}`} className="nav-link">
                My Profile
              </NavLink>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
