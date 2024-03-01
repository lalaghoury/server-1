import React from "react";
import "./Footer.scss";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  PinterestOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function Footer() {
  const { auth, setAuth } = useAuth();
  const handleNewsletterAction = async (values) => {
    try {
      const response = await axios.post("/api/newsletter/subscribe", {
        email: values.email,
        userId: auth.user._id,
      });
      const data = response.data;
      if (data.success) {
        message.success(data.message);
        const updatedUser = { ...auth.user, newsletter: data.user.newsletter };
        setAuth((previousAuth) => ({
          ...previousAuth,
          user: updatedUser,
          token: data.token,
        }));
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: updatedUser })
        );
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-wrapper">
          <div className="footer-text">
            <Logo />
            <p className="text-black font-16 text-grey">
              The purpose of lorem ipsum is to create a natural looking block of
              text (sentence, paragraph, page, etc.) that doesn't distract from
              the layout.
            </p>
          </div>
          <div className="footer-links">
            <div className="content">
              <h1 className="text-black bold font-16">Links</h1>
              <p className="text-black font-16 text-grey">
                <Link className="text-grey links-fix f-l" to="/">
                  Home
                </Link>
              </p>
              <p className="text-black font-16 text-grey">
                <Link className="text-grey links-fix f-l" to="/recipe">
                  Recipe
                </Link>
              </p>
              <p className="text-black font-16 text-grey">
                <Link className="text-grey links-fix f-l" to="/blog">
                  Blog
                </Link>
              </p>
            </div>
            <div className="content">
              <h1 className="bold text-black font-16">Links</h1>
              <p className="text-black font-16 text-grey">
                <Link className="text-grey links-fix f-l" to="/add-recipe">
                  Share Recipe
                </Link>
              </p>
              <p className="text-black font-16 text-grey">
                <Link className="text-grey links-fix f-l" to="/about">
                  About Us
                </Link>
              </p>
              <p className="text-black font-16 text-grey">
                <Link className="text-grey links-fix f-l" to="/contact">
                  Contact
                </Link>
              </p>
            </div>
            <div className="content">
              <h1 className="bold text-black font-16">Legal</h1>
              <p className="text-black font-16 text-grey">
                <Link className="text-grey links-fix f-l" to="/">
                  Home
                </Link>
              </p>
              <p className="text-black font-16 text-grey">
                <Link className="text-grey links-fix f-l" to="/privacy">
                  Privacy & Policy
                </Link>
              </p>
              <p className="text-black font-16 text-grey">
                <Link className="text-grey links-fix f-l" to="/cookies">
                  Cookies
                </Link>
              </p>
            </div>
          </div>
          {auth && auth.user && auth.user.newsletter ? null : (
            <div className="footer-letter">
              <h1 className="text-black font-48">Newsletter</h1>
              <p className="text-black font-16">
                Subscribe to our newsletter to get more free tip{" "}
              </p>
              <Form onFinish={handleNewsletterAction} style={{ width: "100%" }}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                  validateTrigger="onSubmit"
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="btn-primary-small bold disable-hover"
                    type="primary"
                    htmlType="submit"
                  >
                    Subscribe
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
        <hr />
        <div className="footer-disclaimer">
          <p>Copyright © 2022. All Rights Reserved to Perfect Recipe.</p>
          <div className="social-links">
            {/* <img
              src="https://i.ibb.co/9yCd0cb/s-homepage-social-media-icon.png"
              alt="img"
            /> */}
            <a
              href="https://www.facebook.com/ghouryaasil"
              className="links-fix"
              style={{ color: "#3b5998" }}
            >
              <FacebookOutlined />
            </a>
            <a
              href="https://www.instagram.com/aasilghoury/"
              className="links-fix"
              style={{ color: "#e4405f" }}
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://www.twitter.com"
              className="links-fix"
              style={{ color: "#55acee" }}
            >
              <TwitterOutlined />
            </a>
            <a
              href="https://www.linkedin.com/in/geo-gaming-62a97a250/"
              className="links-fix"
              style={{ color: "#0077b5" }}
            >
              <LinkedinOutlined />
            </a>
            <a
              href="https://www.youtube.com"
              className="links-fix"
              style={{ color: "#ff0000" }}
            >
              <YoutubeOutlined />
            </a>
            <a
              href="https://www.pinterest.com"
              className="links-fix"
              style={{ color: "#bd081c" }}
            >
              <PinterestOutlined />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
