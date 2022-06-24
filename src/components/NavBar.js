import React from 'react';
import {useUser} from "../hooks/useUser";
import {Button, Col, Container, Image, Nav, Navbar, Row} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {logout} from "../http/userAPI";

import profileIcon from "../images/profile-icon.png"

const NavBar = observer(() => {

    const user = useUser()
    const navigate = useNavigate()

    const logoutFun = async () => {
        if (user.isAuth) {
            const data = await logout()
                .then(r => {
                    user.setIsAuth(false)
                    user.setUser({})
                    navigate('/auth')
                })
                .catch(e => alert(e.response.data.reason))
        }
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container style={{}}>
                <div style={{display: 'flex', width: '11.5rem', justifyContent: 'space-between'}}>
                    <NavLink style={
                        {fontSize: '25px', color: 'white', textDecoration: 'auto'}
                    } to="/contacts">Contacts 🇺🇦</NavLink>
                    {user.isAuth &&
                        <button style={{
                            border: 0,
                            padding: 0,
                            backgroundColor: "inherit",
                        }}>
                            <img style={{
                                width: '1.8rem',
                                height: '1.8rem',
                            }} src={profileIcon} alt="MyProfile"
                                 onClick={() => navigate('/me')}
                            />
                        </button>
                    }
                </div>
                {user.isAuth
                    ?
                    <Nav className="ml-auto">
                        {user.user.role === 'ADMIN' &&
                            <Button onClick={() => navigate('/admin')} variant="outline-light">Admin</Button>
                        }
                        <Button onClick={logoutFun} className="ms-3" variant="outline-light">Logout</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button onClick={() => navigate('/auth#registration')} variant="outline-light">Create
                            account</Button>
                        <Button onClick={() => navigate('/auth')} className="ms-3"
                                variant="outline-light">Login</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;