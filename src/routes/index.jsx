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
                path: 'account/balance',
                element: <Balance />,
            },
            {
                path: 'account/movements',
                element: <Movements />,
            },
            {
                path: 'account/profile',
                element: <Profile />,
            },
            // Transaction routes
            {
                path: 'transactions/transfer',
                element: <Transfer />,
            },
            {
                path: 'transactions/deposit',
                element: <Deposit />,
            },
            {
                path: 'transactions/withdraw',
                element: <Withdraw />,
            },
            // Loan routes
            {
                path: 'loans/request',
                element: <LoanRequest />,
            },
            // Report routes
            {
                path: 'reports/income',
                element: <TotalIncome />,
            },
            {
                path: 'reports/expenses',
                element: <TotalExpenses />,
            },
            {
                path: 'reports/debts',
                element: <TotalDebts />,
            },
        ],
    },
    // Catch-all route for 404 errors
    {
        path: '*',
        element: (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Página no encontrada</h2>
                <p style={{ marginBottom: '2rem', color: '#666' }}>
                    La página que buscas no existe o ha sido movida.
                </p>
                <a
                    href="/"
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '0.375rem',
                        fontWeight: '500'
                    }}
                >
                    Ir al inicio
                </a>
            </div>
        ),
    },
]);
