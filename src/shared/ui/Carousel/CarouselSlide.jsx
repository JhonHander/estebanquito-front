import React from 'react';
import { NavLink } from 'react-router-dom';

function CarouselSlide({ title, description, buttonText, buttonLink, image }) {
    return (
        <div className="carousel-interface">
            <div className="left-content">
                <h2>{title}</h2>
                <p>{description}</p>
                <NavLink to={buttonLink} className="carousel-button">
                    {buttonText}
                </NavLink>
            </div>
            <div className="right-content">
                <img src={image} alt={title} className="carousel-image" />
            </div>
        </div>
    );
}

export default CarouselSlide;
