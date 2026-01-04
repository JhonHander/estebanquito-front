import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@features/auth';
import { router } from '@routes/index';
import '@styles/colors.css';
import '../index.css';

/**
 * Root application component that sets up global providers and routing
 * Wraps the entire app with authentication context and React Router
 */
function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
