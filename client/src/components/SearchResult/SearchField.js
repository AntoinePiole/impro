import React from 'react';

export class SearchField extends React.Component{
    
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e){
        e.preventDefault();
        this.props.changeInput(e.target.value);
    }

    render(){
        return(
            <input type='text' placeholder='Search' className='searchField' onChange={this.handleChange} /> /* ?Q? pourquoi le form.value est pas égal tout seul à input.value ? */
        )
    }
}