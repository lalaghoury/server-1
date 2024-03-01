import React from 'react';
import { Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import './MyCookbookPage.scss';
import AppLayout from '../../Layout/Layout';

const MyCookbookPage = () => {
    const navigate = useNavigate();

    const handleCardClick = (collectionName) => {
        navigate(`/user/recipe?collection=${collectionName}`);
    };

    return (
        <AppLayout>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Card
                            title="My Recipes"
                            bordered={false}
                            onClick={() => handleCardClick('My Recipes')}
                            className="responsive-card"
                        >
                            Your personal recipe collection.
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Card
                            title="My Cookbook"
                            bordered={false}
                            onClick={() => handleCardClick('My Cookbook')}
                            className="responsive-card"
                        >
                            Your saved cookbooks.
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Card
                            title="New Collection"
                            bordered={false}
                            onClick={() => handleCardClick('New Collection')}
                            className="responsive-card"
                        >
                            Start a new recipe collection.
                        </Card>
                    </Col>
                </Row>
            </div>
        </AppLayout>
    );
};

export default MyCookbookPage;

