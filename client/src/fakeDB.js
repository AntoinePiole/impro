const romeo = {
    id: 1,
    mail: 'ro@fr.com',
    password: 'roro',
    phone: 810,
    familyName: 'Sandoz',
    firstName: 'Romeo',
    username: 'Roro',
    birthday: '08/10/1997',
    creationDate: '30/11/2018',
    photoId: 'https://tse3.mm.bing.net/th?id=OIP.2eTintwozCkDv-zsDUBO3gHaEz&pid=Api'
}


const antoine = {
    id: 2,
    mail: 'ant@fr.com',
    password: 'antant',
    phone: 918,
    familyName: 'Piole',
    firstName: 'Antoine',
    username: 'AntPo',
    birthday: '24/04/1997',
    creationDate: '20/08/2017',
    photoId: 'https://tse2.mm.bing.net/th?id=OIP.pIVFv3OZ4bAo0KfrKBiKBwHaFj&pid=Api'
}

const dave = {
    id:3,
    mail: 'dav@fr.com',
    password: 'davo',
    phone: 418,
    familyName: 'Talb',
    firstName: 'Dave',
    username: 'Davta',
    birthday: '12/09/1995',
    creationDate: '20/08/2017',
    photoId: 'https://tse1.mm.bing.net/th?id=OIP.4llpSpk6V9B4a0TSNg5ZDAHaE8&pid=Api'
}


const ldc = {
    id: 1,
    name: 'Lit de Camp',
    mail: 'ldc@fr.com',
    photoId: 'https://cdn.viarezo.fr/static/image/137762a9dda440027011d47e5c60c5f0cbc23de102830f09c637e8236dcf4e27.jpg',
    members: [{id:1,admin: true},{id:2, admin:false}],  //members[i]={id: String, admin: boolean} 
    receivedMatchRequestIds: [],
    sentMatchRequestIds: []
}

const lolita = {
    id: 2,
    name: 'Lolita',
    mail: 'lo@fr.com',
    photoId: 'https://tse1.mm.bing.net/th?id=OIP.q73V5klGMVsNuiAjnDovzwHaE7&pid=Api',
    members: [{id:1,admin: false},{id:3, admin:true}],  //members[i]={id: String, admin: boolean} 
    receivedMatchRequestIds: [],
    sentMatchRequestIds: []
}

export const match = {
    id: 1,
    name: "Da match",
    status: 'confirmed',  //between [finished, waitingConfirmation, confirmed, canceled]
    admins: [2],
    league1Id: 1,
    league2Id: 2,
    league1Members: [2,3],
    league2Members: [],
    league1MembersPropositions: [1],
    league2MembersPropositions: [],
    referee: 2,
    mc: 3,
    refereePropositions: [],
    mcPropositions: [],
    subscribers: [],
    description: "Wow sacré match",
    date: "22/11/2019",
    location: "Gyv-sur-Ifette",
    score: (0,0)
}

const users = [romeo, antoine, dave];
const leagues = [ldc, lolita];

export const API ={
    
    getLeagueById(id){
        if (id==1) return ldc;
        if (id==2) return lolita;
    },

    getUserById(userId){
        return users.find(
            u => u.id === userId
        )
    },

    addToMatch(userId, matchId, role, waiting){
        const user = users.find(u => u.id===userId);
        if (waiting){
            if (role === 'participant1') match.league1MembersPropositions.push(user);
            else match.league2MembersPropositions.push(user);
        }
        else {
            if (role === 'participant1') match.league1Members.push(user);
            else match.league2Members.push(user);
        }
    },

    patchMatch(matchId, obj){
        Object.keys(obj).forEach(
            key => {match[key]=obj[key]} 
        )

    },

    removeFromMatch(userId, matchId, role, waiting){
        const user = users.find(u => u.id===userId);
        if (waiting){
            if (role === 'participant1') match.league1MembersPropositions.push(user);
            else match.league2MembersPropositions.delete(user);
        }
        else {
            if (role === 'participant1') match.league1Members.push(user);
            else match.league2Members.delete(user);
        }
    }

}
