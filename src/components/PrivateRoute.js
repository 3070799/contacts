import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const PrivateRoute = () => {
    const auth = useAuth()
    const location = useLocation()

    return (
        auth ? <Outlet/> : <Navigate to="/auth" state={{from: location}}/>
    );
};

export default PrivateRoute;