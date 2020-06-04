import React ,{Component} from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class EditTask extends Component {
    constructor(props){
        super(props)

        this.state={
            editText:props.text
        }

    }

  
    handleInputChange = (event) => {
        this.setState({
            editText: event.target.value
        });
    }

    cancelEdit = () => {
        this.setState({
            editText: this.props.text
        });
        this.props.onCancelEdit();
    }

    saveEdit = () => {
        this.props.onSaveEdit(this.state.editText);

    }

        render() {
            return (
                <>
                    <input type="text"
                        value={this.state.editText}
                        onChange={this.handleInputChange}
                    />
                    <FontAwesomeIcon  icon={faCheck} onClick={this.saveEdit} />
                    <FontAwesomeIcon  icon={faTimes} onClick={this.cancelEdit}></FontAwesomeIcon>
                </>
            );
        }
    }


export default EditTask;