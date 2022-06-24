import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {deleteContact, fetchContacts, fetchOneContact} from "../http/contactsAPI";
import {Context} from "../context";
import MyModal from "./ui/modal/MyModal";
import UpdateContactForm from "./UpdateContactForm";

const ContactItemAdmin = ({contact}) => {

    const navigate = useNavigate()
    const contacts = useContext(Context)
    const [updateModal, setUpdateModal] = useState(false)
    const [stateContact, setStateContact] = useState({})

    useEffect(() => {
        setStateContact(contacts.contact.contacts.find(c => c.id === contact.id))
    }, [])

    const onDeleteContact = () => {
        deleteContact(contact.id)
            .catch(e => alert(e.response.data.message))
        contacts.contact.setContacts(
            contacts.contact.contacts.filter(
            c => c.id !== contact.id
        ))
    }

    const contactUpdated = () => {
        fetchOneContact(stateContact.id)
            .then(data => {
                setStateContact(data)
            })
    }

    return (
        <Col md={12} style={{padding: 15, justifyContent: "center", display: "flex"}}>

            <Card style={
                {width: 1000, height: 'auto', border: 'light'}
            }>
                <Card.Body>
                    <Row>
                        <Col md={3}>
                            <Image width={200} height={220} src={stateContact.imgUrl}/>
                            <div style={{width: 200}} className="mt-3 justify-content-end d-flex">
                                    <Button
                                        onClick={() => setUpdateModal(true)}
                                        variant="primary"
                                    >
                                        UPDATE
                                    </Button>
                                    <Button onClick={onDeleteContact} variant="danger" className="ms-2">
                                        DELETE
                                    </Button>
                            </div>
                        </Col>
                        <Col md={9} className="d-flex">
                            <div style={
                                {
                                    width: 650,
                                    float: 'right',
                                    marginRight: 60
                                }
                            }>
                                <Row style={{background: "lightgray", padding: 10}}>
                                    <Col md={2} style={{paddingLeft: 0}}>
                                        First name:
                                    </Col>
                                    <Col md={10}>
                                        {stateContact.firstName}
                                    </Col>
                                </Row>
                                <Row style={{background: "transparent", padding: 10}}>
                                    <Col md={2} style={{paddingLeft: 0}}>
                                        Last name:
                                    </Col>
                                    <Col md={10}>
                                        {stateContact.lastName}
                                    </Col>
                                </Row>
                                <Row style={{background: "lightgray", padding: 10}}>
                                    <Col md={2} style={{paddingLeft: 0}}>
                                        Gender:
                                    </Col>
                                    <Col md={10}>
                                        {stateContact.gender}
                                    </Col>
                                </Row>
                                <Row style={{background: "transparent", padding: 10}}>
                                    <Col md={2} style={{paddingLeft: 0}}>
                                        Age:
                                    </Col>
                                    <Col md={10}>
                                        {stateContact.age}
                                    </Col>
                                </Row>
                                <Row style={{background: "lightgray", padding: 10}}>
                                    <Col md={2} style={{paddingLeft: 0}}>
                                        Country:
                                    </Col>
                                    <Col md={10}>
                                        {stateContact.country}
                                    </Col>
                                </Row>
                                <Row style={{background: "transparent", padding: 10}}>
                                    <Col md={2} style={{paddingLeft: 0}}>
                                        City:
                                    </Col>
                                    <Col md={10}>
                                        {stateContact.city}
                                    </Col>
                                </Row>
                                <Row style={{background: "lightgray", padding: 10}}>
                                    <Col md={2} style={{paddingLeft: 0}}>
                                        Phone:
                                    </Col>
                                    <Col md={10}>
                                        {stateContact.phoneNumber}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                </Card.Body>

            </Card>
            <MyModal visible={updateModal} setVisible={setUpdateModal}>
                <UpdateContactForm updatedContact={stateContact}
                                   setUpdatedContact={setStateContact}
                                   contactUpdated={contactUpdated}
                                   hideForm={() => setUpdateModal(false)}/>
            </MyModal>
        </Col>
    );
};

export default ContactItemAdmin;