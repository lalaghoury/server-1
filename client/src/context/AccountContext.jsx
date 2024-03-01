import React, { createContext, useContext } from "react";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const { auth, setAuth } = useAuth();

  const handleSignout = async () => {
    try {
      const response = await axios.get("/api/signout");
      if (response.data.success) {
        localStorage.removeItem("auth");
        localStorage.removeItem("userId");
        localStorage.setItem("loggedIn", false);
        message.success(response.data.message, 2);
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      message.error(error.response.data.message, 3);
    }
  };

  const handleUserActivity = async () => {
    if (auth?.user) {
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${auth?.token}`;
        const response = await axios.get("/api/verify");
        if (response.data.success) {
          const formattedUsername =
            auth.user.username.charAt(0).toUpperCase() +
            auth.user.username.slice(1);
          message.success(`Welcome Dear , ` + formattedUsername);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <AccountContext.Provider value={{ handleSignout, handleUserActivity }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
