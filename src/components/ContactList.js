import React, {useContext, useEffect} from 'react';
import {Context} from "../context";
import {Row} from "react-bootstrap";
import ContactItem from "./ContactItem";
import {observer} from "mobx-react-lite";
import {fetchContacts} from "../http/contactsAPI";
import {useContactsAdmin} from "../hooks/useContacts";

const ContactList = observer(({filter, direct}) => {

    const {contact} = useContext(Context)

    const contactsArray = useContactsAdmin(contact.contacts.slice(), filter.sort, direct, filter.query)

    useEffect(() => {
        fetchContacts()
            .then(data => contact.setContacts(data.content))
    }, [])

    return (
        <Row className="d-flex mt-4">
            {!contactsArray.length &&
                <Row style={{marginTop: '17%', color: '#842029'}}>
                    <strong className="d-flex justify-content-center">Contacts not found!</strong>
                </Row>
            }
            {contactsArray.map(contact =>
                <ContactItem key={contact.id} contact={contact}/>
            )}
        </Row>
    );
});

export default ContactList;