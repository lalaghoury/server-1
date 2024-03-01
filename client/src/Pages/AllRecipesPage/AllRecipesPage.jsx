import React from "react";
import Recipes from "../../components/Recipes/Recipes";
import AppLayout from "../../Layout/Layout";


function AllRecipesPage() {
  return (
    <AppLayout>
      <div className="all-recipes-page">
        <Recipes slice={0} userShow={true} />
      </div>
    </AppLayout>
  );
}

export default AllRecipesPage;
