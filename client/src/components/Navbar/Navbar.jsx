import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useAccount } from "../../context/AccountContext";
import {
  DownOutlined,
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Button, Input } from "antd";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.scss";

const Navbar = () => {
  const { handleSignout } = useAccount();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("0");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    handleSignout();
    setTimeout(() => navigate("/login"), 500);
  };

  const handlenavigate = (route) => {
    setIsDropdownOpen(false);
    navigate(route);
  };

  const items = [
    {
      label: <Link to={`/user/${auth?.user?._id}`}>My Profile</Link>,
      key: "0",
    },
    {
      label: <Link to="/my-recipes">My Recipes</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Button
          onClick={handleLogout}
          className="disable-hover text-white bold bg-primary"
        >
          Logout
        </Button>
      ),
      key: "3",
    },
  ];

  return (
    <nav className="navbar">
      <Logo />
      <div className="nav-links">
        <Link className="text-black links-fix" to="/">
          Home
        </Link>
        <Link className="text-black links-fix" to="/recipe">
          Recipes
        </Link>
        {auth.user && (
          <Link className="text-black links-fix" to="/add-recipe">
            Add Recipe
          </Link>
        )}
        <Link className="text-black links-fix" to="/blog">
          Blog
        </Link>
        <Link className="text-black links-fix" to="/about">
          About us
        </Link>
      </div>

      {auth.user ? (
        <div className="nav-buttons">
          <Search />
          <Dropdown
            menu={{
              items,
            }}
            trigger={["hover"]}
          >
            <Space style={{ cursor: "pointer" }}>
              <img
                src={auth.user.userimage}
                alt="user icon"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      ) : (
        <div className="nav-buttons">
          <Button className="btn-sec-small cursor">
            <Link className="text-black links-fix" to="/login">
              Log in
            </Link>
          </Button>
          <Button className="disable-hover btn-primary-small cursor text-white">
            <Link className="text-white links-fix" to="/signup">
              Sign up
            </Link>
          </Button>
        </div>
      )}

      {isDropdownOpen ? (
        <>
          <div className="nav-dropdown">
            <div className="dropdown-body">
              <div>
                <Link
                  className="text-black links-fix"
                  onClick={() => {
                    setSelectedKey("0");
                    setIsDropdownOpen(false);
                  }}
                  style={{ color: selectedKey === "0" ? "#B55D51" : "black" }}
                  to={`/`}
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  onClick={() => {
                    setSelectedKey("1");
                    setIsDropdownOpen(false);
                  }}
                  className="text-black links-fix"
                  style={{ color: selectedKey === "1" ? "#B55D51" : "black" }}
                  to="/recipe"
                >
                  Recipes
                </Link>
              </div>
              <div>
                <Link
                  onClick={() => {
                    setSelectedKey("2");
                    setIsDropdownOpen(false);
                  }}
                  className="text-black links-fix"
                  to="/blog"
                  style={{ color: selectedKey === "2" ? "#B55D51" : "black" }}
                >
                  Blogs
                </Link>
              </div>
              <div>
                {auth?.user ? (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <Button
                      className="disable-hover text-white bold"
                      onClick={() => handlenavigate(`/user/${auth?.user?._id}`)}
                    >
                      My Profile
                    </Button>
                    <Button
                      className="disable-hover-sec text-white bold"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      // onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <Button
                      onClick={() => handlenavigate("/signup")}
                      className="disable-hover text-white bold"
                    >
                      Signup
                    </Button>
                    <Button
                      onClick={() => handlenavigate("/login")}
                      className="disable-hover-sec text-white bold"
                    >
                      Log in
                    </Button>
                  </div>
                )}
              </div>
              <span className="text-primary" id="close">
                <CloseOutlined
                  onClick={toggleDropdown}
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="nav-hamburger cursor" onClick={toggleDropdown}>
          <MenuOutlined style={{ fontSize: "24px" }} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearchIconClick = () => {
    setSearchTerm("");
    setShowSearch(true);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log(`Searching for: ${searchTerm}`);
      navigate(`/search?q=${searchTerm}`);
      setShowSearch(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  return (
    <div className="search-area" ref={searchRef}>
      {showSearch ? (
        <>
          <Input
            type="text"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            className="search-input"
            onChange={handleInputChange}
            onPressEnter={handleSearch}
            autoFocus
          />
          <Button
            className="disable-hover text-primary bold"
            onClick={handleSearch}
          >
            Search
          </Button>
        </>
      ) : (
        <SearchOutlined
          className="bold search-icon"
          style={{ fontSize: 30, opacity: 0.6, background: "transparent" }}
          onClick={handleSearchIconClick}
        />
      )}
    </div>
  );
};
