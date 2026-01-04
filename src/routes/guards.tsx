import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '@shared/lib/storage/tokenStorage';

interface RouteProps {
    children: ReactNode;
}

/**
 * Route guard that protects authenticated-only routes
 * Redirects to login page if user is not authenticated
 */
export function ProtectedRoute({ children }: RouteProps) {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

/**
 * Route guard that prevents access to auth pages for authenticated users
 * Redirects authenticated users to dashboard to prevent unnecessary re-authentication
 */
export function PublicRoute({ children }: RouteProps) {
    const token = getToken();

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
