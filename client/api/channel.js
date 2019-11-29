import { server_url } from '../config.js';
const queryString = require('query-string');

/**
* API makes PUT request to create channel in db
* 
* @param {*} url API url for user with id
* @param {*} data The code to input into db
*/
export async function createChannel(host_username, join_code) {

  // If channel exists for host, just join instead
  const channel_info = await fetch(
    `${server_url}/channel/username?username=${host_username}`
  )

  let infoText = await channel_info.text();
  let infoJSON = await queryString.parse(infoText);

  // If response returned a join code also
  if (infoJSON.id) {
    return infoJSON
  }
  else{
    // Default options are marked with *
    const response = await fetch(
      `${server_url}/channel/create?username=${host_username}&join_code=${join_code}`,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

    let responseText = await response.text();
    let responseJSON = await queryString.parse(responseText);
    return responseJSON;
  }
}

/**
* API makes PUT request to delete channel in db
* 
* @param {*} url API url for user with id
* @param {*} data The code to input into db
*/
export async function deleteChannel(channel_id) {
  // Default options are marked with *
  const response = await fetch(
    `${server_url}/channel/remove?id=${channel_id}`,
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
* API makes PUT request to join channel in db
* 
* @param {*} url API url for user with id
* @param {*} data The code to input into db
*/
export async function joinChannel(join_code) {
  try {
    let response = await fetch(`${server_url}/channel/code/${join_code}`);
    let responseText = await response.text();
    let responseJSON = await JSON.parse(responseText);
    console.log(responseJSON);

    // Check if response empty
    // If empty return null
    if (responseJSON.length == 0) {
      return null;
    } 
    // TODO: update user in db to join channel

    // return channel_id
    return responseJSON[0].id;
  } catch (error) {
    console.error(error);
  }
}