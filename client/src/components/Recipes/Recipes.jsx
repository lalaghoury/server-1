import React, { useState } from "react";
import "./Recipes.scss";
import { Breadcrumb, Divider, Select } from "antd";
import RecipesCard from "../RecipesCard/RecipesCard";
import { useLocation } from 'react-router-dom';




function Recipes({ slice, userShow }) {
  const [next, setNext] = useState(false);
  const location = useLocation();
  // Extract query parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const collectionName = searchParams.get('collection'); // Assuming 'collection' is the query param for collection name
  let breadcrumbItems = [
    {
      title: 'Home',
      href: '/',
      className: 'bold',
    },
    {
      title: 'Recipes',
      href: '/recipe',
      className: 'bold',
    },
  ];
  // Add collection name to breadcrumb if it exists
  if (collectionName) {
    breadcrumbItems.push({
      title: collectionName,
      href: `/recipe?collection=${collectionName}`,
      className: 'bold',
    });
  }
  const handleSortChange = (value) => {
    setNext(!next);
    console.log(`Selected sort order: ${value}`);
  };

  return (
    <div className="recipes">
      <div className="breadcrumb">
        {/*Breadcrumb component with dynamic items */}
        <Breadcrumb separator=">" items={breadcrumbItems} />
      </div>
      <div className="recipes-heading">
        <h1 className="text-black font-48">Recipes</h1>
        <span className="text-black bold">
          Sort By:
          <Select
            className="dropdown antd-form-input"
            onChange={handleSortChange}
            placeholder="Relevance"
            style={{ width: 200, color: '#b55d51f7' }}
          >
            <Select.Option className="dropdown bold" style={{ color: '#b55d51f7' }} value="Relevance">Relevance</Select.Option>
            <Select.Option className="dropdown bold" style={{ color: '#b55d51f7' }} value="Newest">Newest</Select.Option>
            <Select.Option className="dropdown bold" style={{ color: '#b55d51f7' }} value="Top-Rated">Top Rated</Select.Option>
          </Select>
        </span>
      </div>
      <Divider />
      <RecipesCard slice={slice} userShow={userShow} />
    </div>
  );
}

export default Recipes;
