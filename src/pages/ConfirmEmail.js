import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Container, Row} from "react-bootstrap";
import {confirmEmail} from "../http/confirmationAPI";

const ConfirmEmail = () => {

    const navigate = useNavigate()
    const {id} = useParams()

    const [successfulConfirmed, setSuccessfulConfirmed] = useState({'success': false, 'user': null})
    const [alreadyConfirmed, setAlreadyConfirmed] = useState(false)
    const [badId, setBadId] = useState(false)
    const [expired, setExpired] = useState(false)

    useEffect(() => {
        confirmEmail(id)
            .then(r => {
                setSuccessfulConfirmed({
                    'success': true,
                    'user': r
                })
            })
            .catch(e => {
                if (e.response.data.reason === 'EMAIL_ALREADY_VERIFIED') {
                    setAlreadyConfirmed(true)
                } else if (e.response.data.reason === 'VERIFICATION_TOKEN_NOT_FOUND') {
                    setBadId(true)
                } else if (e.response.data.reason === 'VERIFICATION_TOKEN_EXPIRED') {
                  setExpired(true)
                } else {
                    alert(e.response.data.reason)
                }
            })
    }, [])

    return (
        <Container className="d-flex justify-content-center align-items-center">
            {successfulConfirmed['success'] &&
                <Row>
                    <Card style={{
                        backgroundColor: '#2fd70854',
                        borderColor: 'green',
                        width: '100%',
                        marginTop: '12%',
                        padding: 70
                    }}>
                        <h5 className="d-flex justify-content-center">
                            <div>
                                Welcome <strong style={{color: '#422c85'}}>{successfulConfirmed['user'].login}</strong>!
                                You have successfully verified your email!
                                Now you can login 😊
                            </div>
                        </h5>
                    </Card>
                    <div style={{textAlign: 'center'}}>
                        <Button
                            style={{marginTop: '7%', width: '20%'}}
                            onClick={() => navigate('/auth', {state: {email: successfulConfirmed['user'].login}})}
                            variant="outline-primary">
                            <h4 style={{padding: '6%'}}>
                                Login now 🚀
                            </h4>
                        </Button>
                    </div>
                </Row>
            }
            {alreadyConfirmed &&
                <Row>
                    <Card style={{
                        backgroundColor: '#2fd70854',
                        borderColor: 'green',
                        width: '65rem',
                        marginTop: '12%',
                        padding: 60
                    }}>
                        <h5 className="d-flex justify-content-center">
                            <div>
                                You have already verified your email!
                            </div>
                        </h5>
                    </Card>
                </Row>
            }
            {badId &&
                <Card style={{
                    borderColor: 'black',
                    width: '65rem',
                    marginTop: '23%',
                    padding: 60
                }}>
                    <h5 className="d-flex justify-content-center">
                        <div>
                            {expired
                                ?
                                <div>
                                    Verification token expired.
                                </div>
                                :
                                <div>
                                    Invalid verification token.
                                </div>
                            }
                        </div>
                    </h5>
                </Card>
            }
        </Container>
    );
};

export default ConfirmEmail;