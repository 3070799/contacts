import React from 'react';
import {Col, Row, Form, InputGroup, FormControl} from "react-bootstrap";

const ContactFilter = ({filter, setFilter, direct, setDirect}) => {
    return (
        <Row className="justify-content-between d-flex" style={{width: '1245px', height: '45px'}}>
            <Form.Group md={4} className="d-flex" as={Col}>
                <Form.Select
                    style={{width: 205}}
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
            <Col style={{paddingLeft: 400}} className="justify-content-end d-flex">
                <InputGroup>
                    <InputGroup.Text>
                        <svg width="15px" height="15px">
                            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "/>
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
    );
};

export default ContactFilter;