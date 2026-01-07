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

// Dashboard
import DashboardPage from '@features/dashboard/ui/DashboardPage';

const basename = import.meta.env.PROD ? '/estebanquito-front' : '/';

export const router = createBrowserRouter(
    [
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
                    element: <DashboardPage />,
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
    ], { basename });

export default router;
