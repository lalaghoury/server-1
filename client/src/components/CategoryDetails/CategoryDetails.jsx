import React, { useEffect, useState, useCallback } from "react";
import "./CategoryDetails.scss";
import { Link, useParams } from "react-router-dom";
import { useFunctions } from "../../context/FunctionsSupply";
import RecipesCard from "../RecipesCard/RecipesCard";
import { Breadcrumb, Button, Divider, Empty, Select } from "antd";
import AppLayout from "../../Layout/Layout";

function CategoryDetails() {
  const { category_id } = useParams();
  const { getSingleCategory, getAllCategories } = useFunctions();
  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllCategories();
      setAllCategories(res);
      const singleCategory = await getSingleCategory(category_id);
      setCategory(singleCategory);
    } catch (error) {
      console.error("Failed to fetch category:", error);
    } finally {
      setLoading(false);
    }
  }, [category_id, getSingleCategory, getAllCategories]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  if (loading) return <h1>Loading...</h1>;

  if (!category) return <h1>Category not found</h1>;

  return (
    <AppLayout>
      <div className="category-details">
        <div className="breadcrumb">
          <Breadcrumb
            className="breadcrumb"
            separator=">"
            items={[
              {
                title: "Home",
                href: "/",
                className: "bold",
              },
              {
                title: "Categories",
                href: "/category",
                className: "bold",
              },
              {
                title: category.categoryname,
                href: `/category/${category._id}`,
                className: "bold",
              },
            ]}
          />
        </div>
        <div className="category-details-heading">
          <h1 className="text-black font-48">{category.categoryname}</h1>
          <span className="bold">
            Category:
            <Select
              className="dropdown antd-form-input"
              value={category_id}
              placeholder="Relevance"
              style={{ width: 200, color: "#b55d51f7" }}
            >
              {allCategories.map((category) => (
                <Select.Option
                  className="dropdown"
                  key={category._id}
                  value={category._id}
                >
                  <Link
                    className="links-fix text-primary disable-hover-anchor"
                    to={`/category/${category._id}`}
                  >
                    {category.categoryname}
                  </Link>
                </Select.Option>
              ))}
            </Select>
          </span>
        </div>
        <Divider />
        <div className="category-display">
          <div className="card-wrapper">
            {category && category.recipes && category.recipes.length > 0 ? (
              <RecipesCard data={category.recipes} userShow={true} />
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
                  {/* <Button className="disable-hover bold text-black">
                    <Link to={`/user/${auth.user._id}`}>
                      Go back to profile
                    </Link>
                  </Button> */}
                  <Button
                    type="dashed"
                    className="disable-hover bold text-black"
                  >
                    <Link to={`/add-recipe`}>Add Your Recipe Now!</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default CategoryDetails;
