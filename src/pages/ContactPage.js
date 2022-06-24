import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneContact} from "../http/contactsAPI";

const ContactPage = () => {

    const navigate = useNavigate()

    const [contact, setContact] = useState({})
    const {id} = useParams()
    const imgRef = useRef()

    useEffect(() => {
        fetchOneContact(id)
            .then(data => {
                setContact(data)
            })
    }, [])

    return (
        <Container>
            <Row className="d-flex mt-5">
                <Col md={4} style={{paddingRight: 0}}>
                    <Image src={contact.imgUrl} width={300} height={350}/>
                </Col>
                <Col style={{paddingLeft: 0, paddingRight: 100}} md={8}>
                    <Row>
                        <h1>
                            Information
                        </h1>
                        <Row style={{background: "lightgray", padding: 10}}>
                            <Col md={2} style={{paddingLeft: 0}}>
                                First name:
                            </Col>
                            <Col md={10}>
                                {contact.firstName}
                            </Col>
                        </Row>
                        <Row style={{background: "transparent", padding: 10}}>
                            <Col md={2} style={{paddingLeft: 0}}>
                                Last name:
                            </Col>
                            <Col md={10}>
                                {contact.lastName}
                            </Col>
                        </Row>
                        <Row style={{background: "lightgray", padding: 10}}>
                            <Col md={2} style={{paddingLeft: 0}}>
                                Gender:
                            </Col>
                            <Col md={10}>
                                {contact.gender}
                            </Col>
                        </Row>
                        <Row style={{background: "transparent", padding: 10}}>
                            <Col md={2} style={{paddingLeft: 0}}>
                                Age:
                            </Col>
                            <Col md={10}>
                                {contact.age}
                            </Col>
                        </Row>
                        <Row style={{background: "lightgray", padding: 10}}>
                            <Col md={2} style={{paddingLeft: 0}}>
                                Country:
                            </Col>
                            <Col md={10}>
                                {contact.country}
                            </Col>
                        </Row>
                        <Row style={{background: "transparent", padding: 10}}>
                            <Col md={2} style={{paddingLeft: 0}}>
                                City:
                            </Col>
                            <Col md={10}>
                                {contact.city}
                            </Col>
                        </Row>
                        <Row style={{background: "lightgray", padding: 10}}>
                            <Col md={2} style={{paddingLeft: 0}}>
                                Phone:
                            </Col>
                            <Col md={10}>
                                {contact.phoneNumber}
                            </Col>
                        </Row>
                        <Row className="mt-5 justify-content-end">
                            <Button onClick={() => navigate('/contacts')} variant="outline-info" style={{width: 115}}>
                                All contacts
                            </Button>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;