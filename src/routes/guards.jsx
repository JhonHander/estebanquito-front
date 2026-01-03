import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '@shared/lib/storage/tokenStorage';

export function ProtectedRoute({ children }) {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export function PublicRoute({ children }) {
    const token = getToken();

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
