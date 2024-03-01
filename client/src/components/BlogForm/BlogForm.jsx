import React, { useEffect, useState } from 'react';
import './BlogForm.scss';
import { Button, Form, Input, Select, Upload, Image } from 'antd';
import { useAddRecipe } from '../../context/AddRecipeContext';
import { useFunctions } from '../../context/FunctionsSupply';

const { Option } = Select;

function BlogForm() {
    const {
        onFinishBlog,
        uploadButton,
        beforeUpload,
        handleUpload,
        recipe_imageurl,
        showImage,
        setShowImage,
        form,
    } = useAddRecipe();

    const { getAllCategories } = useFunctions();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getAllCategories();
            setCategories(categories);
        };
        fetchCategories();
    }, [getAllCategories]);

    const handleCancel = () => {
        form.resetFields();
        setShowImage(false);
    };

    return (
        <div>
            <Form
                form={form}
                scrollToFirstError={true}
                onFinish={onFinishBlog}
                layout="vertical"
                className="recipe-form"
                style={{
                    maxWidth: 700,
                    margin: '0 auto',
                    padding: '0 20px',
                }}
            >
                {/* Input For Blog Title */}
                <Form.Item
                    label="Blog Title:"
                    name="title"
                    className="recipe-title"
                    rules={[{ required: true, message: 'Please input the Blog Title!' }]}
                >
                    <Input placeholder="Enter Your Blog Name" className="antd-form-input" />
                </Form.Item>

                {/* Input For Blog Image Upload */}
                <Form.Item
                    label="Blog Image"
                    name="image"
                    rules={[{ required: true, message: 'Please Upload the Blog Image!' }]}
                >
                    <Upload beforeUpload={beforeUpload} onChange={handleUpload} showUploadList={false}>
                        {uploadButton}
                    </Upload>
                    {showImage && <Image src={recipe_imageurl} alt="avatar" style={{ height: '100px', objectFit: 'fill' }} />}
                </Form.Item>

                {/* Input For Blog Slogan */}
                <Form.Item
                    label="Blog Slogan:"
                    name="slogan"
                    className="recipe-title"
                    rules={[{ required: true, message: 'Please input the Blog Slogan!' }]}
                >
                    <Input placeholder="Enter Your Blog Slogan" className="antd-form-input" />
                </Form.Item>

                {/* Input For Category */}
                <Form.Item label="Category:" name="category" rules={[{ required: true, message: 'Please select the category!' }]}>
                    <Select placeholder="Select Category" className="antd-form-input">
                        {categories.map((category) => (
                            <Option key={category._id} value={category._id}>
                                {category.categoryname}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Input For Blog Description */}
                <Form.Item
                    label="Blog Description:"
                    name="description"
                    rules={[{ required: true, message: 'Please input the Blog Description!' }]}
                >
                    <Input.TextArea showCount maxLength={100} placeholder="Introduce your Blog" className="antd-form-input" />
                </Form.Item>

                {/* Input For Blog Content */}
                <Form.Item
                    label="Blog Content:"
                    name="content"
                    rules={[{ required: true, message: 'Please input the Blog Content!' }]}
                >
                    <Input.TextArea showCount placeholder="Introduce your Blog" className="antd-form-input" />
                </Form.Item>

                {/* Form Actions */}
                <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                    <Button className="bg-primary text-white bold disable-hover" htmlType="submit">
                        Submit
                    </Button>
                    <Button style={{ marginLeft: '20px' }} className="bg-primary text-white bold disable-hover" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default BlogForm;
