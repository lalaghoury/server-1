import React from "react";
import "./NewRecipe.scss";
import AppLayout from "../../Layout/Layout";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function NewRecipe() {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="new-recipe">
        <div className="new-recipe-image">
          <img
            src="https://i.ibb.co/YW5F1FG/new-recipe.jpg"
            alt="new-recipe"
            border="0"
          />
        </div>
        <div className="new-recipe-text tac">
          <h1 className="text-black font-48">
            Share Your <span className="text-primary">Recipes</span>
          </h1>
          <p className="text-black font-24">
            Discover delicious and inspiring recipes from all over the world.
            Whether you're looking for vibrant salads, hearty soups, or decadent desserts,
            find the perfect dish to satisfy your cravings and bring joy to your table.
          </p>
          <Button
            className="disable-hover bold"
            onClick={() => navigate('/add-recipe')} style={{ width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 25 }}>
            Create New Recipe
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

export default NewRecipe;
