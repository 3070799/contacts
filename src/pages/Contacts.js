import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ContactFilter from "../components/ContactFilter";
import ContactList from "../components/ContactList";

const Contacts = () => {

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [direct, setDirect] = useState('asc')

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
        >
            <Row className="mt-5">
                <ContactFilter filter={filter} setFilter={setFilter} direct={direct} setDirect={setDirect}/>
                <ContactList filter={filter} direct={direct} />
            </Row>
        </Container>
    );
};

export default Contacts;