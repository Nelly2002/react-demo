import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EditTask from '../EditTask';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TaskModal extends Component {

  state = {
    isEdit: false,
  }


  handleEdit = () => {
    this.setState({
      isEdit: true
    });
    this.props.onEdit();
  }

  saveEdit = (editedText) => {
    this.props.onSaveEdit(editedText);
    this.setState({
      isEdit: false,
    });
  }

  cancelEdit = () => {
    this.setState({
      isEdit: false
    });
    this.props.onEdit();
  }



  render() {

    const { taskData } = this.props;
    const title = taskData.text.slice(0, 15);

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Full task information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{title}</h4>
          <p>
            {taskData.text}
          </p>
          {
            this.state.isEdit ?
            <EditTask
            text={taskData.text}
            onCancelEdit={this.cancelEdit}
            onSaveEdit={this.saveEdit}
          />:<>
            <FontAwesomeIcon  icon={faEdit} onClick={this.handleEdit} />
            <FontAwesomeIcon icon={faTrashAlt} onClick={this.props.onDelete} />
            </>
          }
         
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>

        </Modal.Footer>
      </Modal>

    );
  }
}

export default TaskModal



