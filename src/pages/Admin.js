import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {Context} from "../context";
import ContactItemAdmin from "../components/ContactItemAdmin";
import MyModal from "../components/ui/modal/MyModal";
import CreateContactForm from "../components/CreateContactForm";
import {observer} from "mobx-react-lite";
import {fetchContacts} from "../http/contactsAPI";
import {useContactsAdmin} from "../hooks/useContacts";

const Admin = observer(() => {

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [direct, setDirect] = useState('asc')
    const [createModal, setCreateModal] = useState(false)

    const {contact} = useContext(Context)

    const contactsArray = useContactsAdmin(contact.contacts.slice(), filter.sort, direct, filter.query)

    useEffect(() => {
        fetchContacts()
            .then(data => contact.setContacts(data.content))
    }, [])

    const contactCreated = () => {
        fetchContacts()
            .then(data => {
                contact.setContacts(data.content)
            })
    }

    return (
        <Container className="d-flex flex-column justify-content-center">
            <Row className="mt-3 justify-content-center">
                <h1 className="w-auto">
                    Admin Page
                </h1>
            </Row>
            <Row className="mt-2">
                <Row style={{width: '1290px', height: '45px', marginLeft: 130, paddingRight: 270}}>

                    <Col md={2}>
                        <div className="d-flex">
                            <Button onClick={() => setCreateModal(true)} style={{width: 150, height: 45}} variant={'outline-success'}>
                                Add contact
                            </Button>
                        </div>
                    </Col>

                    <Form.Group md={6} className="d-flex justify-content-end" as={Col}>
                        <Form.Select
                            style={{width: 150}}
                            onChange={e => setFilter({...filter, sort: e.target.value})}
                            value={filter.sort}
                        >
                            <option value="">Sort</option>
                            <option value="firstName">First name</option>
                            <option value="lastName">Last name</option>
                            <option value="age">Age</option>
                        </Form.Select>
                        <Form.Select
                            style={{width: 68, marginLeft: 7}}
                            onChange={e => setDirect(e.target.value)}
                            value={direct}
                        >
                            <option value="asc">↑</option>
                            <option value="desc">↓</option>
                        </Form.Select>
                    </Form.Group>
                    <Col md={4} style={{paddingLeft: 10}} className="justify-content-end d-flex">
                        <InputGroup>
                            <InputGroup.Text>
                                <svg width="15px" height="15px">
                                    <path
                                        d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "/>
                                </svg>
                            </InputGroup.Text>
                            <FormControl
                                placeholder="Search..."
                                style={
                                    {
                                        boxShadow: 'none',
                                        border: '1px solid #ced4da',
                                    }
                                }
                                value={filter.query}
                                onChange={e => setFilter({...filter, query: e.target.value})}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="d-flex mt-4">
                    {!contactsArray.length &&
                        <Row style={{marginTop: '17%', color: '#842029'}}>
                            <strong className="d-flex justify-content-center">Contacts not found!</strong>
                        </Row>
                    }
                    {contactsArray.map(contact =>
                        <ContactItemAdmin key={contact.id} contact={contact}/>
                    )}
                </Row>
            </Row>

            <MyModal visible={createModal} setVisible={setCreateModal}>
                <CreateContactForm contactCreated={contactCreated} hideForm={() => setCreateModal(false)}/>
            </MyModal>
        </Container>
    );
});

export default Admin;