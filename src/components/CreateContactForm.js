import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Form, FormFloating, Row} from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {fetchContacts, saveContact} from "../http/contactsAPI";

const CreateContactForm = ({hideForm, contactCreated}) => {

    const [validated, setValidated] = useState(false)
    const [genderFlag, setGenderFlag] = useState(false)

    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        age: 0,
        gender: 'MALE',
        phoneNumber: ''
    })

    const [contactImage, setContactImage] = useState(null)

    useEffect(() => {
        if (genderFlag === true) {
            setContact({...contact, gender: 'FEMALE'})
        } else {
            setContact({...contact, gender: 'MALE'})
        }
    }, [genderFlag])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            createContact()
        }

        setValidated(true);
    };

    const createContact = () => {
        let formData = new FormData()
        formData.append('request', new Blob([JSON.stringify(
            contact
        )], {type: "application/json"}))
        formData.append('file', contactImage)
        saveContact(formData)
            .then(() => {
                contactCreated()
                setContact({
                    firstName: '',
                    lastName: '',
                    country: '',
                    city: '',
                    age: 0,
                    gender: 'MALE',
                    phoneNumber: ''
                })
                setValidated(false)
            })
            .catch(e => alert(e.response.data.message))
            .finally(hideForm())
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        value={contact.firstName}
                        required
                        placeholder="Enter first name"
                        type="text"
                        onChange={(e) => setContact({...contact, firstName: e.target.value})}
                    />
                    <Form.Control.Feedback type="invalid">
                        First name can not be empty.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        value={contact.lastName}
                        required
                        placeholder="Enter last name"
                        type="text"
                        onChange={(e) => setContact({...contact, lastName: e.target.value})}
                    />
                    <Form.Control.Feedback type="invalid">
                        Last name can not be empty.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    value={contact.country}
                    required
                    type="text"
                    placeholder="Enter country"
                    onChange={(e) => setContact({...contact, country: e.target.value})}
                />
                <Form.Control.Feedback type="invalid">
                    Country can not be empty.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                    value={contact.city}
                    required
                    type="text"
                    placeholder="Enter city"
                    onChange={(e) => setContact({...contact, city: e.target.value})}
                />
                <Form.Control.Feedback type="invalid">
                    City can not be empty.
                </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        value={contact.age}
                        required
                        type="number"
                        placeholder="Enter age"
                        onChange={(e) => setContact({...contact, age: parseInt(e.target.value)})}
                    />
                    <Form.Control.Feedback type="invalid">
                        Age must be more than 0.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Gender</Form.Label>
                    <FormFloating>
                        <BootstrapSwitchButton
                            onstyle="light"
                            offstyle="light"
                            onlabel="FEMALE"
                            offlabel="MALE"
                            width={100}
                            onChange={(e) => setGenderFlag(e)}
                        />
                    </FormFloating>

                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        value={contact.phoneNumber}
                        required
                        type="text"
                        placeholder="Enter phone number"
                        onChange={(e) => setContact({...contact, phoneNumber: e.target.value})}
                    />
                    <Form.Control.Feedback type="invalid">
                        Phone number can not be empty.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        required
                        accept="image/*"
                        type="file"
                        style={{width: 400}}
                        onChange={e => setContactImage(e.target.files[0])}
                    />
                    <Form.Control.Feedback type="invalid">
                        Image can not be empty.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Button variant="success" type="submit">
                Create
            </Button>
        </Form>
    );
};

export default CreateContactForm;