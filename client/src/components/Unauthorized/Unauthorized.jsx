import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Unauthorized.scss'
import AppLayout from '../../Layout/Layout'

function Unauthorized({ used }) {
    const navigate = useNavigate()
    return (
        <AppLayout>
            <div className='unauthorized'>
                <h1>Unauthorized - You are not the author of this {used}.</h1>
                <Button className='disable-hover text-black bold' onClick={() => navigate(-1)}>Go Back!</Button>
            </div>
        </AppLayout>
    )
}

export default Unauthorized
