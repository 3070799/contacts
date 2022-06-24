import React, {useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {login} from "../../http/userAPI";
import {useUser} from "../../hooks/useUser";
import {observer} from "mobx-react-lite";
import {onInputArrowUpDown} from "../../utils/utils";

const Login = observer(() => {

    const user = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    const [username, setUsername] = useState(location.state ? location.state.email : '')
    const [pass, setPass] = useState('')
    const [badCred, setBedCred] = useState(false)
    const [notConfirmed, setNotConfirmed] = useState(false)

    const inputFocus = location.state ? location.state.email ? 'PASSWORD' : 'EMAIL' : 'EMAIL'

    const onInputKeyDown = (event, inputIndex) => {
        onInputArrowUpDown(2, 'l-in', inputIndex, event)
    }

    const signIn = async (e) => {
        e.preventDefault()
        login(username, pass)
            .then(r => {
                localStorage.setItem('accessToken', r.accessToken)
                user.setUser(r.user)
                user.setIsAuth(true)
                navigate('/contacts')
            })
            .catch(e => {
                setPass('')
                if (e.response.data.reason === 'AUTHENTICATION_ERROR') {
                    setBedCred(true)
                    setNotConfirmed(false)
                } else if (e.response.data.reason === 'EMAIL_NOT_CONFIRMED') {
                    setNotConfirmed(true)
                    setBedCred(false)
                } else {
                    alert(e.response.data.message)
                }
            })
    }

    return (
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto">Authorization</h2>
            <Form className="d-flex flex-column mt-3" onSubmit={signIn}>
                <Form.Control
                    name="l-in-1"
                    required
                    className="mt-3"
                    autoFocus={inputFocus === 'EMAIL' ? "autofocus": ""}
                    placeholder="Enter your email..."
                    defaultValue={location.state ? location.state.email : ''}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={e => onInputKeyDown(e, 1)}
                />
                <Form.Control
                    name="l-in-2"
                    value={pass}
                    className="mt-3"
                    autoFocus={inputFocus === 'PASSWORD' ? "autofocus": ""}
                    type="password"
                    placeholder="Enter your password..."
                    onChange={e => setPass(e.target.value)}
                    onKeyDown={e => onInputKeyDown(e, 2)}
                />
                {badCred &&
                    <Row className="d-flex justify-content-center ms-1 px-1">
                        <div style={{
                            border: '1px solid red',
                            borderRadius: '15px',
                            padding: 2,
                            width: 400,
                            marginTop: 10
                        }} className="justify-content-center d-flex">
                            <div style={{color: 'red'}}>
                                Invalid email or password!
                            </div>
                        </div>
                    </Row>
                }
                {notConfirmed &&
                    <Row className="d-flex justify-content-center ms-1 px-1">
                        <div style={{
                            border: '1px solid red',
                            borderRadius: '15px',
                            padding: 2,
                            width: 400,
                            marginTop: 10
                        }} className="justify-content-center d-flex">
                            <div style={{color: 'red'}}>
                                You should confirm your email to login!
                            </div>
                        </div>
                    </Row>
                }
                <Row style={{
                    marginTop: badCred || notConfirmed ? 10 : 20
                }} className="d-flex justify-content-between px-1">
                    <Col>
                        <div>
                            {'Not registered yet? '} <NavLink to="#registration">Registration</NavLink>
                        </div>
                    </Col>
                    <Col className="justify-content-end d-flex">
                        <Button type="submit" variant={"outline-success"}>
                            Login
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
});

export default Login;