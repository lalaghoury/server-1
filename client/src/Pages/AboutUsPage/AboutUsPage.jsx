import React from 'react'
import './AboutUsPage.scss'
import { Card, Col, Row } from 'antd';
import AppLayout from '../../Layout/Layout';

const AboutUsPage = () => {

    return (
        <AppLayout>
            <div className="about-us-page">
                <Row gutter={[16, 16]} justify="space-between">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card title="About Foodie" bordered={false}>
                            <p>Foodie brings you the best in food blogging, with delicious recipes, incredible cooking techniques, and interesting food facts.</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card title="Our Mission" bordered={false}>
                            <p>We aim to share our passion for all things culinary, from the simplest home cooking to the most sophisticated gastronomic experiences.</p>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} justify="space-between">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card title="Join Us" bordered={false}>
                            <p>Become a part of our food enthusiast community and share your own recipes and experiences.</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card title="Discover" bordered={false}>
                            <p>Explore new flavors and cuisines from around the world with our curated selection of recipes and articles.</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </AppLayout>

    )
}

export default AboutUsPage
