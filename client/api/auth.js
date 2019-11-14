import { server_url } from '../config.js';


/**
 * Function to get all user information and update with new code
 * Calls PUT api to update user in database
 * 
 * @param {*} code The spotify code to store
 * @param {*} id The id of user to store code to
 */
export async function storeCodeAtId(code, id){
    try {
        let users = await getUserWithId(id);

        users[0].code = code;

        let user = users[0];
        console.log({server_url}.server_url + "/user/")
        user = await putCode({ server_url }.server_url + '/user/' + {id}.id, {
            channel_id: user.channel_id,
            code: user.code,
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