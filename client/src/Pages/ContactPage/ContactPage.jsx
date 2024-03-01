import React from 'react'
import AppLayout from '../../Layout/Layout';
import './ContactPage.scss'
import { Card, Typography } from 'antd';
const { Title, Paragraph } = Typography;

const ContactPage = () => {
    return (
        <AppLayout>
            <div className="contact-page">
                <Card className="contact-card" bordered={false}>
                    <Title level={2}>Get in Touch</Title>
                    <Paragraph>
                        We're happy to hear from you! Whether you have a question about our services,
                        pricing, need a demo, or anything else, our team is ready to answer all your questions.
                    </Paragraph>
                    <div className="contact-info">
                        <Title level={4}>Our Office</Title>
                        <Paragraph>
                            123 Business Avenue, Suite 456<br />
                            City Name, Country 78910
                        </Paragraph>
                        <Title level={4}>Email Us</Title>
                        <Paragraph>
                            support@example.com
                        </Paragraph>
                        <Title level={4}>Call Us</Title>
                        <Paragraph>
                            +1 (123) 456-7890
                        </Paragraph>
                    </div>
                </Card>
            </div>
        </AppLayout>

    );
}

export default ContactPage
