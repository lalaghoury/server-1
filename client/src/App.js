import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import AllRecipesPage from "./Pages/AllRecipesPage/AllRecipesPage";
import Footer from "./components/Footer/Footer";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import AddRecipePage from "./Pages/AddRecipePage/AddRecipePage";
import { AddRecipeProvider } from "./context/AddRecipeContext";
import PageNotExists from "./Pages/PageNotExists/PageNotExists";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import { AccountProvider } from "./context/AccountContext";
import LogInPage from "./Pages/LogInPage/LogInPage";
import { FunctionSupplyProvider } from "./context/FunctionsSupply";
import UserProfilePage from "./Pages/UserProfilePage/UserProfilePage";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import AddBlog from "./components/AddBlog/AddBlog";
import MyRecipesPage from "./Pages/MyRecipesPage/MyRecipesPage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import BlogDetails from "./components/BlogDetails/BlogDetails";
import SavedRecipesPage from "./Pages/SavedRecipesPage/SavedRecipesPage";
import PrivateRoute from "./Routes/Private";
import { SinglePrivate } from "./Routes/SinglePrivate";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import EditBlog from "./components/EditBlog/EditBLog";
import ChangePasswordPage from "./Pages/ChangePasswordPage/ChangePasswordPage";
import AlreadyLoggedInRoute from "./Routes/AlreadyLoggedIn";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import CookiesPage from "./Pages/CookiesPage/CookiesPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage/PrivacyPolicyPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import MyCookbookPage from "./Pages/MyCookbookPage/MyCookbookPage";
import Layout from "antd/es/layout/layout";

function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
        <FunctionSupplyProvider>
          <AccountProvider>
            <AddRecipeProvider>
              <Layout style={{ backgroundColor: "white" }}>
                <Header />
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  {/* Private Routes */}
                  <Route
                    path="/add-recipe"
                    element={<PrivateRoute Component={AddRecipePage} />}
                  />
                  <Route
                    path="/user/:user_id"
                    element={<PrivateRoute Component={UserProfilePage} />}
                  />
                  <Route
                    path="/add-blog"
                    element={<PrivateRoute Component={AddBlog} />}
                  />
                  <Route
                    path="/my-recipes"
                    element={<PrivateRoute Component={MyRecipesPage} />}
                  />
                  <Route
                    path="/saved-recipes"
                    element={<PrivateRoute Component={SavedRecipesPage} />}
                  />
                  <Route
                    path="/blog/edit/:blog_id"
                    element={<SinglePrivate Component={EditBlog} type="blog" />}
                  />
                  <Route
                    path="/recipe/edit/:recipe_id"
                    element={
                      <SinglePrivate Component={EditRecipe} type="recipe" />
                    }
                  />
                  <Route path="/recipe" element={<AllRecipesPage />} />
                  <Route
                    path="/user/:user_id/change-password"
                    element={<PrivateRoute Component={ChangePasswordPage} />}
                  />
                  <Route path="/category" element={<CategoriesPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route
                    path="/recipe/:recipe_id"
                    element={<RecipeDetails />}
                  />
                  <Route
                    path="/category/:category_id"
                    element={<CategoryDetails />}
                  />
                  <Route path="/blog/:blog_id" element={<BlogDetails />} />
                  <Route
                    path="/login"
                    element={<AlreadyLoggedInRoute Component={LogInPage} />}
                  />
                  <Route
                    path="/signup"
                    element={<AlreadyLoggedInRoute Component={SignUpPage} />}
                  />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/cookies" element={<CookiesPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/user/cookbook" element={<MyCookbookPage />} />
                  <Route path="/user/recipe/" element={<AllRecipesPage />} />
                  <Route path="*" element={<PageNotExists />} />
                </Routes>
                <Footer />
              </Layout>
            </AddRecipeProvider>
          </AccountProvider>
        </FunctionSupplyProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
