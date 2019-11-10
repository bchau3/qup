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
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import SongQueue from '../components/SongQueue';
import LinksScreen from './LinksScreen';
import ChannelScreen from './ChannelScreen';


class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'WELCOME',
  }

  render(){ 
    const {navigate} = this.props.navigation;
    return (

    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        

        <View style={styles.getStartedContainer}> 
         
          <Button title='Create Channel' onPress={()=>{navigate('Links')}}/>
          <Button title='Join Channel' onPress={()=>{navigate('Channels')}}/>

        </View>
      </ScrollView>  
    </View>
  );
  }
}

// createStackNavigator + creastAppCOntainer for screen switches
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Channels: ChannelScreen,
    Links: {
      screen: LinksScreen,
      navigationOptions: () => ({headerBackTitle: null}),
    }
  },
  {
    initialRouteName: 'Home',
  }
);
const AppContainer = createAppContainer(RootStack);

export default AppContainer;

/*export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}*/


function creation11 (){
  alert('PLEASE LINK YOUR SPOTIFY ACCOUNT');
}

function membership11 (){
  alert('PLEASE SELECTE A CHANNEL TO JOIN');
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getSongsFromApiAsync(){
  return fetch('http://192.168.0.136:3000/users')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      return responseJson;
    })
    .catch((error) =>{
      console.error(error);
    });
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

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
    backgroundColor:"black",
  },
  getStartedContainer: {
    fontSize:20,
    backgroundColor:"white",
    alignItems: 'center',
    marginHorizontal: 0,
    marginVertical:90
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
    fontSize:100,
    width:100,
    height:100,
    color: '#2e78b7'
  }
});
