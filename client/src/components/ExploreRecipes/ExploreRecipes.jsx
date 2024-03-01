import React from "react";
import "./ExploreRecipes.scss";
import { Link } from "react-router-dom";
import RecipesCard from "../RecipesCard/RecipesCard";
import AppLayout from "../../Layout/Layout";

function ExploreRecipes({ slice, userShow }) {
  return (
    <AppLayout>
      <div className="explore-recipes">
        <div className="common-heading">
          <h1 className="text-black font-48">Explore Recipes</h1>
          <span className="text-primary"><Link to="/recipe" className="text-primary links-fix">View more</Link></span>
        </div>
        <RecipesCard slice={slice} userShow={userShow} />
      </div>
    </AppLayout>

  );
}

export default ExploreRecipes;
