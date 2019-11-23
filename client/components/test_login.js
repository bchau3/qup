import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { AuthSession, apisAreAvailable } from "expo";

// Authentication APIs
import { storeCodeAtId, getAuthToken } from "../api/auth.js";

// Get server info from config file
import { server_url } from "../config.js";

export default class TestLogin extends Component {
  state = {
    userInfo: null,
    code: null,
    access_token: null,
    refresh_token: null
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {!this.state.code ? (
          <Button title="Open Spotify Auth" onPress={this._handlePressAsync} />
        ) : (
          this._renderUserInfo()
        )}
      </View>
    );
  }

  // Handle Printing Info
  // This info is printed after authentication
  _renderUserInfo = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text>Code: {this.state.code.code} </Text>
        <Text>State: {this.state.code.state} </Text>
        <Text>AccessToken: {this.state.access_token}</Text>
        <Text>RefreshToken: {this.state.refresh_token}</Text>
        <Button title="Get Auth Token"> </Button>
        <Button title="Refresh Auth Token"> </Button>
        <Button onPress={this.clearInfo} title="Clear info">
          {" "}
        </Button>
      </View>
    );
  };

  // Handle Login
  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();

    // You need to add this url to your authorized redirect urls on your Spotify dashboard
    console.log({
      redirectUrl
    });

    // Make request
    let result = await AuthSession.startAsync({
      authUrl: `${server_url}/login/` + `${encodeURIComponent(redirectUrl)}`
    });

    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }

    // Params has format {code: "", state: ""}
    console.log(result.params);
    this.setState({ code: result.params });

    // Get accessToken from code
    let authInfo = await getAuthToken(result.params.code, redirectUrl);

    //TODO: Remove auth tokens from client side. This is just for testing purposes
    this.setState({
      access_token: authInfo.access_token,
      refresh_token: authInfo.refresh_token
    });
  };

  // Clear userInfo to restart auth process
  clearInfo = () => {
    this.setState({ code: null, access_token: null, refresh_token: null });
  };
}
