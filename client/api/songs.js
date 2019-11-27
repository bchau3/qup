import { server_url } from '../config.js';
const queryString = require('query-string');

/**
 * GET
 * @param {*} channel_id 
 */
export async function getChannelSongsByChannelId(channel_id) {
    let response = await fetch(`${ server_url }/song/get_songs_channel_id?channel_id=${ channel_id }`);
    // console.log(resp onse);
    let responseText = await response.text();
    let responseJSON = await JSON.parse(responseText);
    console.log(responseJSON);
    
}

/**
 * DELETE
 * @param {*} channel_id 
 * @param {*} track_id 
 */
export async function deleteSongsByChannelId(channel_id) {
    const response = await fetch(
        `${server_url}/song/remove?channel_id=${channel_id}`,
        {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      let responseText = await response.text();
      let responseJSON = await queryString.parse(responseText);
      console.log(responseJSON);
      return responseJSON;
}

/**
 * DELETE
 * @param {} channel_id 
 * @param {*} track_id 
 */
export async function deleteSongByChannelId(channel_id, track_id) {
    const response = await fetch(
        `${server_url}/song/remove?channel_id=${channel_id}&track_id=${track_id}`,
        {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      let responseText = await response.text();
      let responseJSON = await queryString.parse(responseText);
      console.log(responseJSON);
      return responseJSON;
}

export async function addSong(channel_id, data = {}){
  // Get Maximum priority in channel currently
  let response_max = await fetch(`${server_url}/song/max_priority?channel_id=${channel_id}`)
  let responseText = await response_max.text();
  let responseJSON = await JSON.parse(responseText);

  console.log(responseJSON);

  let added_data = data;
  added_data.channel_id = channel_id;
  added_data.priority = responseJSON + 1;

  // Default options are marked with *
  const response = await fetch(
    `${server_url}/song/create`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(added_data) // body data type must match "Content-Type" header
  });
  return await response; // parses JSON response into native JavaScript objects
}