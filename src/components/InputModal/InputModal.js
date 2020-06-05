import React, { Component } from 'react';
import { Modal, Button, } from 'react-bootstrap';
import NewTask from '../NewTask/NewTask';


class InputModal extends Component {

  render() {

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
             Modal 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <NewTask
            onAdd={this.props.onTaskAdd}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


}

export default InputModal



