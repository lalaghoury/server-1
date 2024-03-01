import React, { useEffect, useState, useCallback } from "react";
import "./RecipesCard.scss";
import { FireOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Rate } from "antd";
import WishlistButton from "./WishlistButton";
import { useFunctions } from "../../context/FunctionsSupply";

function RecipesCard({ slice, userShow, data, query }) {
  const { getAllRecipes } = useFunctions();
  const [allRecipes, setAllRecipes] = useState([]);
  const [cardRatings, setCardRatings] = useState({});
  const navigate = useNavigate();
  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const collectionName = searchParams.get('collection');

  const fetchRecipes = useCallback(async () => {
    try {
      let data = await getAllRecipes();
      if (collectionName) {
        data = data.filter(recipe => recipe.recipe_collection === collectionName);
      }
      setAllRecipes(data);
      const initialRatings = data.reduce((ratings, recipe) => {
        ratings[recipe._id] = recipe.recipe_ratings || 0;
        return ratings;
      }, {});
      setCardRatings(initialRatings);
    } catch (error) {
      console.error(error);
    }
  }, [getAllRecipes, collectionName]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const onAction = () => {
    fetchRecipes();
  }

  const highlightMatch = (title, query) => {
    if (!query) return title;
    const parts = title.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="highlight">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const handleRatingChange = useCallback((value, recipeId) => {
    if (Number.isInteger(value) && value >= 0 && value <= desc.length) {
      setCardRatings(prevRatings => ({ ...prevRatings, [recipeId]: value }));
    } else {
      console.error("Invalid rating value:", value);
    }
  }, [desc.length]);

  if (data) {
    return (
      <div className="card-wrapper">
        {
          data && data.map((recipe) => (
            <div className="card" key={recipe._id}>
              <div className="card-parent">
                <div className="card-parent-img" onClick={() => navigate(`/recipe/${recipe._id}`)}>
                  <img src={recipe.recipe_imageurl} alt={recipe.recipe_title} className="card-image" />
                </div>
                <WishlistButton saves={recipe.saves} recipeId={recipe._id} onAction={onAction} />
                <div className="card-rating">
                  <Rate
                    style={{ fontSize: 22, color: "#B55D51" }}
                    tooltips={desc}
                    onChange={(value) => handleRatingChange(value, recipe._id)}
                    value={cardRatings[recipe._id] || 0}
                  />
                </div>
              </div>
              <h3 className="font-16">
                <Link className="links-fix text-black" to={`/recipe/${recipe._id}`}>
                  {highlightMatch(recipe.recipe_title, query)}
                </Link>
              </h3>
              {userShow && <div className="card-user" >
                <span className="card-left">
                  <img src={recipe.user.userimage} alt={recipe.user.username} />
                  <h4><Link className="links-fix text-black" to={`/user/${recipe.user._id}`}>
                    <center>
                      {recipe.user.username.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                    </center>
                  </Link></h4>
                </span>
                <span className="card-right">
                  <FireOutlined style={{ color: "red" }} />
                  <h4>{recipe.firecount}</h4>
                </span>
              </div>}
            </div>
          ))
        }
      </div>)
  }

  return (
    <div className="card-wrapper">
      {slice && slice !== 0 ? (
        <>
          {allRecipes && allRecipes.slice(0, slice).map((recipe) => (
            <div className="card" key={recipe._id}>
              <div className="card-parent">
                <div className="card-parent-img" onClick={() => navigate(`/recipe/${recipe._id}`)}>
                  <img src={recipe.recipe_imageurl} alt={recipe.recipe_title} className="card-image" />
                </div>
                <WishlistButton saves={recipe.saves} recipeId={recipe._id} onAction={onAction} />
                <div className="card-rating">
                  <Rate
                    style={{ fontSize: 22, color: "#B55D51" }}
                    tooltips={desc}
                    onChange={(value) => handleRatingChange(value, recipe._id)}
                    value={cardRatings[recipe._id] || 0}
                  />
                </div>
              </div>
              <h3 className="font-16">
                <Link className="links-fix text-black" to={`/recipe/${recipe._id}`}>{recipe.recipe_title}</Link>
              </h3>
              {userShow && <div className="card-user" >
                <span className="card-left">
                  <img src={recipe.user.userimage} alt={recipe.user.username} />
                  <h4><Link className="links-fix text-black" to={`/user/${recipe.user._id}`}><center>{recipe.user.username.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</center>
                  </Link></h4>
                </span>
                <span className="card-right">
                  <FireOutlined style={{ color: "red" }} />
                  <h4>{recipe.firecount}</h4>
                </span>
              </div>}
            </div>
          ))}
        </>
      ) : (
        <>
          {allRecipes && allRecipes.map((recipe) => (
            <div className="card" key={recipe._id}>
              <div className="card-parent">
                <div className="card-parent-img" onClick={() => navigate(`/recipe/${recipe._id}`)}>
                  <img src={recipe.recipe_imageurl} alt={recipe.recipe_title} className="card-image" />
                </div>
                <WishlistButton saves={recipe.saves} recipeId={recipe._id} onAction={onAction} />
                <div className="card-rating">
                  <Rate
                    style={{ fontSize: 22, color: "#B55D51" }}
                    tooltips={desc}
                    onChange={(value) => handleRatingChange(value, recipe._id)}
                    value={cardRatings[recipe._id] || 0}
                  />
                </div>
              </div>
              <h3 className="font-16">
                <Link className="links-fix text-black" to={`/recipe/${recipe._id}`}>{recipe.recipe_title}</Link>
              </h3>
              {userShow && <div className="card-user" >
                <span className="card-left">
                  <img src={recipe.user.userimage} alt={recipe.user.username} />
                  <h4><Link className="links-fix text-black" to={`/user/${recipe.user._id}`}>
                    <center>
                      {recipe.user.username.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                    </center>
                  </Link></h4>
                </span>
                <span className="card-right">
                  <FireOutlined style={{ color: "red" }} />
                  <h4>{recipe.firecount}</h4>
                </span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default RecipesCard;

