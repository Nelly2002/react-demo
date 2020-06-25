import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
//import EditTask from '../EditTask';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TaskModal extends Component {

  state = {
    
  }


  handleEdit = () => {
    /* this.setState({
      isEdit: true,
      title:this.props.title

    }); */
    this.props.onEdit();
  }

  saveEdit = () => {
   
    const {taskData} = this.props;
    console.log(taskData);
    
  /*   const {data} = this.props 
    const taskData = {};

    (title !== data.title) && (taskData.title = title);
    (date !== data.date) && (taskData.date = date);
    (description !== data.description) && (taskData.description = description);

    this.props.onEditTask(id,taskData); */
  }

  cancelEdit = () => {
  /*   this.setState({
      isEdit: false
    }); */
    this.props.onEdit();
  }



  render() {
    
    const {data} = this.props;    

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
          <h4>{data.title}</h4>
          <p>
            {data.description}
          </p>
          <p>
            Due date  {data.date}
          </p>
          <p>
              Created {data.created_at.slice(0,10)}
          </p>
          <FontAwesomeIcon icon={faEdit} onClick={this.handleEdit} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={this.props.onDelete} />
  
         
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>

        </Modal.Footer>
      </Modal>

    );
  }
}

export default TaskModal



