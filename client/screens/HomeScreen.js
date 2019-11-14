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
    title: 'Q-Up Login Screen',
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>            
            <Text>Welcome to Q-Up! Please select an option.</Text>
            <Image 
              source={require('./qup_logo.png')}
              style={styles.imageStyle} />               
            <TouchableOpacity
              style = {styles.buttonStyle}
              onPress = {() => {navigate('Links')}}
              underlayColor = '#fff'>
              <Text style = {styles.buttonText}>Create Channel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.buttonStyle}
              onPress = {() => {navigate('Channels')}} 
              underlayColor = '#fff'>
              <Text style = {styles.buttonText}>Join Channel</Text>
            </TouchableOpacity>     
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
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text>Link your Spotify Premium Account!</Text>
            <TouchableOpacity
              style = {styles.buttonStyle}
              onPress = {() => {navigate('SignIn')}} 
              underlayColor = '#fff'>
              <Text style = {styles.buttonText}>Link Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.buttonStyle}
              onPress = {() => { this.props.navigation.goBack(null) }} 
              underlayColor = '#fff'>
              <Text style = {styles.buttonText}>Cancel</Text>
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
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text>Provide login credentials!</Text>
            <TouchableOpacity
              style = {styles.buttonStyle}
              onPress = {() => { alert('Successfully linked account!'), this.props.navigation.navigate('Host')} } 
              underlayColor = '#fff'>
              <Text style = {styles.buttonText}>Success!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.buttonStyle}
              onPress = {() => { alert('Failed to link your account...'), this.props.navigation.goBack(null)} } 
              underlayColor = '#fff'>
              <Text style = {styles.buttonText}>Fail!</Text>
            </TouchableOpacity>
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
    title: "Join Channel",
  });

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.getStartedContainer}>
          <TouchableOpacity
            style = {styles.buttonStyle}
            onPress = {() => { this.props.navigation.navigate('Queue') }} 
            underlayColor = '#fff'>
            <Text style = {styles.buttonText}>Channel Joined</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.buttonStyle}
            onPress = {() => { this.props.navigation.goBack(null)} } 
            underlayColor = '#fff'>
            <Text style = {styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
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
    backgroundColor: '#89Cff0',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    fontSize: 20,
    backgroundColor: "#89CFF0",
    alignItems: 'center',
    marginHorizontal: 0,
    marginVertical: 30
  },
  todoText: {
    textAlign: 'left',
    fontSize: 15
  },
  buttonStyle: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffb6c1',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000000',
    width: 200,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15
  },
  imageStyle: {
    width: 250,
    height: 250,
  }
});
