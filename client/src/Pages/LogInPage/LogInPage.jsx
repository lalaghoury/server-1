import React, { useState } from "react";
import "./LogInPage.scss";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function LogInPage() {
  axios.defaults.withCredentials = true;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/login", values);
      const data = response.data;
      if (data.success) {
        localStorage.setItem("loggedIn", true);
        message.success(data.message, 2);
        setAuth((previousAuth) => ({
          ...previousAuth,
          user: data.user,
          token: data.token,
        }));
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: data.user,
            token: data.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      message.error(error.response.data.message, 3);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="signup-img">
        <img
          src="https://res.cloudinary.com/dslrkvmwn/image/upload/v1707028163/images/bb2a7jwwkymlpuravokr.png"
          alt="img"
        />
      </div>
      <div className="signup-text">
        <h1>Log in</h1>
        <Form
          form={form}
          layout="vertical"
          size="medium"
          onFinish={handleLogin}
        >
          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              className="small-input"
              allowClear
              placeholder="Enter Email"
              onBlur={() => form.validateFields(["email"])}
              suffix={
                form.getFieldValue("email") ? (
                  form.getFieldError("email") ? (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  ) : (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  )
                ) : null
              }
            />
          </Form.Item>
          <Divider className="small-divider" />
          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            validateTrigger="onBlur"
          >
            <Input
              className="small-input"
              allowClear
              placeholder="Enter Password"
              onBlur={() => form.validateFields(["password"])}
              suffix={
                form.getFieldValue("password") ? (
                  form.getFieldError("password") ? (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  ) : (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  )
                ) : null
              }
            />
          </Form.Item>
          <Divider className="small-divider" />
          {/* Submit Button */}
          <Form.Item>
            <Button
              className="text-white bold bg-primary cursor disable-hover"
              htmlType="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Log In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LogInPage;
