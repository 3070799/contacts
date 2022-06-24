import './App.css'
import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Loader from "./components/ui/loader/Loader";
import {observer} from "mobx-react-lite";
import {useUser} from "./hooks/useUser";
import {check} from "./http/userAPI";
import {useLoading} from "./hooks/useLoading";

const App = observer(() => {

    const {loading} = useLoading()
    const [isAuthLoading, setIsAuthLoading] = useState(true)
    const user = useUser()

    useEffect(() => {
        check().then(data => {
            localStorage.setItem('accessToken', data.accessToken)
            user.setIsAuth(true)
            user.setUser(data.user)
        }).finally(() => {
            setIsAuthLoading(false)
        })
    }, [])

    if (isAuthLoading) {
        return <Loader/>
    }

    return (
        loading
            ?
            <BrowserRouter>
                <NavBar/>
                <Loader/>
            </BrowserRouter>
            :
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
    );
});

export default App;
