import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./top.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const Top = () => {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const fetchData = async (value) => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/user/search/${value}`,
        { headers: { Authorization: token } }
      );
      if (data?.success) {
        setSearchResult(data?.result);
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (value) {
      fetchData(value);
    } else {
      setSearchResult([]);
    }
  };
  const handleItemClick = (username) => {
    navigate(`/profile/${username}`);
    setInput("");
    setSearchResult([]);
  };

  return (
    <>
      <div className="row topside">
        <div className="col-md-2 p-0 ">
          <NavLink to="/">
            <img src="/logo.png" alt="logo" />
          </NavLink>
        </div>
        <div className="col-md-10 ">
          <div className="search ">
            <input
              type="text"
              placeholder="#Explore"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="s-icon cursor" />
            {input && (
              <div className="search-results-dropdown">
                {searchResult.length > 0 ? (
                  searchResult.map((result) => (
                    <div
                      key={result._id}
                      className="search-result-item"
                      onClick={() => handleItemClick(result.username)}
                    >
                      <div className="userimage">
                        <img
                          src={
                            result.profileImg &&
                            result.profileImg !==
                              "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                              ? `${window.location.origin}/images/${result.profileImg}`
                              : result.profileImg
                          }
                          alt={result.firstname}
                        />
                      </div>
                      <div className="username">
                        <div>{result.fullname}</div>
                        <div>{result.username}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="search-result-item">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
