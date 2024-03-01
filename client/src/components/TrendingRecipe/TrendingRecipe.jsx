import React from "react";
import "./TrendingRecipe.scss";
import { Link } from "react-router-dom";
import RecipesCard from "../RecipesCard/RecipesCard";
import AppLayout from "../../Layout/Layout";

function TrendingRecipe({ slice, userShow }) {
  return (
    <AppLayout>
      <div className="trending-recipe-container">
        <div className="common-heading">
          <h1 className="text-black font-48">Trending Recipes</h1>
          <span className="text-primary"><Link to="/recipe" className="text-primary links-fix">View more</Link></span>
        </div>

        <RecipesCard slice={slice} userShow={userShow} />
      </div>
    </AppLayout>
  );
}

export default TrendingRecipe;
