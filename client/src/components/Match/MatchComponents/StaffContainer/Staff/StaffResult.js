import React from 'react';
import {UserPhoto} from '../../../../User/UserPhoto';
/**
 * @property {memberObject} result
 */
export class StaffResult extends React.Component{


    render(){
        const result = this.props.result;
        const defaultSrc = 'https://tse2.mm.bing.net/th?id=OIP.nQYD3lChVEa1OA3nML4LwgHaGF&pid=Api';
        if (result){ //s'il y a déjà un arbitre
            const link = '/user/'+result._id;
            return(
                <div className='staffResult'>
                    <UserPhoto photoId={result.photoId} onClick={() => window.location=link}/>
                    <h2>{result.firstName+' '+result.familyName}</h2>
                </div>
            )
        }
        else {
            return(
                <div className='staffResult'>
                    <img src={defaultSrc} alt='default'/>
                    <h2>Le Staffeur Inconnu</h2>
                </div>
            )
        }
    }
}