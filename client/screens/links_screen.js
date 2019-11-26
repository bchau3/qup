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
  Button
} from 'react-native';

import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import HostQueueScreen from './host_queue_screen';
import TestLogin from '../components/test_login';
import { styles } from '../style/link_screen_style';
import { Overlay } from 'react-native-elements';

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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.scrollViewContainer}>

        <View style={styles.LinkScreenContainer}>
          <View style={{paddingBottom: 30}}>
            <Image 
              source={require("../assets/images/spotifyLogo.png")}
              style={styles.imageStyle}
            />
          </View>

          <Text style={styles.textStyleLink}>Link to your</Text>
          <View style={{paddingBottom: 15}}><Text style={styles.textStyleLink}>Spotify premium account!</Text>
          </View>
          
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              generateCode(),
              navigate("SIGNIN");
            }}
            underlayColor="#fff"
          >
            <Text style={styles.buttonText}>Link</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.buttonStyle2}
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          >
            <Text style={styles.buttonText2}>Cancel</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

function generateCode(){
  alert('code: 12345');
}

/* SignInScreen: 
 *   Screen where user links account and should automatically switch to HostQueueScreen
 *   if successful, otherwise return to previous page (LinksScreen)
 */
class SignInScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text>Provide login credentials!</Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                alert("Successfully linked account!"),
                  this.props.navigation.navigate("HOST");
              }}
              underlayColor="#fff"
            >
              <Text style={styles.buttonText}>Success!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                alert("Failed to link your account..."),
                  this.props.navigation.goBack(null);
              }}
              underlayColor="#fff"
            >
              <Text style={styles.buttonText}>Fail!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TestLogin />
      </View>
    );
  }
}


const HostFlow = createStackNavigator(
  {
    LINK: LinksScreen,
    SIGNIN: SignInScreen,
    HOST: HostQueueScreen,
  },
  {
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(HostFlow);

export default AppContainer;

