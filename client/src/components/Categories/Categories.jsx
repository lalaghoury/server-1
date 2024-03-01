import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import CategoriesCard from "../CategoriesCard/CategoriesCard";
import AppLayout from "../../Layout/Layout";

function Categories() {
  return (
    <AppLayout>
      <div className="categories-container">
        <div className="common-heading">
          <h1 className="text-black font-48">Categories</h1>
          <span className="text-primary"><Link to="/category" className="text-primary links-fix">View more</Link></span>
        </div>
        <CategoriesCard />
      </div>
    </AppLayout>

  );
}

export default Categories;
