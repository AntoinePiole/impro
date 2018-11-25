import React from 'react';

export class SearchField extends React.Component{
    
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(document.getElementById('searchField').value);
        this.props.changeInput(document.getElementById('searchField').value); //change la valeur de state.input dans Search Result Container
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} value={this.props.value}>
                <input type='text' placeholder='Search' className='searchField' id='searchField'/> {/* ?Q? pourquoi le form.value est pas égal tout seul à input.value ? */}
                <button type='submit'>CHERCHER</button>
            </form>
        )
    }
}