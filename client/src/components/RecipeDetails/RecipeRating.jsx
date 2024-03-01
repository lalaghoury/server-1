import { Rate } from 'antd'
import React from 'react'

function RecipeRating({ rating }) {
    return (
        <div>
            <Rate style={{ fontSize: 22, color: "#B55D51" }} defaultValue={rating} disabled />
        </div>
    )
}

export default RecipeRating