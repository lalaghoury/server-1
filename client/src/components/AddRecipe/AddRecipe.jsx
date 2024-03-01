import React from "react";
import { Row, Col } from 'antd';
import "./AddRecipe.scss";
import { Link } from "react-router-dom";
import RecipeForm from "../RecipeForm/RecipeForm";
import AppLayout from "../../Layout/Layout";

function AddRecipe() {
  return (
    <AppLayout>
      <Row justify="center" className="add-recipe-row">
        <Col xs={24} sm={24} md={16} lg={12} xl={20}>
          <div className="add-recipe">
            <div className="add-heading">
              <h1>Create new recipe</h1>
              <Link to="/test" className="btn bg-primary text-white links-fix">
                Next
              </Link>
            </div>
            <div className="add-form">
              <RecipeForm />
            </div>
          </div>
        </Col>
      </Row>
    </AppLayout>
  );
}

export default AddRecipe;

