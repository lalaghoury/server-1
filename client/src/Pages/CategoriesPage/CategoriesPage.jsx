import React from "react";
import "./CategoriesPage.scss";
import { Breadcrumb } from "antd";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import AppLayout from "../../Layout/Layout";

function CategoryPage() {
  return (
    <AppLayout>
      <div className="category-page">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Home',
              href: '/',
              className: 'bold',
            },
            {
              title: 'Categories',
              href: '/category',
              className: 'bold',
            },
          ]}
        />
        <CategoriesCard />
      </div>
    </AppLayout>

  );
}

export default CategoryPage;
