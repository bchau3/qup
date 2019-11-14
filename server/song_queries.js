const config = require('./config');
const Pool = require('pg').Pool

const pool = new Pool({
    user: global.gConfig.database.user,
    host: global.gConfig.database.host,
    database: global.gConfig.database.database,
    password: global.gConfig.database.password,
    port: global.gConfig.database.port,
})


// GET (/song/:id)
const getSongById = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT * FROM songs WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// GET (/song/:channel_id)
const getSongByChannelId = (request, response) => {
    const channel_id = parseInt(request.params.channel_id)
    
    pool.query('SELECT * FROM songs WHERE channel_id = $1', [channel_id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// POST (/song/:channel_id)
const createSong = (request, response) => {
    const channel_id = parseInt(request.params.channel_id)
    const { track_id, votes, voteskip } = request.body
    
    pool.query('INSERT INTO songs (track_id, channel_id, votes, voteskip) VALUES ($1, $2, $3, $4)', [track_id, channel_id, votes, voteskip], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Song added with ID: ${results.insertId}`)
    })
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
 }