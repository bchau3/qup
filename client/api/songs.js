import { server_url } from '../config.js';
const queryString = require('query-string');

/**
 * GET
 * @param {*} channel_id 
 */
export function getChannelSongsByChannelId(channel_id) {
    return fetch({ server_url }.server_url + '/song/get_songs_channel_id' + { channel_id }.channel_id)
    .then((response) => response.json())
    .then((responseJSON) => {
        console.log(responseJSON)
        return responseJSON;
    })
    .catch((error) => {
        console.error(error);
    });
}

/**
 * DELETE
 * @param {*} channel_id 
 * @param {*} track_id 
 */
export function deleteSongsByChannelId(channel_id) {
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
export function deleteSongByChannelId(channel_id, track_id) {
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