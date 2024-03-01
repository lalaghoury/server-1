import React, { useEffect, useState } from "react";
import "./RecipeDetails.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import RecipeRating from "./RecipeRating";
import { Breadcrumb, Button, Card, Flex } from "antd";
import { CalendarOutlined, CommentOutlined, EditOutlined, HeartOutlined } from "@ant-design/icons";
import { useFunctions } from "../../context/FunctionsSupply";
import CommentsSection from "../CommentsSection/CommentsSection";
import { useAuth } from "../../context/AuthContext";
import AppLayout from "../../Layout/Layout";

const RecipeDetails = () => {
    const { getAllRecipes } = useFunctions();
    const { recipe_id } = useParams();
    const [allRecipes, setAllRecipes] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getAllRecipes();
                setAllRecipes(data);
                const foundRecipe = data.find((recipe) => recipe._id === recipe_id);
                setRecipe(foundRecipe);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [recipe_id, getAllRecipes]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!recipe) {
        return <div>Recipe not found.</div>;
    }

    return (
        <AppLayout>
            <div className="recipe-details">
                <div className="recipe-details-head">
                    <div className="breadcrumb">
                        <Breadcrumb
                            separator=">"
                            items={[
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
                                {
                                    title: recipe.recipe_title,
                                    href: `/recipe/${recipe._id}`,
                                    className: 'bold',
                                }
                            ]}
                        />
                    </div>
                    <div className="recipe-details-heading">
                        <h1>{recipe.recipe_title}</h1>
                    </div>
                    <div className="recipe-details-user">
                        <span className="recipe-details-user-card">
                            <img src={recipe.user.userimage} alt="userimage" style={{ marginRight: 10, width: 40, borderRadius: '50%' }} />
                            <h4>
                                <Link className="links-fix text-black" to={`/user/${recipe.user._id}`}>{recipe.user.username}</Link>
                            </h4>
                        </span>
                        <span className="recipe-details-user-card"> <CalendarOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} /> {recipe.dateField}</span>
                        <span className="recipe-details-user-card"> <CommentOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} />
                            {recipe.comments.length === 0 ? 0 : recipe.comments.length} Comments
                        </span>
                        <span className="recipe-details-user-card"> <HeartOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} />
                            {recipe.saves.length} Saves
                        </span>
                        <span className="recipe-details-user-card">
                            <Flex gap="middle" vertical>
                                <RecipeRating rating={recipe.recipe_ratings} />
                            </Flex>
                            <h5> &nbsp; {recipe.recipe_ratings} / 5 Reviews</h5>
                        </span>
                        <span className="recipe-details-user-card">
                            {recipe.user._id === auth?.user?._id && <div className='edit-button'>
                                <Button className="disable-hover bold"
                                    style={{ margin: 0 }}
                                    onClick={() => navigate(`/recipe/edit/${recipe._id}`)}>
                                    <EditOutlined style={{ padding: 0 }} />Edit
                                </Button>
                            </div>}
                        </span>
                    </div>
                    <hr />
                </div>
                <div className="recipe-details-body">
                    <div className="body-left">
                        <div className="body-left-image">
                            <img src={recipe.recipe_imageurl} alt={recipe.name} />
                            <p>{recipe.blogslogan}</p>
                        </div>
                        <div className="body-left-text">
                            <div className="body-left-text-first">
                                <span>
                                    <span>Prep Time</span>
                                    <h4>{recipe.recipe_preptime} min(s)</h4>
                                </span><span>
                                    <span>Serving</span>
                                    <h4>{recipe.recipe_cooking_time} min(s)</h4>
                                </span>
                                <span>
                                    <span>Serving</span>
                                    <h4>{recipe.recipe_servings} Serving(s)</h4>
                                </span>
                                <span><Button className="disable-hover" type="primary">Print Recipe</Button></span>
                            </div>
                            <div className="body-left-text-second">
                                <p>{recipe.recipe_description}</p>
                            </div>
                            <div className="body-left-text-third">
                                <h3>Ingredients</h3>
                                <ul>
                                    {recipe.recipe_ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient.ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="body-left-text-fourth">
                                <h3>Instructions</h3>
                                <ol>
                                    {recipe.recipe_instructions.map((instruction, index) => (
                                        <li key={index}>{instruction.instruction}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="recipe-comments">
                            {
                                auth?.user ? <CommentsSection Id={recipe_id} used={"Recipe"} /> :
                                    <div className="tac">Please login to comment <Button className="disable-hover" type="primary" onClick={() => navigate('/login')}>Login</Button></div>
                            }
                        </div>
                    </div>
                    <div className="body-right">
                        <div className="body-right-facts">
                            <h1>Nutrition Facts</h1>
                            <span><span>Calories</span> {recipe.recipe_calories} mg</span> <hr />
                            <span><span>Carbs</span> {recipe.recipe_carbohydrates} mg</span> <hr />
                            <span><span>Fats </span>{recipe.recipe_fats} mg</span> <hr />
                            <span><span>Protien </span>{recipe.recipe_proteins} mg</span> <hr />
                            <span><span>Fiber</span> {recipe.recipe_fiber} mg</span> <hr />
                            <span><span>Net Carb </span>{recipe.recipe_net_carbons} mg</span> <hr />
                            <span><span>Sodium </span>{recipe.recipe_sodium} mg</span> <hr />
                            <span><span>Cholestrol </span>{recipe.recipe_cholesterol} mg</span> <hr />
                        </div>
                        <div className="body-right-recent-recipes">
                            <h2>Recent Recipes</h2>
                            <div>
                                {allRecipes && allRecipes.slice(0, 3).map((recipe) => (

                                    <Card
                                        hoverable
                                        style={{ width: 200, marginBottom: 10 }}
                                        cover={<img alt={recipe.recipe_title} src={recipe.recipe_imageurl} />}
                                        key={recipe._id}
                                    >
                                        <center><strong style={{ marginBottom: 5 }}>{recipe.recipe_title}</strong></center>
                                        <a href={`/recipe/${recipe._id}`} className="links-fix text-black"> <Button className="disable-hover" type="primary" block >
                                            View Recipe
                                        </Button></a>
                                    </Card>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default RecipeDetails;
