const express = require("express");
const bodyParser = require("body-parser");
const userDB = require("./user_queries");
const channelDB = require("./channel_queries");
const spotifyAPI = require("./spotify_api");
const songDB = require("./song_queries");

var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var client_id = "77522dbfae304f42a78be67daf372fb7"; // Your client id
var client_secret = "e2ecf0a74a3a4b4a9f29a338e4a4a898"; // Your secret

process.env.NODE_ENV = "development";

const config = require("./config.js");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// app.get('/', (request, response) => {
//     response.json({info: 'Node.js, Express, and Postgres API HAHAHAHAH'})
// })
app.get("/user/:id", userDB.getUserById);
app.get("/user/:channel_id", userDB.getUsersByChannelId);
app.post("/user", userDB.createUser);
app.put("/user/:id", userDB.updateUser);
app.put("/user/remove/:id", userDB.removeUserFromChannel);
app.delete("/user/:id", userDB.deleteUser);
//app.get("/song/:channel_id", songDB.getSongByChannelId);

app.post("/channel/create", channelDB.createChannel);
app.delete("/channel/remove", channelDB.deleteChannel);
app.get("/channel/code/:join_code", channelDB.getChannelByJoinCode);
app.get("/channel/host/:host_id", channelDB.getChannelByHostId);
app.get("/channel/:id", channelDB.getChannelById);

app.get("/song/get_songs_channel_id", songDB.getChannelSongsByChannelId);
app.delete("/song/del_song_channel_id", songDB.deleteSongByChannelId);
app.delete("/song/del_songs_channel_id", songDB.deleteSongsByChannelId);
app.post("/song/create", songDB.createSong);
app.get("/song/max_priority", songDB.getMaxPriorityOfChannel);

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/login/:redirect_uri", function(req, res) {
  const redirect_uri = req.params.redirect_uri;
  console.log(redirect_uri);
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email user-read-playback-state";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get("/callback", function(req, res) {
  // your application requests refresh and access tokens
  const code = req.query.code;
  const redirect_uri = req.query.redirect_uri;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;

      // Store code at user with username in database
      spotifyAPI.getUserData(code, redirect_uri, access_token, function(body) {
        userDB.storeRefreshTokenAtUser(
          body.display_name,
          body.email,
          body.id,
          refresh_token
        );
        // we can also pass the token to the browser to make requests from there
        res.status(201).send(
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            display_name: body.display_name,
            email: body.email,
            id: body.id,
          })
        );
      });
    } else {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "invalid_token"
          })
      );
    }
  });
});

app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

app.listen(global.gConfig.node_port, () => {
  console.log(`App running on port ${global.gConfig.node_port}.`);
});

/**
 *
 * @param {*} channel_id
 * @param {*} callback
 */
function getHostAccessToken(channel_id, callback) {
  userDB.getHostRefreshToken(channel_id, function(refresh_token) {
    // requesting access token from refresh token
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        callback(access_token);
      }
    });
  });
}
//PLAY SONG
const playSong = (req, res) => {
  const channel_id = req.channel_id;

  console.log(`channel_id: ${channel_id}`);
  getHostAccessToken(channel_id, function(access_token) {
    var options = {
      url: `https://api.spotify.com/v1/player/play`,
      headers: { Authorization: "Bearer " + access_token },
      json: true
    };
    // use the access token to access the Spotify Web API
    request.put(options, function(error, response, body) {
      console.log(response);
      res.send(response);
    });
  });
};

app.put("/play", playSong);

const searchSong = (req, res) => {
  const query = req.query.q;
  const channel_id = req.query.channel_id;

  console.log(`query: ${query}`);
  console.log(`channel_id: ${channel_id}`);
  getHostAccessToken(channel_id, function(access_token) {
    var options = {
      url: `https://api.spotify.com/v1/search?q=${query}&type=track&limit=15`,
      headers: { Authorization: "Bearer " + access_token },
      json: true
    };
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
      console.log(response);
      res.send(response);
    });
  });
};

app.get("/search", searchSong);

// Example call to get access_token
// getHostAccessToken(
//     channel_id,
//     function(access_token) {
//         console.log(
//             `access_token: ${access_token}`
//         );
//     }
// );
