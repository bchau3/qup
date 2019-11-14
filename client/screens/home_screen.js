import * as React from 'react';
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
  Alert
} from 'react-native';

// for screen switch 
import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

// for stacknaviagtor
import LinksScreen from './links_screen';
import ChannelScreen from './find_channel_screen';


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

          <View style={styles.buttonContainer}>
            <Button title='Create Channel' onPress={() => { navigate('LINKFLOW') }} />
            <Button title='Join Channel' onPress={() => { navigate('CHANNELFLOW') }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

/* 
 * pop up page not used but here as an example for future
 * currently, the pop up page will be replaced by overlay for link and find channel
 * <Button title='POPUP (testing)' onPress={handleCreateChannelPress} /> (<--button)
 */
/*function handleCreateChannelPress() {
  console.log('Create Channel Pressed');
  Alert.alert(
      'To Continue, Please Link Your Spotify Account', null,
      [
          {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
          },
          { text: 'Link', onPress:() => { this.props.navigation.navigate('LINKFLOW') } },
      ],
      { cancelable: true },
  );
}*/

// Used to assign screens to a variable which are used to connect screens
//const ScreenStack = createStackNavigator(
const ScreenStack = createStackNavigator(
  {
    HOME: HomeScreen,
    LINKFLOW: LinksScreen,
    CHANNELFLOW: ChannelScreen,
  },
  {
    headerMode: 'none',
    headerBackTitleVisible: null
  }
);

const AppContainer = createAppContainer(ScreenStack);

export default AppContainer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89CFF0',
  },
  buttonContainer: {
    fontSize: 50,
    flexDirection: "row",
    backgroundColor: "gold",
    alignItems: 'center',
    marginHorizontal: 55,
    marginVertical: 200
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
  },

  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffb6c1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000'
  },
  loginText: {
    color: '#000000',
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 25
  }

});
