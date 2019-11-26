const config = require('./config');
const Pool = require('pg').Pool;
var querystring = require("querystring");

const pool = new Pool({
    user: global.gConfig.database.user,
    host: global.gConfig.database.host,
    database: global.gConfig.database.database,
    password: global.gConfig.database.password,
    port: global.gConfig.database.port,
})

/**
 * GET /songs_channel_id
 * @param {} request 
 * @param {*} response 
 */
const getChannelSongsByChannelId = (request, response) => {
    const channel_id = request.query.channel_id;
    pool.query('SELECT * FROM songs WHERE channel_id = $1 ORDER BY priority ASC', [channel_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
};


/** GET /max_priority
 * 
 * Returns max priority of current channel
 * Returns 0 if no song in channel
 * @param {*} request 
 * @param {*} response 
 */
const getMaxPriorityOfChannel = (request, response) => {
    const channel_id = request.query.channel_id;
    pool.query('SELECT priority FROM songs WHERE channel_id = $1 ORDER BY priority DESC', [channel_id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length == 0) {
            response.status(200).json(0);
        }
        else {
            response.status(200).json(results.rows[0].priority)
        }
    })
}

/**
 * DELETE /song_channel_id
 * @param {*} request 
 * @param {*} response 
 */
const deleteSongByChannelId = (request, response) => {
    const channel_id = request.query.channel_id;
    const track_id = request.query.song_id;
    pool.query('DELETE FROM songs WHERE channel_id = $1 AND track_id = $2', [channel_id, track_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    });
}

/**
 * DELETE /song/del_songs_channel_id
 * @param {} request 
 * @param {*} response 
 */
const deleteSongsByChannelId = (request, response) => {
    const channel_id = request.query.channel_id;
    pool.query('DELETE FROM songs WHERE channel_id = $1', [channel_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    });
}



// GET (/song/:id)
const getSongById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM songs WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// GET (/song/:channel_id)
const getSongByChannelId = (request, response) => {
    const channel_id = parseInt(request.params.channel_id)

    pool.query('SELECT * FROM songs WHERE channel_id = $1', [channel_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * POST (/song/create)
 * @param {*} request 
 * @param {*} response 
 * curl --header "Content-Type: application/json" --request POST --data '{"channel_id":"4d":'20', "artist_name":"Chris Breezy", "song_name":"No Guidance","song_uri":"2","album_artwork":"4"}' 'http://localhost:3000/song/create'
 */
const createSong = (request, response) => {
    console.log(request.body);
    const { channel_id, priority, track_id, artist_name, song_name, song_uri, album_artwork } = request.body
    pool.query('SELECT FROM songs WHERE channel_id = $1 AND track_id = $2', [channel_id, track_id],
            (error,results) => {
                if (error) {
                    throw error
                }
                if (results.rows.length == 0) {
                    //response.status(200).json(0);
                    pool.query('INSERT INTO songs (channel_id, priority, track_id, artist_name, song_name, song_uri, album_artwork) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                            [channel_id, priority, track_id, artist_name, song_name, song_uri, album_artwork],
                            (error, results) => {
                                if (error) {
                                    throw error
                                }
                                response.status(201).send(`Song added to channel ID: ${results.channel_id}`)
                            });
                }
                else {
                    response.status(200).json(results.rows[0].priority)
                }
            });

    
}


// PUT (/song/:id)
const updateSong = (request, response) => {
    const id = parseInt(request.params.id)
    const { votes, voteskip } = request.body

    pool.query(
        'UPDATE songs SET votes = $1, voteskip = $2 WHERE id = $3',
        [votes, voteskip, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Song modified with ID: ${id}`)
        }
    )
}

// DELETE (/song/:id)
const deleteSong = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM songs WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Song deleted with ID: ${id}`)
    })
}


module.exports = {
    getSongById,
    getSongByChannelId,
    createSong,
    updateSong,
    deleteSong,
    getChannelSongsByChannelId,
    deleteSongByChannelId,
    deleteSongsByChannelId,
    getMaxPriorityOfChannel
}