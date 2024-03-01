import React from "react";
import "./StayInTouch.scss";
import { useAuth } from "../../context/AuthContext";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import AppLayout from "../../Layout/Layout";

function StayInTouch({ userId }) {
  const { auth, setAuth } = useAuth();
  const handleNewsletterAction = async (values) => {
    try {
      const response = await axios.post("/api/newsletter/subscribe", {
        email: values.email,
        userId,
      });
      console.log(response);
      const data = response.data;
      console.log(data);
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
    <AppLayout>
      {auth?.user?.newsletter ? null : (
        <div className="stay-in-touch-container">
          <h1 className="font-48">Let’s Stay In Touch!</h1>
          <p className="font-32 text-grey">
            Join our newsletter, so that we reach out to you with our news and
            offers.
          </p>
          <Form onFinish={handleNewsletterAction}>
            <div className="stay-in-wrap">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
                validateTrigger="onSubmit"
              >
                <Input placeholder="Enter your email" className="email-input" />
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
            </div>
          </Form>
        </div>
      )}
    </AppLayout>
  );
}

export default StayInTouch;
