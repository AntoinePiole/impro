import React from 'react';
import {Button} from 'react-bootstrap';

export class ParticipationButton extends React.Component{

    constructor(props){
        super(props);
        this.state = {participating: this.props.participating};
        this.postulate = this.postulate.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    cancel(){
        this.props.cancel();
        this.setState({participating: false});
    }

    postulate(){
        this.props.postulate();
        this.setState({participating: true});
    }
    render(){
        
        return (
            this.state.participating ?
            <Button onClick={this.cancel}>{'Je ne veux pas être ' + this.props.role}</Button> :
            <Button onClick={this.postulate}>{'Je veux être ' + this.props.role}</Button>  
            )      
    }

}