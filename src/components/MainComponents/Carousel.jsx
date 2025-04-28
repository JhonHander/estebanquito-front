import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CarouselInterface from "./CarouselInterface";
import { getToken } from '../requests/jwtManage';
import "./Carousel.css";
import reportesBoton from '../../assets/imagen-interfaz-2.png'
import { FaCircleChevronRight } from "react-icons/fa";
import { FaCircleChevronLeft } from "react-icons/fa";
import transferirBoton from '../../assets/imagen-interfaz-1.png'
import prestamoBoton from '../../assets/imagen-interfaz-3-prueba.png'

const interfaces = [
    {
        title: "Mantente al tanto",
        description: "Revisa las estadísticas de tu cuenta para tomar mejores decisiones",
        buttonText: "Ir a reportes",
        buttonLink: "/reportes/total-ingresos",
        image: reportesBoton,
    },
    {
        title: "Donde y cuando quieras",
        description: "Puedes pasar dinero a tus seres queridos totalmente gratis",
        buttonText: "Transferir dinero",
        buttonLink: "/transacciones/transferir-dinero",
        image: transferirBoton,
    },
    {
        title: "Te brindamos un impulso",
        description: "Solicita prestamos que se adapten a tus necesidades",
        buttonText: "Solicitar préstamo",
        buttonLink: "/prestamos/solicitar-prestamo",
        image: prestamoBoton,
    },
];

function Carousel() {

    const navigate = useNavigate();
    useEffect(() => {
        if (!getToken()) {
            navigate('/login');
        }
    }, [navigate]);

    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(currentIndex);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? interfaces.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === interfaces.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="carousel-container">
            <button 
                className="arrow left-arrow"
                data-testid="prev-button"
                onClick={prevSlide}
            >
                <FaCircleChevronLeft />
            </button>
            <div className="carousel-interface">
                <CarouselInterface {...interfaces[currentIndex]} />
            </div>
            <button 
                className="arrow right-arrow"
                data-testid="next-button"
                onClick={nextSlide}
            >
                <FaCircleChevronRight />
            </button>
        </div>
    );
}

export default Carousel;