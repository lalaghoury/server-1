import React, { useEffect, useState } from "react";
import "./RecipeForm.scss";
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
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useAddRecipe } from "../../context/AddRecipeContext";
import { useFunctions } from "../../context/FunctionsSupply";
import { useNavigate } from "react-router-dom";

function RecipeForm() {
  const {
    onFinish,
    uploadButton,
    beforeUpload,
    handleUpload,
    recipe_imageurl,
    showImage,
    setShowImage,
    form,
    isSubmitting,
  } = useAddRecipe();
  const navigate = useNavigate();
  const handleCancel = () => {
    form.resetFields();
    setShowImage(false);
    navigate(-1);
  };
  const { getAllCategories } = useFunctions();
  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, [getAllCategories]);

  const [items] = useState(["New Collection", "My Recipes", "My Cookbook"]);
  return (
    <div>
      <Form
        form={form}
        scrollToFirstError={true}
        initialValues={{
          recipe_cooking_time: 0,
          recipe_preptime: 0,
          recipe_servings: "#",
          recipe_cuisine: "Select Cuisine",
          recipe_collection: "Select Collection",
        }}
        onFinish={onFinish}
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
        <Form.Item
          label="Upload Image"
          name="recipe_imageurl"
          rules={[{ required: true, message: "Please add the Recipe Image!" }]}
        >
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
                      <Input placeholder="Write Ingredients" />
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
                      <Input placeholder="Write Instructions" />
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
            style={{ width: 300 }}
            className="antd-form-input"
            options={items.map((collection) => ({
              label: collection,
              value: collection,
            }))}
          />
          {/* </Select> */}
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

        <Flex style={{ marginTop: "20px", justifyContent: "center" }}>
          {/* Submit Button */}
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button
              className="text-white bold bg-primary cursor disable-hover"
              htmlType="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Recipe"}
            </Button>
          </Form.Item>

          {/* Cancel Button */}
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button
              style={{ marginRight: "50px" }}
              className="bg-primary text-white bold disable-hover"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
}

export default RecipeForm;
