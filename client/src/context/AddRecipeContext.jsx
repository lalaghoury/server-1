import { createContext, useContext, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AddRecipeContext = createContext();

export const AddRecipeProvider = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipe_imageurl, setRecipe_imageurl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [form] = Form.useForm();

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setRecipe_imageurl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    setSelectedImage(file);
    return false; // Prevent automatic upload
  };

  const handleUpload = async (info) => {
    handleImageChange(info);
    setLoading(true);
    if (!selectedImage) {
      message.error("No image selected");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("/api/image", formData);
      setLoading(false);
      setShowImage(true);

      setRecipe_imageurl(response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/recipe", {
        ...values,
        recipe_imageurl,
      });
      if (response.data.success) {
        message.success(response.data.message);
        form.resetFields();
        setShowImage(false);
        setRecipe_imageurl("");
        setTimeout(() => {
          navigate(`/recipe/${response.data.newRecipe._id}`);
        }, 1000);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error.response.data.message);
      message.error(error.response.data.message, 3);
      setIsSubmitting(false);
    }
  };

  const onFinishBlog = async (values) => {
    const userId = auth.user._id;
    if (!userId) {
      console.error("Please Login To Create a Blog");
      return;
    }
    if (!recipe_imageurl) {
      console.error("Image URL is not set");
      return;
    }
    if (!values.category) {
      console.error("Category is not set");
      return;
    }
    try {
      const response = await axios.post("/api/blog", {
        ...values,
        user: [userId],
        image: recipe_imageurl,
      });
      if (response.data.success) {
        message.success(response.data.message);
        form.resetFields();
        setShowImage(false);
        setRecipe_imageurl("");
        setTimeout(() => {
          navigate(`/blog/${response.data.savedPost._id}`);
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.data.message);
      message.error(error.response.data.message, 3);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setShowImage(false);
  };

  const uploadButton = (
    <div style={{ textAlign: "center" }}>
      {loading ? <LoadingOutlined /> : null}
      <div>
        <PlusOutlined /> Upload
      </div>
    </div>
  );

  return (
    <AddRecipeContext.Provider
      value={{
        isSubmitting,
        setIsSubmitting,
        uploadButton,
        onFinishBlog,
        handleImageChange,
        beforeUpload,
        handleUpload,
        showImage,
        setRecipe_imageurl,
        recipe_imageurl,
        setShowImage,
        onFinish,
        form,
        handleCancel,
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  );
};

export const useAddRecipe = () => {
  const context = useContext(AddRecipeContext);
  if (!context) {
    throw new Error("useAddRecipe must be used within a AddRecipeProvider");
  }
  return context;
};
