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

  saveEdit = (title,description,taskData) => {
    //console.log(taskData);
    
    this.props.onSaveEdit(title,description,taskData);
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

    const {title,description,date} = this.props;    
  
    return (
      <Modal
      show={this.props.show}
      onHide={this.props.onHide}
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
            Due date{date}
          </p>
          <p>
            {description}
          </p>
          {
            this.state.isEdit ?
            <EditTask
            title={title}
            description={description}
            onCancelEdit={this.cancelEdit}
            onSaveEdit={this.saveEdit}
          />:<>
            <FontAwesomeIcon icon={faEdit} onClick={this.handleEdit} />
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



