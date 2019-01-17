import React from 'react';

/**
 * @property {String} descriptionText
 * @property {function} setDescriptionText - changes the description text of the match
 */
export class DescriptionModifier extends React.Component{
    
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
                <textarea onChange={this.handleChange}>{this.props.descriptionText}</textarea>
            </div>
        )
    }
}