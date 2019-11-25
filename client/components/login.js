import React, { Component } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AuthSession, apisAreAvailable } from "expo";

import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import HostQueueScreen from '../screens/host_queue_screen';

// Authentication APIs
import { storeCodeAtId, getAuthToken } from "../api/auth.js";

// Get server info from config file
import { server_url } from "../config.js";

export default class Login extends Component {
  state = {
    userInfo: null,
    code: null,
    access_token: null,
    refresh_token: null,
    name: null,
    email: null,
    username: null,
  };

  static navigationOptions = {
    title: 'Login Screen',
    header: null,
  }

  render() {
    return (
      <View style={styles.getStartedContainer}>
        {!this.state.code ? (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={
              this._handlePressAsync
            }
            underlayColor="#fff"
          >
            <Text style={styles.buttonText}>Link Account</Text>
          </TouchableOpacity>
        ) : (
            () => {this.props.navigation.navigate('HOST')}
      )}
      </View>
    );
  }

  // Handle Printing Info
  // This info is printed after authentication
  _renderUserInfo = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text>Name: {this.state.name}</Text>
        <Text>Email: {this.state.email}</Text>
        <Text>Id: {this.state.username}</Text>
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
      refresh_token: authInfo.refresh_token,
      name: authInfo.display_name,
      email: authInfo.email,
      username: authInfo.id
    });
  };

  // Clear userInfo to restart auth process
  clearInfo = () => {
    this.setState({ code: null, access_token: null, refresh_token: null });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89Cff0"
  },
  contentContainer: {
    paddingTop: 30
  },
  getStartedContainer: {
    fontSize: 20,
    backgroundColor: "#89CFF0",
    alignItems: "center",
    marginHorizontal: 0,
    marginVertical: 30
  },
  todoText: {
    textAlign: "left",
    fontSize: 15
  },
  buttonStyle: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffb6c1",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
    width: 200
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15
  }
});