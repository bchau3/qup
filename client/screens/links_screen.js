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
          <View style={styles.container}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.getStartedContainer}>
                <Text>Link your Spotify Premium Account!</Text>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    navigate("SIGNIN");
                  }}
                  underlayColor="#fff"
                >
                  <Text style={styles.buttonText}>Link Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.props.navigation.goBack(null);
                  }}
                  underlayColor="#fff"
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        );
    }
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
            <TestLogin/>
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