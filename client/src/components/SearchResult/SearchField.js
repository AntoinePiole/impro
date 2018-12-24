import React from 'react';
import {Button} from 'react-bootstrap';

export class SearchField extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {queryText:''};
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e){ //here we just change the value of the query text savec in state
        e.preventDefault();
        this.setState({queryText: e.target.value});  
    }

    handleSubmit(e){ //here we change the value of the father, which then displays the results
        e.preventDefault();
        this.props.changeInput(this.state.queryText);
    }

    render(){ 
        return(
            <div>
                <input type='text' placeholder='Search' className='searchField' onChange={this.handleChange} /> /* ?Q? pourquoi le form.value est pas égal tout seul à input.value ? */
                <Button onClick={this.handleSubmit}>Valider</Button>
            </div>
        )
    }
}