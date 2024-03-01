import React, { useState } from "react";
import "./SignUpPage.scss";
import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppLayout from "../../Layout/Layout";

function SignUpPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSignup = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/signup", values);
      const data = response.data;
      if (data.success) {
        message.success(data.message, 1, () => {
          navigate("/login");
        });
      }
    } catch (error) {
      message.error(error.response.data.message, 3);
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="signup-page">
        <div className="signup-img">
          <img
            src="https://res.cloudinary.com/dslrkvmwn/image/upload/v1707028163/images/bb2a7jwwkymlpuravokr.png"
            alt="img"
          />
        </div>
        <div className="signup-text">
          <h1>Want to join our family</h1>

          <Form
            form={form}
            layout="vertical"
            size="medium"
            onFinish={handleSignup}
          >
            {/* Full Name Field */}
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input
                className="small-input"
                allowClear
                placeholder="Enter Full Name"
              />
            </Form.Item>
            <Divider className="small-divider" />
            {/*  Username Field */}
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="small-input"
                allowClear
                placeholder="Enter Username"
              />
            </Form.Item>
            <Divider className="small-divider" />
            {/* Email Field */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                () => ({
                  validator(_, value) {
                    if (
                      value &&
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return Promise.reject(
                        new Error("The input is not a valid email!")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              validateTrigger="onBlur"
            >
              <Input
                className="small-input"
                allowClear
                placeholder="Enter Email"
                suffix={
                  !form.isFieldTouched("email") ||
                  !form.getFieldError("email")
                    .length ? null : form.getFieldError("email").length ? (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  ) : (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  )
                }
              />
            </Form.Item>
            <Divider className="small-divider" />
            {/* Password Field */}
            <Form.Item
              label="Password"
              name="password"
              hasFeedback
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(
                        new Error("Please input your password!")
                      );
                    }
                    if (value.length < 8) {
                      return Promise.reject(
                        new Error(
                          "Password must be at least 8 characters long!"
                        )
                      );
                    }
                    if (!/[A-Z]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Password must contain at least one uppercase letter!"
                        )
                      );
                    }
                    if (!/[a-z]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Password must contain at least one lowercase letter!"
                        )
                      );
                    }
                    if (!/[0-9]/.test(value)) {
                      return Promise.reject(
                        new Error("Password must contain at least one number!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input.Password
                placeholder="Enter Password"
                className="small-input"
                style={{ width: "100%" }}
                allowClear
              />
            </Form.Item>
            <Divider className="small-divider" />
            {/* Confirm Password Field */}
            <Form.Item
              label="Confirm Password"
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
              validateTrigger="onBlur"
            >
              <Input.Password
                placeholder="Confirm Password"
                className="small-input"
                style={{ width: "100%" }}
                allowClear
              />
            </Form.Item>
            <Divider className="small-divider" />
            {/* Terms and Conditions Checkbox */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "You must agree to the terms and conditions!"
                          )
                        ),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Checkbox>
                I agree to the{" "}
                <Link to="/terms-and-conditions">terms and conditions</Link>
              </Checkbox>
            </Form.Item>
            <Divider className="small-divider" />
            {/* Submit Button */}
            <Form.Item>
              <Button
                className="text-white bold bg-primary cursor disable-hover"
                htmlType="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
}

export default SignUpPage;
