import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const ContactItem = ({contact}) => {

    const navigate = useNavigate()

    return (
        <Col md={4} style={{padding: 20}}>
            <Card className="justify-content-xl-between" style={
                {width: 324, height: 275, border: 'light'}
            }>
                <Card.Body>
                    <Image style={{borderRadius: '50%'}} width={150} height={150} src={contact.imgUrl}/>

                    <div style={
                        {
                            width: 85,
                            float: 'right',
                            paddingTop: 5,
                            marginRight: 25
                        }
                    }>
                            First name:
                        <div className="mb-1" style={{width: 155}}>
                            <strong>
                                {contact.firstName}
                            </strong>
                        </div>
                            Last name:
                        <div className="mb-1" style={{width: 155}}>
                            <strong>
                                {contact.lastName}
                            </strong>
                        </div>
                            Age:
                        <div className="mb-1" style={{width: 155}}>
                            <strong>
                                {contact.age}
                            </strong>
                        </div>
                        <Button onClick={() => navigate('/contacts/' + contact.id)} variant="outline-secondary" style={
                            {
                                cursor: 'pointer',
                                width: 110,
                                marginTop: 25,
                                marginLeft: -5
                            }
                        }>Show more</Button>
                    </div>


                </Card.Body>

            </Card>
        </Col>
    );
};

export default ContactItem;