import React, { useEffect, useState } from 'react'
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Spinner.scss'
import AppLayout from '../../Layout/Layout';

function Spinner() {
    const navigate = useNavigate()
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            navigate('/login', { replace: true });
        }
    }, [count, navigate]);
    return (
        <AppLayout>
            <div className='spin'>
                <h2>Access Denied, Kindly Login to continue <br /> Redirecting you to Login page in {count} seconds</h2>
                <Spin />
            </div>
        </AppLayout>

    )
}

export default Spinner
