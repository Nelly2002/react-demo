import React ,{Component} from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class EditTask extends Component {
    constructor(props){
        super(props)

        this.state={
            title:props.title,
            description:props.description,

        }

    }

  
    /* handleInputChange = (event) => {
        this.setState({
            editText: event.target.value
        });
    } */


    onChangeTitleHandler = (event)=>{
        this.setState({
            title: event.target.value
        });
        /* this.setState({
          [type]:event.target.value
        })  */
          
    }

    onChangeTextHandler = (event)=>{
        this.setState({
            description : event.target.value
        });
          
    }

    cancelEdit = () => {
        this.setState({
            title: this.props.title,
            description:this.props.description

        });
        this.props.onCancelEdit();
    }

    saveEdit = () => {
        const {title,description} = this.state;
    
    const taskData = {
        title,
        description
      
    };
        this.props.onSaveEdit(title,description,taskData);

    }

        render() {
            return (
                <>
                    <input type="text"
                        value={this.state.title}
                        onChange={this.onChangeTitleHandler}
                    />
                    <input type="text"
                        value={this.state.description}
                        onChange={this.onChangeTextHandler}
                    />
                    
                    <FontAwesomeIcon  icon={faCheck} onClick={this.saveEdit} />
                    <FontAwesomeIcon  icon={faTimes} onClick={this.cancelEdit}></FontAwesomeIcon>
                </>
            );
        }
    }


export default EditTask;