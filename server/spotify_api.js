var request = require("request"); // "Request" library
const userDB = require("./user_queries");

function getUserData(code, redirect_uri, access_token, callback) {
  console.log("access_token in getUserData" + access_token);

  var options = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + access_token },
    json: true
  };

  // use the access token to access the Spotify Web API
  request.get(options, function(error, response, body) {
    callback(body);
  });
}

module.exports = {
  getUserData
};
