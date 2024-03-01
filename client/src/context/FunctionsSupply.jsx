import axios from "axios";
import React, { createContext, useContext } from "react";

const FunctionSupplyContext = createContext();

export const FunctionSupplyProvider = ({ children }) => {
  const getAllRecipes = async () => {
    try {
      const response = await axios.get("/api/recipe");
      const allRecipes = response.data;
      return allRecipes;
    } catch (error) {
      console.log(error);
      // return [];
    }
  };

  const getSingleRecipe = async (recipe_id) => {
    try {
      const response = await axios.get(`/api/recipe/${recipe_id}`);
      const recipe = response.data.recipe;
      return recipe;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      const allCategories = response.data;
      return allCategories;
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);
      const user = response.data;
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleCategory = async (category_id) => {
    try {
      const response = await axios.get(`/api/category/${category_id}`);
      const category = response.data;
      return category;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      const allBlogs = response.data;
      return allBlogs;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getSingleBlog = async (blog_id) => {
    try {
      const response = await axios.get(`/api/blog/${blog_id}`);
      const blog = response.data;
      return blog;
    } catch (error) {
      console.log(error);
    }
  };

  const timePassed = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const seconds = Math.round((now - created) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 30) {
      return `${days} days ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  };

  return (
    <FunctionSupplyContext.Provider
      value={{
        timePassed,
        getAllBlogs,
        getSingleCategory,
        getAllRecipes,
        getSingleRecipe,
        getAllCategories,
        getUser,
        getSingleBlog,
      }}
    >
      {children}
    </FunctionSupplyContext.Provider>
  );
};

export const useFunctions = () => {
  const context = useContext(FunctionSupplyContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
