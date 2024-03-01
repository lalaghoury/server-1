import React from "react";
import "./HeroSection.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import AppLayout from "../../Layout/Layout";
import { useAuth } from "../../context/AuthContext";

function Herosection() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <AppLayout>
      <div className="hero-container">
        <div className="hero-section-text">
          <div className="text-h">
            <h1 className="font-64">Your Daily Dish</h1>
            <h1 className="font-64">
              A <span className="text-primary">Food</span> Journey
            </h1>
          </div>
          <p>
            Discover the world of flavors with a daily dose of delicious recipes, cooking tips, and culinary inspiration. Satisfy your cravings and explore new dishes every day.
          </p>

          {auth && auth.user ? (
            <> <Button
              onClick={() => navigate(`/user/${auth.user._id}`)}
              className="disable-hover bold text-primary"
              style={{ height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>Check Your Profile</Button></>
          ) : (
            <>
              <div className="btn-h">
                <Button onClick={() => navigate("/login")}
                  className="disable-hover bold text-primary"
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Log in</Button>
                <Button onClick={() => navigate("/signup")}
                  className="disable-hover bold text-primary"
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Sign up</Button>
              </div>
              <p className="p-h ">
                Do you have account?{" "}
                <Link className="text-primary links-fix" to="/login">
                  Log in
                </Link>
              </p>
            </>
          )}

        </div>
        <div className="hero-section-image">
          <img
            src="https://i.ibb.co/VjWm0zC/food.png"
            alt="food"
            border="0"
          ></img>
        </div>
      </div>
    </AppLayout>
  );
}

export default Herosection;
