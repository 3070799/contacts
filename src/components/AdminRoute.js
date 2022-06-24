import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useUser} from "../hooks/useUser";

const AdminRoute = () => {

    const user = useUser()
    const location = useLocation()

    return (
        user.user.role === 'ADMIN' ? <Outlet/> : <Navigate to="/contacts" state={{from: location}}/>
    );
};

export default AdminRoute;