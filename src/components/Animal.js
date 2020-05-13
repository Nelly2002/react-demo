import React, {Component} from 'react';

class Animal extends Component{
constructor(props){
    super(props);
    this.state = {
        age:props.age,
        inputText:'' 
    }
            
}

handelClick = ()=>{
    console.log(this);
    
    this.setState({age:this.state.age+1});

}
hendelInputChange = (event)=>{
    this.setState({inputText:event.target.value}); 
}
render(){
    
    return (
    <div
        onClick = {this.handelClick} 
    >Hello , I am Doggy, and I am a {this.props.type}
    <p>I am {this.state.age} years old</p>
    <input type="text"
    onChange={this.hendelInputChange}
    />
    <p>{this.state.inputText}</p>
    </div>
    );
}
}

export default Animal;