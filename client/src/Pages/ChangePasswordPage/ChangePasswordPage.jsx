import React from "react";
import "./ChangePasswordPage.scss";
import { Button, Divider, Form, Input, Modal, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "../../context/AccountContext";
import AppLayout from "../../Layout/Layout";

function ChangePasswordPage() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { handleSignout } = useAccount();

  const handlePasswordChange = async (values) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email))
      return message.error("Invalid email", 3);
    Modal.confirm({
      title: "Confirm Password Change",
      content: "Are you sure you want to change your password?",
      onOk() {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await axios.put(
              `/api/user/${user_id}/change-password`,
              values
            );
            if (response.data.success) {
              handleSignout();
              message.success(
                "Password changed successfully. Redirecting to login...",
                2
              );
              setTimeout(() => {
                navigate("/login");
                resolve();
              }, 2000);
            } else {
              reject();
            }
          } catch (error) {
            console.log(error.response.data.message);
            message.error(error.response.data.message, 3);
            reject();
          }
        });
      },
    });
  };

  return (
    <AppLayout>
      <div className="forgot-password-page">
        <div className="forgot-password">
          <h1>Change Password</h1>
          <Form
            layout="vertical"
            style={{ width: 500 }}
            onFinish={handlePasswordChange}
            size="large"
          >
            {/* Input for email */}
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
              <Input type="email" placeholder="Enter Email" />
            </Form.Item>
            <Divider className="small-divider" />

            {/* Input Current Password */}
            <Form.Item
              label="Current Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password!",
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input.Password placeholder="Enter Current Password" />
            </Form.Item>
            <Divider className="small-divider" />

            {/* New Password Field */}
            <Form.Item
              label="New Password"
              name="newPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please enter your new password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Please enter a new password!")
                    );
                  },
                }),
              ]}
              validateTrigger="onBlur"
              hasFeedback
            >
              <Input.Password placeholder="Enter New Password" />
            </Form.Item>
            <Divider className="small-divider" />

            {/* Confirm Password Field */}
            <Form.Item
              label="Confirm New Password"
              name="confirm"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
              validateTrigger="onBlur"
            >
              <Input.Password placeholder="Confirm New Password" />
            </Form.Item>
            <Divider className="small-divider" />

            <Button
              className="text-white bold bg-primary cursor disable-hover"
              style={{ marginRight: 20 }}
              htmlType="submit"
            >
              Reset
            </Button>
            <Button
              className="text-primary bold bg-white cursor disable-hover"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
}

export default ChangePasswordPage;
