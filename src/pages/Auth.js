import React from 'react';
import {Container} from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import Registration from "../components/auth/Registration";
import Login from "../components/auth/Login";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {

    const location = useLocation()
    const isLogin = location.hash !== '#registration'

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 100}}
        >
            {isLogin
                ?
                <Login/>
                :
                <Registration/>
            }

        </Container>
    );
});

export default Auth;