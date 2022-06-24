import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, FormControl, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {registration} from "../../http/userAPI";
import {onInputArrowUpDown} from "../../utils/utils";
import Loader from "../ui/loader/Loader";
import CountdownTimer from "../ui/countdown/CountdownTimer";
import {resendConfirmEmail} from "../../http/confirmationAPI";
import {NOT_VALID, REGISTRATION_EMAIL_NOT_VALID} from "../../http/exception/validationExceptionConstants";

const Registration = () => {

    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const [passValid, setPassValid] = useState(true)

    const [isConfirmEmail, setIsConfirmEmail] = useState(false)

    const [isRegLoading, setIsRegLoading] = useState(false)

    const [regError, setRegError] = useState(false)

    const [emailNotValid, setEmailNotValid] = useState(false)

    const [isCountdownExpired, setIsCountdownExpired] = useState(false)

    const [showCountdown, setShowCountdown] = useState({show: false, time: 0})

    const [registeredUser, setRegisteredUser] = useState({})

    const ONE_MINUTE_IN_MS = 60 * 1000;

    useEffect(() => {
        if (pass === confirmPass) {
            setPassValid(true)
        } else {
            setPassValid(false)
        }
    }, [pass, confirmPass])

    const onInputKeyDown = (event, inputIndex) => {
        onInputArrowUpDown(3, 'r-in', inputIndex, event)
    }

    const signUp = async (e) => {
        e.preventDefault()
        if (passValid) {
            setIsRegLoading(true)
            const response = await registration(username, pass)
                .then(r => {
                    setRegisteredUser(r)
                    setIsConfirmEmail(true)
                    const NOW_IN_MS = new Date().getTime();
                    setShowCountdown({show: true, time: NOW_IN_MS + ONE_MINUTE_IN_MS})
                })
                .catch(e => {
                    if (e.response.data.reason === 'USER_ALREADY_EXIST') {
                        setRegError(true)
                        setEmailNotValid(false)
                    } else if (e.response.data.reason === NOT_VALID) {
                        const notValidList = e.response.data.message.split(";")

                        if (notValidList.includes(REGISTRATION_EMAIL_NOT_VALID)) {
                            setEmailNotValid(true)
                            setRegError(false)
                        }

                    } else {
                        alert(e.response.data.reason)
                    }
                    setUsername('')
                    setPass('')
                    setConfirmPass('')
                })
                .finally(() => setIsRegLoading(false))
        }
    }

    const sendEmailAgain = () => {
        setIsCountdownExpired(false)
        resendConfirmEmail(registeredUser.id)
            .then(r => {
                const NOW_IN_MS = new Date().getTime();
                setShowCountdown({show: true, time: NOW_IN_MS + ONE_MINUTE_IN_MS})
            })
            .catch(e => {
                if (e.response.data.reason === 'EMAIL_ALREADY_VERIFIED') {
                    alert("You have already verified your email!")
                }
            })
    }

    const countdownExpired = async () => {
        setIsCountdownExpired(true)
        setShowCountdown({show: false, time: 0})
    }

    return (
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto">Registration</h2>
            {isRegLoading &&
                <div style={{position: 'absolute', marginLeft: '36%', marginTop: '20%'}}>
                    <Loader/>
                </div>
            }
            {isConfirmEmail &&
                <Card.Body>
                    <Card style={{
                        marginTop: 20,
                        border: 0,
                        backgroundColor: '#15e6fa45'
                    }}
                          className="p-4">
                        <div>
                            <h6 style={{paddingTop: 45, paddingBottom: 30}}>
                                <div>
                                    We have sent you an email to <strong>{username}</strong>,
                                    please follow the link in the email to complete your registration.
                                </div>
                            </h6>
                        </div>
                        <Row style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Col md={8} style={{display: 'flex'}}>
                                <Row style={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Col md={9} style={{width: '12rem', paddingRight: 0}}>
                                        <p style={{margin: 0, height: 'auto'}}>Send email again after:</p>
                                    </Col>
                                    <Col md={2} style={{display: 'flex', paddingLeft: 0, width: '3rem'}}>
                                        {showCountdown.show &&
                                            <CountdownTimer targetDate={showCountdown.time}
                                                            setIsExpired={countdownExpired}/>
                                        }
                                        {isCountdownExpired &&
                                            <div style={{display: "flex"}}>
                                                <p style={{margin: 0}}>0:00</p>
                                            </div>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4} style={{display: 'flex', justifyContent: 'center'}}>
                                <Button disabled={!isCountdownExpired}
                                        onClick={sendEmailAgain}
                                        style={{width: 'auto'}}
                                        variant={!isCountdownExpired ? 'outline-dark' : 'success'}>
                                    Send again
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Card.Body>
            }
            {!isConfirmEmail &&
                <Form className="d-flex flex-column mt-3" onSubmit={signUp}>
                    <Form.Control
                        name="r-in-1"
                        required
                        value={username}
                        className="mt-3"
                        autoFocus
                        type="email"
                        placeholder="Enter your email..."
                        onChange={e => setUsername(e.target.value)}
                        onKeyDown={e => onInputKeyDown(e, 1)}
                    />
                    <div>
                        <Form.Control
                            required
                            value={pass}
                            name="r-in-2"
                            className="mt-3"
                            type="password"
                            placeholder="Enter your password..."
                            onChange={e => setPass(e.target.value)}
                            onKeyDown={e => onInputKeyDown(e, 2)}
                        />
                    </div>
                    <div>
                        <Form.Control
                            name="r-in-3"
                            isInvalid={!passValid}
                            value={confirmPass}
                            className="mt-3"
                            type="password"
                            placeholder="Confirm your password..."
                            onChange={e => setConfirmPass(e.target.value)}
                            onKeyDown={e => onInputKeyDown(e, 3)}
                        />
                        <FormControl.Feedback type="invalid">
                            Passwords must match!
                        </FormControl.Feedback>
                    </div>
                    {regError &&
                        <Row className="d-flex justify-content-center ms-1 px-1">
                            <div style={{
                                border: '1px solid red',
                                borderRadius: '15px',
                                padding: 2,
                                width: 400,
                                marginTop: 10
                            }} className="justify-content-center d-flex">
                                <div style={{color: 'red'}}>
                                    User with current email already exist!
                                </div>
                            </div>
                        </Row>
                    }
                    {emailNotValid &&
                        <Row className="d-flex justify-content-center ms-1 px-1">
                            <div style={{
                                border: '1px solid red',
                                borderRadius: '15px',
                                padding: 2,
                                width: 400,
                                marginTop: 10
                            }} className="justify-content-center d-flex">
                                <div style={{color: 'red'}}>
                                    Email not valid!
                                </div>
                            </div>
                        </Row>
                    }
                    <Row style={{
                        marginTop: regError ? 10 : 20
                    }} className="d-flex justify-content-between px-1">
                        <Col>
                            <div>
                                {'Already have account? '}
                                <NavLink to="/auth">Login</NavLink>
                            </div>
                        </Col>
                        <Col className="justify-content-end d-flex">
                            <Button type="submit" variant={"outline-success"}>
                                Register
                            </Button>
                        </Col>
                    </Row>
                </Form>
            }
        </Card>
    );
};

export default Registration;