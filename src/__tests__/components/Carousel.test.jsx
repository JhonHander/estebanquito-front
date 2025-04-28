import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Carousel from '../../components/MainComponents/Carousel';
import CarouselInterface from '../../components/MainComponents/CarouselInterface';
import * as jwtManage from '../../components/requests/jwtManage';
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa";

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

// Mock getToken function
jest.mock('../../components/requests/jwtManage', () => ({
    getToken: jest.fn()
}));

// Mock react-icons
jest.mock('react-icons/fa', () => ({
    FaCircleChevronRight: () => <div data-testid="next-icon">next</div>,
    FaCircleChevronLeft: () => <div data-testid="prev-icon">prev</div>
}));

// Mock all image imports
jest.mock('../../assets/imagen-interfaz-2.png', () => 'mocked-reports-image', { virtual: true });
jest.mock('../../assets/imagen-interfaz-1.png', () => 'mocked-transfer-image', { virtual: true });
jest.mock('../../assets/imagen-interfaz-3-prueba.png', () => 'mocked-loan-image', { virtual: true });

describe('CarouselInterface Component', () => {
    const mockProps = {
        title: "Test Title",
        description: "Test Description",
        buttonText: "Test Button",
        buttonLink: "/test-link",
        image: "test-image.jpg"
    };

    test('renders with all props correctly', () => {
        render(
            <BrowserRouter>
                <CarouselInterface {...mockProps} />
            </BrowserRouter>
        );

        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.description)).toBeInTheDocument();
        expect(screen.getByText(mockProps.buttonText)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockProps.image);
        expect(screen.getByRole('img')).toHaveAttribute('alt', mockProps.title);
    });

    test('button links to correct route', () => {
        render(
            <BrowserRouter>
                <CarouselInterface {...mockProps} />
            </BrowserRouter>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', mockProps.buttonLink);
    });
});

describe('Carousel Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock getToken to return true by default
        jwtManage.getToken.mockImplementation(() => 'mock-token');
    });

    const renderCarousel = () => {
        render(
            <BrowserRouter>
                <Carousel />
            </BrowserRouter>
        );
    };

    test('redirects to login when no token is present', async () => {
        jwtManage.getToken.mockImplementation(() => null);
        renderCarousel();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });

    test('renders initial slide correctly', () => {
        renderCarousel();

        // Check first interface content is displayed
        expect(screen.getByText('Mantente al tanto')).toBeInTheDocument();
        expect(screen.getByText('Revisa las estadísticas de tu cuenta para tomar mejores decisiones')).toBeInTheDocument();
        expect(screen.getByText('Ir a reportes')).toBeInTheDocument();
    });

    test('navigation buttons work correctly', () => {
        renderCarousel();

        // Get navigation buttons by their test IDs
        const nextButton = screen.getByTestId('next-button');
        const prevButton = screen.getByTestId('prev-button');

        // Test next navigation
        fireEvent.click(nextButton);
        expect(screen.getByText('Donde y cuando quieras')).toBeInTheDocument();
        expect(screen.getByText('Transferir dinero')).toBeInTheDocument();

        // Test previous navigation
        fireEvent.click(prevButton);
        expect(screen.getByText('Mantente al tanto')).toBeInTheDocument();
        expect(screen.getByText('Ir a reportes')).toBeInTheDocument();
    });

    test('cycles through all slides correctly', () => {
        renderCarousel();

        const nextButton = screen.getByTestId('next-button');

        // Click through all slides
        fireEvent.click(nextButton); // To second slide
        expect(screen.getByText('Donde y cuando quieras')).toBeInTheDocument();

        fireEvent.click(nextButton); // To third slide
        expect(screen.getByText('Te brindamos un impulso')).toBeInTheDocument();

        fireEvent.click(nextButton); // Back to first slide
        expect(screen.getByText('Mantente al tanto')).toBeInTheDocument();
    });

    test('cycles through slides in reverse correctly', () => {
        renderCarousel();

        const prevButton = screen.getByTestId('prev-button');

        // Click previous from first slide should go to last slide
        fireEvent.click(prevButton);
        expect(screen.getByText('Te brindamos un impulso')).toBeInTheDocument();

        fireEvent.click(prevButton);
        expect(screen.getByText('Donde y cuando quieras')).toBeInTheDocument();

        fireEvent.click(prevButton);
        expect(screen.getByText('Mantente al tanto')).toBeInTheDocument();
    });
});