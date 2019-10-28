const Pool = require('pg').Pool
// Move to seperate file outside version control
// For production environment
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'qup',
  password: 'password',
  port: 5432,
})

// GET (/user/:id)
// Return attributes of specific user
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// GET (/user/:channel_id)
// Return all users from specific channel
const getUsersByChannelId = (request, response) => {
  const channel_id = parseInt(request.params.channel_id)
  
  pool.query('SELECT * FROM users WHERE channel_id = $1', [channel_id], (error, results) => {
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// POST (/user)
// Create new user
const createUser = (request, response) => {
  const { name, email } = request.body
  
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}


// PUT (/user/:id)
// Update user with specific id
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, channel_id } = request.body
  
  pool.query(
    'UPDATE users SET name = $1, email = $2, channel_id = $3 WHERE id = $4',
    [name, email, channel_id, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
    )
  }
  
  // PUT (/user/remove/:id)
  // Remove user from channel
  const removeUserFromChannel = (request, response) => {
    const id = parseInt(request.params.id)
    const nullChannel = null
    const { channel_id } = request.body
    
    pool.query(
      'UPDATE users SET channel_id = $1 WHERE id = $2',
      [nullChannel, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
      )
    }
    
    // DELETE (/users/:id)
    const deleteUser = (request, response) => {
      const id = parseInt(request.params.id)
      
      pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
      })
    }
    
    module.exports = {
      getUserById,
      getUsersByChannelId,
      createUser,
      updateUser,
      removeUserFromChannel,
      deleteUser,
    }