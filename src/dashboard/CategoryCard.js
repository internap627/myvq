import React from 'react'
import icons from "../images/icons"
import "./CategoryCard.css"

export default function CategoryCard({vendor}) {
    return (
        <div className="cat-card">
            <div className="sec1">
                <img src={icons[vendor.category]} alt="icon"/>
            </div>
            <div className="sec2">
                <h6>
                {vendor.businessName}
                </h6>
                <p>
                    {`${vendor.street}, ${vendor.parish}`}
                </p>
                <p>
                    Number of people in line:
                </p>
            </div>
            <div className="sec3">
                <h6>
                    WT:
                </h6>
                <div className="z-depth-2">
                    Line Up
                </div>
            </div>
            
        </div>
    )
}
