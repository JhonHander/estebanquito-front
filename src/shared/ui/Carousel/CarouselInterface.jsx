import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import CarouselSlide from './CarouselSlide';
import { ROUTES } from '@shared/config/constants';
import reportesBoton from '@assets/imagen-interfaz-2.png';
import transferirBoton from '@assets/imagen-interfaz-1.png';
import prestamoBoton from '@assets/imagen-interfaz-3-prueba.png';
import './Carousel.css';

const slides = [
    {
        title: 'Mantente al tanto',
        description: 'Revisa las estadísticas de tu cuenta para tomar mejores decisiones',
        buttonText: 'Ir a reportes',
        buttonLink: ROUTES.REPORTS.INCOME,
        image: reportesBoton,
    },
    {
        title: 'Donde y cuando quieras',
        description: 'Puedes pasar dinero a tus seres queridos totalmente gratis',
        buttonText: 'Transferir dinero',
        buttonLink: ROUTES.TRANSACTIONS.TRANSFER,
        image: transferirBoton,
    },
    {
        title: 'Te brindamos un impulso',
        description: 'Solicita préstamos que se adapten a tus necesidades',
        buttonText: 'Solicitar préstamo',
        buttonLink: ROUTES.LOANS.REQUEST,
        image: prestamoBoton,
    },
];

function CarouselInterface() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="carousel-container">
            <button className="arrow left-arrow" onClick={prevSlide}>
                <FaArrowAltCircleLeft />
            </button>
            <CarouselSlide {...slides[currentIndex]} />
            <button className="arrow right-arrow" onClick={nextSlide}>
                <FaArrowAltCircleRight />
            </button>
        </div>
    );
}

export default CarouselInterface;
