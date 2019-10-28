const express = require('express')
const bodyParser = require('body-parser')
const userDB = require('./user_queries')
const channelDB = require('./channel_queries');
const songDB = require('./song_queries');
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'})
})
app.get('/users', userDB.getUsers)
app.get('/users/:id', userDB.getUserById)
app.post('/users', userDB.createUser)
app.put('/users/:id', userDB.updateUser)
app.delete('/users/:id', userDB.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
