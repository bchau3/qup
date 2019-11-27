import { server_url } from '../config.js';
const queryString = require('query-string');

/**
* Function to get all user information and update with new code
* Calls PUT api to update user in database
* 
* @param {*} code The spotify code to store
* @param {*} id The id of user to store code to
*/
export async function storeRefreshAtId(refresh_token, id){
    try {
        let users = await getUserWithId(id);
        let user = users[0];
        
        user.refresh_token = refresh_token;
        
        console.log({server_url}.server_url + "/user/")
        user = await putCode({ server_url }.server_url + '/user/' + {id}.id, {
            channel_id: user.channel_id,
            refresh_token: user.refresh_token,
            email: user.email,
            name: user.name
        });
    } catch (error) {
        console.error(error);
    }
}


/** 
* API to make GET request of user in db with 'id'
* 
* @param {*} id id of user to get db entry of
*/
export function getUserWithId(id) {
    return fetch({ server_url }.server_url + '/user/' + { id }.id)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
        return responseJson;
    })
    .catch((error) => {
        console.error(error);
    });
}

/**
* API makes PUT request to update user in db
* 
* @param {*} url API url for user with id
* @param {*} data The code to input into db
*/
export async function putCode(url = '', data = {}){
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response; // parses JSON response into native JavaScript objects
}


// get token from server
// store 

export async function getAuthToken(code, redirect_url) {
    console.log(code + " " + redirect_url);

    const encodedCode = encodeURIComponent(code);
    const encodedRedirect_url = encodeURIComponent(redirect_url);

    try {
        let response = await fetch(
            `${server_url}/callback?code=${encodedCode}&redirect_uri=${encodedRedirect_url}`
        );
        let responseText = await response.text();
        let responseJSON = await queryString.parse(responseText);
        console.log(responseJSON);
        return responseJSON;
    } catch(error){
        console.error(error);
    }
}



// Example API Call
// putCode = async (url = '', data = {}) => {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'PUT', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrer: 'no-referrer', // no-referrer, *client
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return await response.json(); // parses JSON response into native JavaScript objects
// }