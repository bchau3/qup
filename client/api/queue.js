import { server_url } from '../config.js';
const queryString = require('query-string');
//import {getHostAccessToken} from '/../../server/index.js';

export function getChannelSongURI(channel_id) {
    // Get Songs in channel
    return fetch(`${server_url}/song/get_channel_song_uri?channel_id=${channel_id}`)
    .then((response) => response.json())
    .then((responseJSON) => {
        console.log(responseJSON);
        return responseJSON;
    })
    .catch((error) => {
        console.error(error);
    })
}

// export async function playSong(channel_id, data = {}){
//     let data = getChannelSongURI(channel_id);
//     console.log(data);
  
//     // Default options are marked with *
//     const response = await fetch(
//       `${server_url}/play?channel_id=${channel_id}`, {
//       method: 'PUT', // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return await response; // parses JSON response into native JavaScript objects
// }

export async function playSong(channel_id) {
    const response = await fetch(
        `${server_url}/play?channel_id=${channel_id}`,
        {
            method: 'PUT',
        }
    )
}