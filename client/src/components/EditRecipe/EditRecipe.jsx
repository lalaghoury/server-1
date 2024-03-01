import React, { useEffect, useState } from "react";
import "../RecipeForm/RecipeForm.scss";
import {
  Form,
  Input,
  Upload,
  Button,
  Select,
  Space,
  Checkbox,
  InputNumber,
  Flex,
  message,
  Modal,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useAddRecipe } from "../../context/AddRecipeContext";
import { useFunctions } from "../../context/FunctionsSupply";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

function EditRecipe() {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({});
  const { recipe_id } = useParams();
  const navigate = useNavigate();
  const {
    uploadButton,
    beforeUpload,
    handleUpload,
    recipe_imageurl,
    setRecipe_imageurl,
    showImage,
    setShowImage,
    form,
  } = useAddRecipe();
  const { getSingleRecipe } = useFunctions();
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      axios.get("/api/category/names").then((response) => {
        setCategories(response.data);
        console.log(response.data);
      });
      const recipe = await getSingleRecipe(recipe_id);
      setRecipe(recipe);
      setCategories(categories);
      setRecipe_imageurl(recipe.recipe_imageurl);
      setShowImage(true);
      setLoading(false);
      console.log(recipe);
    };
    fetchData();
  }, [getSingleRecipe, recipe_id]);

  if (loading || !recipe.recipe_title) {
    return <div>Loading...</div>;
  }

  const updateRecipe = async (values) => {
    try {
      if (
        JSON.stringify(recipe) === JSON.stringify(values) &&
        recipe.recipe_imageurl === recipe_imageurl
      ) {
        return message.warning("No changes to save", 2);
      }
      Modal.confirm({
        title: "Are you sure you want to update this recipe?",
        content: "If you proceed, the changes you have made will be saved.",
        onOk: async () => {
          const response = await axios.put(`/api/recipe/${recipe_id}`, {
            ...values,
            recipe_imageurl: recipe_imageurl,
          });
          if (response.data.success) {
            form.resetFields();
            message.success("Recipe Updated Successfully", 2);
            navigate(-1);
          }
        },
      });
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
  };

  const deleteRecipe = async () => {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this recipe?",
        content: "This action cannot be undone.",
        onOk: async () => {
          const response = await axios.delete(
            `https://mushy-jade-sundress.cyclic.app/recipe/${recipe_id}`
          );
          if (response.data.success) {
            console.log(
              `Recipe Deleted Successfull`,
              response.data.deletedRecipe
            );
            message.success("Recipe Deleted Successfully", 2);
            setRecipe_imageurl("");
            setShowImage(false);
            navigate(-2);
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRecipeDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this blog?",
      content: "Once deleted, the blog cannot be recovered.",
      onOk: () => {
        deleteRecipe();
      },
    });
  };

  return (
    <div>
      <Form
        form={form}
        scrollToFirstError={true}
        initialValues={{
          recipe_title: recipe.recipe_title,
          recipe_description: recipe.recipe_description,
          recipe_cooking_time: recipe.recipe_cooking_time,
          recipe_preptime: recipe.recipe_preptime,
          recipe_servings: recipe.recipe_servings,
          recipe_cuisine: recipe.recipe_cuisine,
          recipe_collection: recipe.recipe_collection,
          recipe_calories: recipe.recipe_calories,
          recipe_carbohydrates: recipe.recipe_carbohydrates,
          recipe_protiens: recipe.recipe_proteins,
          recipe_fats: recipe.recipe_fats,
          recipe_net_carbons: recipe.recipe_net_carbons,
          recipe_fiber: recipe.recipe_fiber,
          recipe_sodium: recipe.recipe_sodium,
          recipe_cholesterol: recipe.recipe_cholesterol,
          show_on_recipe_page: recipe.show_on_recipe_page,
          category: recipe.category._id,
          recipe_ingredients: recipe.recipe_ingredients.map(
            (ingredient, index) => ({
              ingredient: ingredient.ingredient,
              _id: ingredient._id,
            })
          ),
          recipe_instructions: recipe.recipe_instructions.map(
            (instruction, index) => ({
              instruction: instruction.instruction,
              _id: instruction._id,
            })
          ),
        }}
        onFinish={updateRecipe}
        layout="vertical"
        className="recipe-form"
        style={{
          maxWidth: 700,
        }}
      >
        {/*Input For Recipe Title */}
        <Form.Item
          label="Recipe Title:"
          name="recipe_title"
          className="recipe-title"
          rules={[
            { required: true, message: "Please input the Recipe Title!" },
          ]}
        >
          <Input
            placeholder="Enter Your Recipe name"
            className="antd-form-input"
          />
        </Form.Item>

        {/*Input For Recipe Image Upload */}
        <Form.Item label="Recipe Image" name="recipe_imageurl">
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            showUploadList={false}
          >
            {uploadButton}
          </Upload>
          {showImage ? (
            <div>
              <img
                src={recipe_imageurl}
                alt="avatar"
                style={{
                  height: "100px",
                  objectFit: "fill",
                }}
              />
            </div>
          ) : null}
        </Form.Item>

        {/*Input For Recipe Description */}
        <Form.Item
          label="Description:"
          name="recipe_description"
          rules={[
            { required: true, message: "Please input the Recipe Description!" },
          ]}
        >
          <Input.TextArea
            showCount
            maxLength={100}
            placeholder="Introduce your recipe"
            className="antd-form-input"
          />
        </Form.Item>

        {/* Input For Recipe Ingredients */}
        <Form.Item label="Ingredients">
          <Form.List name="recipe_ingredients">
            {(subFields, subOpt) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 16,
                }}
              >
                {subFields.map((subField) => (
                  <Space key={subField.key}>
                    <Form.Item noStyle name={[subField.name, "ingredient"]}>
                      <TextArea
                        placeholder="Write Ingredients"
                        autoSize={{ minRows: 0, maxRows: 100 }}
                      />
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => subOpt.add()}>
                  +
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>

        {/*Input For Recipe Instructions */}
        <Form.Item label="Instructions">
          <Form.List name="recipe_instructions">
            {(subFields, subOpt) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 16,
                }}
              >
                {subFields.map((subField) => (
                  <Space key={subField.key}>
                    <Form.Item noStyle name={[subField.name, "instruction"]}>
                      <TextArea
                        placeholder="Write Your Instructions"
                        autoSize={{ minRows: 0, maxRows: 100 }}
                      />
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => subOpt.add()}>
                  +
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>

        {/*Input For Recipe Servings*/}
        <Form.Item
          label="Servings:"
          name="recipe_servings"
          rules={[
            { required: true, message: "Please input the Recipe Serving!" },
          ]}
        >
          <InputNumber placeholder="#" className="antd-form-input" />
        </Form.Item>

        {/*Input For Recipe Cooking Time*/}
        <Form.Item
          label="Cooking Time:"
          name="recipe_cooking_time"
          className="cooking-time"
          rules={[
            {
              required: true,
              message: "Please input the Recipe Cooking time!",
            },
          ]}
        >
          <InputNumber
            placeholder="Hours 0"
            className="cooking-time-input antd-form-input"
          />
        </Form.Item>

        {/*Input For Recipe Prep Time*/}
        <Form.Item
          label="Prep Time:"
          name="recipe_preptime"
          className="prep-time"
          rules={[
            {
              required: true,
              message: "Please input the Recipe Preparation time!",
            },
          ]}
        >
          <InputNumber
            placeholder="Hours 0"
            className="prep-time-input antd-form-input"
          />
        </Form.Item>

        {/* Input For Recipe cuisine */}
        <Form.Item
          label="Cuisine:"
          name="recipe_cuisine"
          rules={[{ required: true, message: "Please select the cuisine!" }]}
        >
          <Select
            placeholder="Select Cuisine"
            style={{ width: 200 }}
            className="antd-form-input"
          >
            <Select.Option value="Thai">Thai</Select.Option>
            <Select.Option value="Chinese">Chinese</Select.Option>
            <Select.Option value="Italian">Italian</Select.Option>
          </Select>
        </Form.Item>

        {/* Input For Category */}
        <Form.Item
          label="Category:"
          name={"category"}
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select
            placeholder="Select Category"
            style={{ width: 200 }}
            className="antd-form-input"
          >
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.categoryname}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/*Input For Recipe Nutrition Facts*/}
        <div className="facts">
          {/*Input For Recipe Fats*/}
          <Form.Item
            label="Fats:"
            name="recipe_fats"
            rules={[{ required: true, message: "Please enter the Fats!" }]}
          >
            <InputNumber placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Proteins*/}
          <Form.Item
            label="Protiens:"
            name="recipe_protiens"
            rules={[{ required: true, message: "Please enter the Protiens!" }]}
          >
            <InputNumber placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Calories*/}
          <Form.Item
            label="Calories:"
            name="recipe_calories"
            rules={[{ required: true, message: "Please enter the Calories!" }]}
          >
            <InputNumber placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Carbohydrates*/}
          <Form.Item
            label="Carbohydrates:"
            name="recipe_carbohydrates"
            rules={[
              { required: true, message: "Please enter the Carbohydrates!" },
            ]}
          >
            <InputNumber placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Net-Carbs*/}
          <Form.Item
            label="Net-Carbs:"
            name="recipe_net_carbons"
            rules={[{ required: true, message: "Please enter the Net Carbs!" }]}
          >
            <InputNumber placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Fibers*/}
          <Form.Item
            label="Fibers:"
            name="recipe_fiber"
            rules={[{ required: true, message: "Please enter the Fibers!" }]}
          >
            <InputNumber placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Sodium*/}
          <Form.Item
            label="Sodium:"
            name="recipe_sodium"
            rules={[{ required: true, message: "Please enter the Sodium!" }]}
          >
            <InputNumber placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Cholesterol*/}
          <Form.Item
            label="Cholesterol:"
            name="recipe_cholesterol"
            rules={[
              { required: true, message: "Please enter the Cholesterol!" },
            ]}
          >
            <InputNumber placeholder="#" className="antd-form-input less" />
          </Form.Item>
        </div>

        {/*Input For Recipe Collection*/}
        <Form.Item
          label="Collection:"
          name="recipe_collection"
          rules={[
            { required: true, message: "Please select the Recipe Collection!" },
          ]}
        >
          <Select
            placeholder="Select Collection"
            style={{ width: 200 }}
            className="antd-form-input"
          >
            <Select.Option value="New Collection">New Collection</Select.Option>
            <Select.Option value="Cook Book">Cook Book</Select.Option>
            <Select.Option value="My Recipe">My Recipe</Select.Option>
          </Select>
        </Form.Item>

        {/*Input For Recipe Show or Not*/}
        <Form.Item
          name="show_on_recipe_page"
          valuePropName="checked"
          initialValue={true}
          className="show-on-recipe"
        >
          <Checkbox>Show on Recipe Page</Checkbox>
        </Form.Item>

        <Flex
          style={{ marginTop: "20px", justifyContent: "center", gap: "20px" }}
        >
          {/* Update Button */}
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button
              className="bg-primary text-white bold disable-hover"
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>

          {/* Delete Button */}
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button
              onClick={() => handleRecipeDelete()}
              className="bg-primary text-white bold disable-hover"
            >
              Delete
            </Button>
          </Form.Item>

          {/* Cancel Button */}
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button
              className="bg-primary text-white bold disable-hover"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
}

export default EditRecipe;
