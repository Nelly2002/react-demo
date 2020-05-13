import React ,{Component} from 'react';
import Task from './Task';


class Todo extends Component{

    
    state = {
        inputValue: '',
        dataValue: '',
        list:[]
    };


inputChangeHandler = (event)=>{
    const nextState = {
        inputValue: event.target.value,
    }

    if (this.state.dataValue) {
        nextState.dataValue = ''
    }
    this.setState(nextState);
}

buttonClickHandler = ()=>{
    this.setState({ dataValue: this.state.inputValue }) ;
    const list = [...this.state.list];
    list.push({
        text:this.state.inputValue
    });
    this.setState({
        list:list,
        inputValue:''
    })
}

    render(){
       
        
        return (
            <>
                <input type="text"
                value={this.state.inputValue}
                 onChange={this.inputChangeHandler} 
                 />
                 <button onClick={this.buttonClickHandler}>Click me</button>
                 <Task text={this.state.list.map((el,index)=><div className='task' key={index}>{el.text}
                                                                <button>Delet</button>
                                                            </div>)} />  
    
            </>
        );
    }
}

export default Todo