import React from 'react';
import { Row, Col } from 'antd';
import './AddBlog.scss';
import { Link } from 'react-router-dom';
import BlogForm from '../BlogForm/BlogForm';
import AppLayout from '../../Layout/Layout';
import { LeftOutlined } from '@ant-design/icons';

function AddBlog() {
    return (
        <AppLayout>
            <Row justify="center">
                <Col xs={24} sm={24} md={16} lg={12} xl={24}>
                    <div className="add-blog">
                        <div className="add-blog-heading">
                            <h1>Create new Blog</h1>
                            <Link to="/blog" className="btn bg-primary text-white links-fix">
                                <LeftOutlined />
                                <span>Back to Blog</span>
                            </Link>
                        </div>
                        <div className="add-blog-form">
                            <BlogForm />
                        </div>
                    </div>
                </Col>
            </Row>
        </AppLayout>
    );
}

export default AddBlog;
