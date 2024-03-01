import React, { useEffect, useState } from "react";
import "./MyRecipesPage.scss";
import { useFunctions } from "../../context/FunctionsSupply";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Empty } from "antd";
import { useAuth } from "../../context/AuthContext";
import AppLayout from "../../Layout/Layout";
import RecipesCard from "../../components/RecipesCard/RecipesCard";

const MyRecipesPage = () => {
  const { getUser } = useFunctions();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    getUser(auth?.user._id)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [getUser, auth?.user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to view your recipes</div>;
  }

  return (
    <AppLayout>
      <div className="my-recipes-page">
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
                title: "My Recipes",
                href: "#",
                className: "bold",
              },
            ]}
          />
        </div>
        <h1>
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}'s
          Recipes
        </h1>

        <div>
          {user.recipes && user.recipes.length > 0 ? (
            <RecipesCard data={user.recipes} userShow={true} />
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
                  <Link to="/recipes">Browse recipes</Link>
                </Button>
                <Button className="disable-hover bold text-black">
                  <Link to={`/user/${user._id}`}>Go back to profile</Link>
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
};

export default MyRecipesPage;
