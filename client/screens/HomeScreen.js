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
//import { createAppContainer } from 'react-navigation'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

//import SongQueue from '../components/SongQueue';
import LinksScreen from './LinksScreen';
import ChannelScreen from './ChannelScreen';
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

            <Button title='Create Channel' onPress={() => { navigate('LL') }} />
            <Button title='Join Channel' onPress={() => { navigate('Channelss') }} />

          </View>
        </ScrollView>
      </View>
    );
  }
}



// having these class in the same file with HomeScreen will solve
// the issue which we have head bar stacked up
/* under each class, in static navigationOptions
      we can design the layout of the page
      Notice, some of them has property: header: null
      it means that the header bar where back button localed will be removed on that page
      In that case, we will use a button with onPress={()=>{this.props.navigation.goBack(null)}}
      to go back to previous page
*/

// LLL = LinkScreen
class LLL extends React.Component {

  static navigationOptions = {
    title: 'LINK2',
    header: null,
  }

  render(){ 
    const {navigate} = this.props.navigation;
    return (

    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        

        <View style={styles.getStartedContainer}> 
          <Text>!PLEASE LINK YOUR SPOTIFY ACCOUNT!</Text>
          <Button title='Link Account2' onPress={()=>{navigate('CC')}}/>
          <Button title='I DONT WANNA2' onPress={()=>{this.props.navigation.goBack(null)}}/>

        </View>
      </ScrollView>  
    </View>
  );
  }
}

// Check = SignIn
class Check extends React.Component {
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

// ChannelSS = ChannelScreen
class ChannelSS extends React.Component {
  
  static navigationOptions = () => ({
    //header: null,
    title: "FIND A CHANNEL TO JOIN",
  });
  
    render() {
    return (
    <ScrollView style={styles.container}>
       
       <View style={styles.getStartedContainer}> 
         
          <Button title='THIS IS THIS THE CHANNEL U WANTED :)' onPress={()=>{this.props.navigation.navigate('Queue')}}/>

        </View>

       <Text style={styles.todoText}>
            TODOS:Find Channels To Join
        </Text>
        <Text style={styles.todoText}>
            1.  enter invitation link? 
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
///////////////////////////////


// Used to assign screens to a variable which are used to connect screens
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Channelss: ChannelSS,
    Links: LinksScreen,
    LL: LLL,
    CC: Check,
    Host: HostQueueScreen,
    Queue: ChannelQueueScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

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
