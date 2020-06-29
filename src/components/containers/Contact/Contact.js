import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import classes from './contact.module.css';
import { nameValidator, emailValidator } from '../../../helpers/validator';
import { connect } from 'react-redux';
import contact from '../../../store/actions/contact';
import PropTypes from 'prop-types';



function Contact(props) {

    const [name, setNameValue] = useState('');
    const [email, setEmailValue] = useState('');
    const [message, setMessageValue] = useState('');

    const submitHandler = () => {
      
        const taskData = {
           name,
           email,
           message
        };
        
        console.log(taskData)
        props.contact(taskData);
        
        setNameValue('');
        setEmailValue('');
        setMessageValue('');
    }


    const isNameValid = nameValidator(name);
    const isEmailValid = emailValidator(email);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col sm='6' >
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Your name *</Form.Label>
                                <Form.Control type="name" placeholder="name"
                                    value={name}
                                    onChange={(event)=>{
                                        setNameValue(event.target.value)
                                    }}
                                    className={!isNameValid ? classes.invalid : ''}
                                />
                            </Form.Group>
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com"
                                value={email}
                                onChange={(event) =>{
                                    setEmailValue(event.target.value)
                                }}
                                className={!isEmailValid ? classes.invalid : ''}
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your message</Form.Label>
                            <Form.Control as="textarea" rows="3"
                                value={message}
                                onChange={(event) =>{
                                    setMessageValue(event.target.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                    <Button
                        variant="outline-primary"
                        onClick={submitHandler}
                        disabled={!(isNameValid && isEmailValid)}
                    >
                        Submit
                        </Button>
                </Col>
            </Row>
        </Container>

    );

}


Contact.propTypes={
    contact: PropTypes.func.isRequired
}


const mapDispatchtoProps = {
    contact,
}


export default connect(null, mapDispatchtoProps)(Contact);