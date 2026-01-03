import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layout
import Layout from '@shared/ui/Layout/Layout';

// Auth pages
import { Login, Register, ForgotPassword } from '@features/auth';

// Account pages
import { Balance, Movements, Profile } from '@features/account';

// Transaction pages
import { Deposit, Withdraw, Transfer } from '@features/transactions';

// Loan pages
import { LoanRequest } from '@features/loans';

// Report pages
import { TotalIncome, TotalExpenses, TotalDebts } from '@features/reports';

// Home page
import { HomePage } from '@features/home';

// Route guards
import { ProtectedRoute, PublicRoute } from './guards';

// Carousel (shared UI)
import CarouselInterface from '@shared/ui/Carousel/CarouselInterface';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: '/register',
        element: (
            <PublicRoute>
                <Register />
            </PublicRoute>
        ),
    },
    {
        path: '/forgot-password',
        element: (
            <PublicRoute>
                <ForgotPassword />
            </PublicRoute>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <CarouselInterface />,
            },
            // Account management routes
            {
                path: 'gestionar/ver-saldo',
                element: <Balance />,
            },
            {
                path: 'gestionar/movimientos',
                element: <Movements />,
            },
            {
                path: 'gestionar/detalle-perfil',
                element: <Profile />,
            },
            // Transaction routes
            {
                path: 'transacciones/transferir-dinero',
                element: <Transfer />,
            },
            {
                path: 'transacciones/depositar',
                element: <Deposit />,
            },
            {
                path: 'transacciones/retirar',
                element: <Withdraw />,
            },
            // Loan routes
            {
                path: 'prestamos/solicitar-prestamo',
                element: <LoanRequest />,
            },
            // Report routes
            {
                path: 'reportes/total-ingresos',
                element: <TotalIncome />,
            },
            {
                path: 'reportes/total-egresos',
                element: <TotalExpenses />,
            },
            {
                path: 'reportes/deudas',
                element: <TotalDebts />,
            },
        ],
    },
]);

export default router;
