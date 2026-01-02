import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@features/auth';
import { router } from '@routes/index';
import '@styles/colors.css';
import '../index.css';

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
