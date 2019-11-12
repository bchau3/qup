import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

// for screen switch 
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

// import both HostqueueScreen and ChannelQueuScreen
import HostQueueScreen from './HostQueueScreen';
import ChannelQueueScreen from './ChannelQueueScreen';


// HomeScreen
class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'WELCOME',
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>

            <Button title='Create Channel' onPress={() => { navigate('Links') }} />
            <Button title='Join Channel' onPress={() => { navigate('Channels') }} />

          </View>
        </ScrollView>
      </View>
    );
  }
}


/* under each class, in static navigationOptions
      we can design the layout of the page
      Notice, some of them has property: header: null
      it means that the header bar where back button localed will be removed on that page
      In that case, we will use a button with onPress={()=>{this.props.navigation.goBack(null)}}
      to go back to previous page
*/

/* Need to delete LinksScreen.js file to make this work
 * LinksScreen:
 *    Screen promoteS user to link account to Spotify server.
 *    When user agrees to link account, switch to SignInScreen.
 *    When user refused to link account, switch to HomeScreen.
 */
class LinksScreen extends React.Component {

  static navigationOptions = {
    title: 'LINK2',
    header: null,
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>


          <View style={styles.getStartedContainer}>
            <Text>!PLEASE LINK YOUR SPOTIFY ACCOUNT!</Text>
            <Button title='Link Account' onPress={() => { navigate('SignIn') }} />
            <Button title='I DONT WANNA' onPress={() => { this.props.navigation.goBack(null) }} />

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
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text>!SIGN ME IN!</Text>
            <Button title='SUCCESS' onPress={() => { alert('SUCC IT!!!!! :)'), this.props.navigation.navigate('Host') }} />
            <Button title='OOPS NO' onPress={() => { alert('failed to link your account'), this.props.navigation.goBack(null) }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

/* ChannelScreen:
 *    ChannelScreen promote user to enter a invitation code to join an existing channel
 *    If successful, switch ChannelQueueScreen. Otherwise, ask user to enter code again.
 *    Having back button for user to go back to home page of the app
 */
class ChannelScreen extends React.Component {

  static navigationOptions = () => ({
    header: null,
    title: "FIND A CHANNEL TO JOIN",
  });

  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.getStartedContainer}>

          <Button title='THIS IS THIS THE CHANNEL U WANTED :)' onPress={() => { this.props.navigation.navigate('Queue') }} />
          <Button title='Go Back' onPress={() => { this.props.navigation.goBack(null) }} />
        </View>

        <Text style={styles.todoText}>
          TODOS:Find Channels To Join
        </Text>
        <Text style={styles.todoText}>
          1.  enter invitation code?
        </Text>
        <Text style={styles.todoText}>
          2.  comfirmation of joining the channel
        </Text>
        <Text style={styles.todoText}>
          3.  switch to queue screen
        </Text>
        <Text style={styles.todoText}>
          4.  button to refresh the channel list
        </Text>
        <Text style={styles.todoText}>
          5.  if user is banned, show alert
        </Text>


      </ScrollView>
    );
  }
}

// Used to assign screens to a variable which are used to connect screens
const ScreenStack = createStackNavigator(
  {
    Home: HomeScreen,
    Channels: ChannelScreen,
    Links: LinksScreen,
    SignIn: SignInScreen,
    Host: HostQueueScreen,
    Queue: ChannelQueueScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(ScreenStack);

export default AppContainer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    backgroundColor: "black",
  },
  getStartedContainer: {
    fontSize: 20,
    backgroundColor: "white",
    alignItems: 'center',
    marginHorizontal: 0,
    marginVertical: 90
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  buttonSize: {
    fontSize: 100,
    width: 100,
    height: 100,
    color: '#2e78b7'
  }
});
