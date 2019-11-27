import { server_url } from '../config.js';
const queryString = require('query-string');

export async function playSong(channel_id) {
    const response = await fetch(
        `${server_url}/play?channel_id=${channel_id}`,
        {
            method: 'PUT',
        }
    )
}