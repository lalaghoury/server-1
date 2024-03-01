import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.scss'

function Logo() {
    return (
        <Link to="/" className="logo links-fix">
            <div className="logo" >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="34"
                    viewBox="0 0 33 34"
                    fill="none"
                >
                    <path
                        d="M6.01582 29.375L4.09082 27.45L18.1846 13.3562C17.7721 12.3938 17.7148 11.3052 18.0127 10.0906C18.3106 8.87604 18.9637 7.7875 19.9721 6.825C21.1867 5.61042 22.5387 4.9 24.0283 4.69375C25.5179 4.4875 26.7325 4.85417 27.6721 5.79375C28.6117 6.73333 28.9783 7.94792 28.7721 9.4375C28.5658 10.9271 27.8554 12.2792 26.6408 13.4938C25.6783 14.5021 24.5898 15.1552 23.3752 15.4531C22.1606 15.751 21.0721 15.6938 20.1096 15.2812L18.3908 17L28.8408 27.45L26.9158 29.375L16.4658 18.9938L6.01582 29.375ZM10.0721 17.6188L5.94707 13.4938C4.70957 12.2563 4.09082 10.7781 4.09082 9.05938C4.09082 7.34063 4.70957 5.8625 5.94707 4.625L14.4721 13.2188L10.0721 17.6188Z"
                        fill="black"
                    />
                </svg>
                <span className="text-black font-32">Perfect</span>
                <span className="text-primary font-32">Recipe</span>
            </div>
        </Link>
    )
}

export default Logo