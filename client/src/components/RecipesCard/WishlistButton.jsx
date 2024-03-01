import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, message } from "antd";
import axios from "axios";
import { HeartFilled } from "@ant-design/icons";

const WishlistButton = ({ saves, recipeId, onAction }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const checkIsInWishlist = () => {
      const isSaved = saves.includes(auth.user._id);
      setIsInWishlist(isSaved);
    };

    if (auth.user && recipeId) {
      checkIsInWishlist();
    }
  }, [auth.user, recipeId, saves]);

  const handleNotLoggedIn = () => {
    console.error("User must be logged in to perform this action");
    message.error(
      "You need to be logged in to add this recipe to your wishlist."
    );
  };

  const toggleWishlist = async () => {
    if (!auth?.token) {
      handleNotLoggedIn();
      return;
    }
    const action = isInWishlist ? "removeFromWishlist" : "addToWishlist";
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;

    try {
      const endpoint = `/api/user/${action}/${auth.user._id}/${recipeId}`;
      console.log(endpoint);
      console.log(recipeId);
      const response = await axios.post(endpoint);
      const { success, message: responseMessage } = response.data;
      if (success) {
        message.success(responseMessage);
        setIsInWishlist(!isInWishlist);
        onAction();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      console.error(error);
      message.error(errorMessage, 3);
    }
  };

  if (!auth.user || !recipeId) {
    return null;
  }

  const style = {
    position: "absolute",
    borderRadius: "8px",
    right: "3px",
    top: "3px",
    width: "30px",
    height: "30px",
    backgroundColor: "rgb(255, 255, 255)",
    color: isInWishlist ? "#b55d51" : "rgb(141 141 141)",
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<HeartFilled />}
      onClick={toggleWishlist}
      style={style}
    />
  );
};

export default WishlistButton;
