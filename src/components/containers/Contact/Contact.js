import React, { Component } from 'react';
import {Button, Container, Row, Col, Form } from 'react-bootstrap';
import classes from './contact.module.css';
import {nameValidator,emailValidator}  from '../../../helpers/validator';
import { withSnackbar } from 'notistack';



class Contact extends Component {
    state = {
        name:'',
        email:'',
        message:''
    }

    submitHandler = ()=>{
        const {name,email,message} = this.state;
        const taskData = {
           name,
           email,
           message
        };
      
        fetch(`http://localhost:3001/contact`, {
            method: 'POST',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                throw response.error;
            }
            this.props.enqueueSnackbar('Task add successfully', {
                variant: 'success',
            });
            this.setState({
                name:'',
                email:'',
                message:''
            });
            
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), {
                variant: 'error',
            });
        
        })
        
    }

    inputChnageHandler = (type) =>(event)=>{

        this.setState({
            [type]:event.target.value
        });
    }

    render() {
        const {name,email,message} = this.state;
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
                                onChange={this.inputChnageHandler('name')}
                                className = {!isNameValid?classes.invalid:''}
                                />
                                </Form.Group>
                                <Form.Label>Email address *</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" 
                                value={email}
                                onChange={this.inputChnageHandler('email')}
                                className = {!isEmailValid?classes.invalid:''}
                                />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Your message</Form.Label>
                                <Form.Control as="textarea" rows="3" 
                                value={message}
                                onChange={this.inputChnageHandler('message')}
                                />
                            </Form.Group>
                        </Form>
                        <Button
                            variant="outline-primary"
                            onClick={this.submitHandler}
                            disabled={!(isNameValid && isEmailValid)}
                        >
                        Submit
                        </Button>
                    </Col>
                </Row>
            </Container>

        );
    }
}


export default  withSnackbar(Contact); 