import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <h3 className='text-2xl'>Loading</h3>
    }

    if (user) {
        return children;
    }



    return <Navigate to="/login" state={{ from: location }} replace ></Navigate>
};

export default PrivateRoutes;