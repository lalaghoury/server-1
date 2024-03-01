import React from 'react'
import './CookiesPage.scss'

import { Typography } from 'antd';
import AppLayout from '../../Layout/Layout';

const { Title, Paragraph } = Typography;
const CookiesPage = () => {

    return (
        <AppLayout>
            <div className="cookies-page">
                <Title level={1}>Cookies Policy</Title>
                <Paragraph>
                    Our website uses cookies to improve your experience. By continuing to use our website, you agree to their use.
                </Paragraph>
            </div>
        </AppLayout>

    );
}

export default CookiesPage
