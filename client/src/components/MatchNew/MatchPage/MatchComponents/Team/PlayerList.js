import React from 'react';
import { Button } from 'react-bootstrap';
import { ResultList } from '../../../../SearchResult/ResultList';


/**
 * @property {userObject array} participantsList - list of league members playing this mach with this league
 */
export class PlayerList extends React.Component {

    constructor (props){
        super (props);
        this.state = {displayParticipants: false};
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event){
        this.setState({displayParticipants : !this.state.displayParticipants});
    }

    toRender(){
        return (
            <ResultList results={this.props.participantsList} type='user'/>
        )
    }


    render(){
        const arrowDown = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Octicons-triangle-down.svg/768px-Octicons-triangle-down.svg.png'; //logo of an arrow pointing down
        const arrowUp = 'https://cdn4.iconfinder.com/data/icons/geomicons/32/672416-triangle-up-512.png'; //logo of an arrow pointing up    
        const buttonImage = this.state.displayParticipants ? arrowDown:arrowUp;
        return (
            <div>
                <h2>Participants</h2>
                <span><Button className='showParticipants' onClick={this.handleClick}><img src={buttonImage}/></Button></span>
                {this.state.displayParticipants ?
                    <div className = 'participants'>
                        {this.toRender()}
                    </div>
                    : null
                }
            </div>
        )
    }
}