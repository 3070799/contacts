import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Auth from "../pages/Auth";
import PrivateRoute from "./PrivateRoute";
import Contacts from "../pages/Contacts";
import ContactPage from "../pages/ContactPage";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import AdminRoute from "./AdminRoute";
import ConfirmEmail from "../pages/ConfirmEmail";
import Me from "../pages/Me";

const AppRouter = () => {
    return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <Routes>
            //public routes
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/verification/email/:id" element={<ConfirmEmail/>}/>

            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <Route element={<PrivateRoute/>}>
                //private routes
                <Route exact path="/contacts" element={<Contacts/>}/>
                <Route exact path="/contacts/:id" element={<ContactPage/>}/>
                <Route exact path="/me" element={<Me/>}/>
                <Route element={<AdminRoute/>}>
                    <Route exact path="/admin" element={<Admin/>}/>
                </Route>
            </Route>

            <Route path="/" element={<Navigate to="/contacts"/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default AppRouter;