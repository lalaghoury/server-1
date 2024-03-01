import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchPage.scss';
import RecipesCard from '../../components/RecipesCard/RecipesCard';
import { useFunctions } from '../../context/FunctionsSupply';
import AppLayout from '../../Layout/Layout';

const SearchPage = () => {
    const [allRecipes, setAllRecipes] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { getAllRecipes } = useFunctions();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');

    const fetchRecipes = useCallback(async () => {
        try {
            setLoading(true);
            let data = await getAllRecipes();
            if (searchQuery) {
                data = filterRecipes(data, searchQuery);
            }
            setAllRecipes(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, [getAllRecipes, searchQuery]);

    useEffect(() => {
        fetchRecipes();
    }, [location.search, fetchRecipes]);

    const filterRecipes = (recipes, query) => {
        const lowerCaseQuery = query.toLowerCase();
        return recipes.filter(recipe =>
            recipe.recipe_title.toLowerCase().includes(lowerCaseQuery) ||
            recipe.recipe_description.toLowerCase().includes(lowerCaseQuery)
        );
    };

    if (loading) return <div>Loading...</div>


    return (
        <AppLayout>
            <div className="search-page">
                <h2>Search Results for: {searchQuery}</h2>
                <div className="recipes-container">
                    <RecipesCard userShow={true} data={allRecipes} query={searchQuery} />
                </div>
            </div>
        </AppLayout>
    );
};

export default SearchPage;

