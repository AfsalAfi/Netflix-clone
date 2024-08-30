import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return <></>;
    }

    if (!user) {
        return <Navigate to='/' />;
    }
    return children;
};

export default ProtectedRoute;
