import React from 'react';

/**
 * @property {memberObject} result
 */
export class StaffResult extends React.Component{


    render(){
        const result = this.props.result;
        const defaultSrc = 'https://tse2.mm.bing.net/th?id=OIP.nQYD3lChVEa1OA3nML4LwgHaGF&pid=Api';
        if (result){ //s'il y a déjà un arbitre
            const link = '/user/'+result.id;
            return(
                <div className='staffResult'>
                    <img src={result.photoId} onClick={() => window.location=link}/>
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