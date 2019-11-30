import React from 'react';
import {
    AppRegistry,    // change background color
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    AsyncStorage
} from 'react-native';

import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import HostQueueScreen from './host_queue_screen';

import { AuthSession, apisAreAvailable } from "expo";

// Authentication APIs
import { storeCodeAtId, getAuthToken } from "../api/auth.js";

import {createChannel} from "../api/channel";
import { styles } from '../style/link_screen_style';
// Get server info from config file
import { server_url } from "../config.js";
import { LinearGradient } from 'expo-linear-gradient';

/*
 * LinksScreen:
 *    Screen promoteS user to link account to Spotify server.
 *    When user agrees to link account, switch to SignInScreen.
 *    When user refused to link account, switch to HomeScreen.
 */
class LinksScreen extends React.Component {

    static navigationOptions = {
        title: 'Link Account',
        header: null,
    }
}

class LoginScreen extends React.Component {
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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.scrollViewContainer}>
          {/* <View style={styles.LinkScreenContainer}> */}
          <LinearGradient
                        colors={['#101227', '#ff3fc9']}
                        start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 6.5 }}
                        style={styles.LinkScreenContainer}
          >
            {/* Import Image */}
            <View style={{paddingBottom: 25}}>
            <Image
              source={require("../assets/images/spotifyLogo.png")}
              style={styles.imageStyle} />
            </View>
            <Text style={styles.textStyleLink}>Link to your</Text>
            <View styel={{paddingBottom:15}}>
              <Text style={styles.textStyleLink}>Spotify premium account</Text>
            </View>

            {/* Conditional Operator */}
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
                navigate("HOST")
              )}
            <TouchableOpacity
              style={styles.buttonStyle2}
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              underlayColor="#fff"
            >
              <Text style={styles.buttonText2}>Cancel</Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* </View> */}
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

    // Create Channel
    let join_code = shareCodeGenerator();
    let resp = await createChannel(this.state.username, join_code);
    let channel_id = resp.id

    // Store ifnormation in AsyncStorage
    this._storeUserInfo(this.state.username, this.state.email, join_code, channel_id);
  };

  _storeUserInfo = async (username, email, join_code, channel_id) => {
    try{
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('join_code', join_code);
      await AsyncStorage.setItem('channel_id', channel_id);
    } catch (error) {
      // Error storing data
      console.log(error.message);
    }
  }

  // Clear userInfo to restart auth process
  clearInfo = () => {
    this.setState({ code: null, access_token: null, refresh_token: null });
  };
}

function shareCodeGenerator() {
  var shareCode = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 4; i++) {
    shareCode += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return shareCode;
}


const HostFlow = createStackNavigator(
    {
        LOGIN: LoginScreen,
        HOST: HostQueueScreen,
    },
    {
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(HostFlow);

export default AppContainer;

