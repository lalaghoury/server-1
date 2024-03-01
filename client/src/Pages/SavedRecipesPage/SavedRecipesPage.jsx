import React, { useCallback, useEffect, useState } from "react";
import "./SavedRecipesPage.scss";
import { useFunctions } from "../../context/FunctionsSupply";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Empty } from "antd";
import { useAuth } from "../../context/AuthContext";
import AppLayout from "../../Layout/Layout";
import RecipesCard from "../../components/RecipesCard/RecipesCard";

function SavedRecipesPage() {
  const { getAllRecipes } = useFunctions();
  const [allRecipes, setAllRecipes] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllRecipes();
      const savedRecipes = data.filter((recipe) =>
        recipe.saves.includes(auth.user._id)
      );
      setAllRecipes(savedRecipes);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [getAllRecipes, auth.user._id]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (loading) return <div>Loading...</div>;

  return (
    <AppLayout>
      <div className="saved-recipes-page">
        <div className="breadcrumb">
          <Breadcrumb
            separator=">"
            items={[
              {
                title: "Home",
                href: "/",
                className: "bold",
              },
              {
                title: "Saved Recipes",
                href: "#",
                className: "bold",
              },
            ]}
          />
        </div>
        <div>
          <h1>Saved Recipes</h1>
        </div>
        <div className="card-wrapper">
          {allRecipes && allRecipes.length > 0 ? (
            <RecipesCard data={allRecipes} showUser={true} />
          ) : (
            <div
              className="empty-recipes-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                margin: "0 auto",
                width: "100%",
              }}
            >
              <Empty description={<span>No recipes to display</span>} />
              <div
                className="empty-recipes-actions"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <Button className="disable-hover bold text-black">
                  <Link to="/recipe">Browse recipes</Link>
                </Button>
                <Button className="disable-hover bold text-black">
                  <Link to={`/user/${auth.user._id}`}>Go back to profile</Link>
                </Button>
                <Button type="dashed" className="disable-hover bold text-black">
                  <Link to={`/add-recipe`}>Add Your Recipe Now!</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default SavedRecipesPage;
