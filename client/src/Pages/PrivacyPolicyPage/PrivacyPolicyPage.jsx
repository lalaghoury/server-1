import React from 'react'
import './PrivacyPolicyPage.scss'
import { Typography, Divider } from 'antd';
import AppLayout from '../../Layout/Layout';
const { Title, Paragraph } = Typography;

const PrivacyPolicyPage = () => {
    return (
        <AppLayout>
            <div className="privacy-policy-page">
                <Typography>
                    <Title>Privacy Policy</Title>
                    <Paragraph>
                        Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
                    </Paragraph>
                    <Divider />
                    <Title level={2}>Information We Collect</Title>
                    <Paragraph>
                        We may collect information about you when you interact with our site. This could include your IP address, your browser type, and your activities on our site. We collect this information to improve our website and to better understand how people use our site.
                    </Paragraph>
                    <Divider />
                    <Title level={2}>Use of Information</Title>
                    <Paragraph>
                        We use information collected to provide you with a better experience on our website. This could include displaying content based upon your preferences. We may also use your information to communicate with you about updates, services, and promotional offers if you have opted to receive such communications.
                    </Paragraph>
                    <Divider />
                    <Title level={2}>Data Security</Title>
                    <Paragraph>
                        We take the security of your personal information seriously and use reasonable electronic, personnel, and physical measures to protect it from loss, theft, alteration, or misuse. However, please be advised that even the best security measures cannot fully eliminate all risks.
                    </Paragraph>
                    <Divider />
                    <Title level={2}>Amendments</Title>
                    <Paragraph>
                        We may update this policy from time to time by publishing a new version on our website. You should check this page occasionally to ensure you are happy with any changes to this policy.
                    </Paragraph>
                    <Divider />
                    <Title level={2}>Contacting Us</Title>
                    <Paragraph>
                        If you have any questions about our privacy policy, please contact us.
                    </Paragraph>
                </Typography>
            </div>
        </AppLayout>
    );
}

export default PrivacyPolicyPage
