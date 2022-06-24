import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {me} from "../http/userAPI";

const Me = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        me()
            .then(r => {
                setUser(r)
            })
            .catch(e => {
                alert(e.response.data.message)
            })
    }, [])

    return (
        <Container className="d-flex flex-column justify-content-center">
            <Row className="justify-content-center mt-4">
                <h3 className="w-auto">
                    My profile
                </h3>
            </Row>
            <Row className="justify-content-center">
                <Card style={{
                    marginTop: '5rem',
                    width: '40rem',
                    height: '22rem',
                    borderWidth: 5
                }}>
                    <div style={{
                        padding: 50
                    }}>
                        <Row>
                            <Col md={3}>
                                <h5>ID:</h5>
                            </Col>
                            <Col md={9}>
                                <h6>{user.id}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <h5>Email:</h5>
                            </Col>
                            <Col md={9}>
                                <h6>{user.login}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <h5>Role:</h5>
                            </Col>
                            <Col md={9}>
                                <h6>{user.role}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <h5>Status:</h5>
                            </Col>
                            <Col md={9}>
                                <h6>{user.status}</h6>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Row>
        </Container>
    );
};

export default Me;