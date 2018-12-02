import React from 'react';

/**
 * @property {boolean} isModifying - true if modification mode
 * @property {String} descriptionText
 * @property {function} setDescriptionText - changes the description text of the match
 */
export class Description extends React.Component{
    
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const text = event.target.value;
        this.props.setDescriptionText(text);
    }


    render(){
        return (
            <div>
            {this.props.isModifying ? 
                <textarea onChange={this.handleChange}>{this.props.descriptionText}</textarea> :
                <p>{this.props.descriptionText}</p>
            }
            </div>
        )
    }
}