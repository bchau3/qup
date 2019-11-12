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
import { createBottomTabNavigator } from 'react-navigation'
import OptionScreen from './OptionScreen';
import { SearchBar } from 'react-native-elements';

import TabBarIcon from '../components/TabBarIcon'; // for bar icons

/* ChannelQueueScreen:
 *    This screen shows the song queue
 *    It should show each song as a tab stacking in a scrollview.
 *    Each song tab should be able to be swipe to open options to up and down vote songs
 */
class ChannelQueueScreen extends React.Component {

  static navigationOptions = {
<<<<<<< HEAD
    title: 'Queue',
=======
    tabBarLabel: 'QUEUE',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
    ),
>>>>>>> b7d6aad586d05c6fe3aa5a2e76c58217c5707814
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

<<<<<<< HEAD
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}> 
         <Text style = {styles.todoText}>!QUEUE!</Text>
         <Text style = {styles.todoText}>TODO:</Text>
         <Text style = {styles.todoText}>1.SHOW QUEUE IS EMPTY</Text>
         <Text style = {styles.todoText}>2.EACH SONG HAS ITS OWN SECTION</Text>
         <Text style = {styles.todoText}>3.ABLE TO SWIPE THE SONG TABS</Text>
         <Text style = {styles.todoText}>4.TAB GIVE OPTIONS TO DELETE (SONG OWNER ONLY)</Text>

        </View>
      </ScrollView>  
    </View>
  );
  }
}

class SearchBar extends React.Component {
    render(){
        return (
        <View style={styles.container}> 
         <Text style = {styles.todoText}>!SEARCH!</Text>
         <Text style = {styles.todoText}>!SEARCH BAR IS HERE!</Text>
        </View>
        );
    }
}

export default createBottomTabNavigator({
    Settings: {screen: OptionScreen},
    Search: {screen: SearchBar},
    Home: {screen: ChannelQueueScreen},
=======
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text>!QUEUE!</Text>
            <Text>TODO:</Text>
            <Text>1.SHOW QUEUE IS EMPTY</Text>
            <Text>2.EACH SONG HAS ITS OWN SECTION</Text>
            <Text>3.ABLE TO SWIPE THE SONG TABS</Text>
            <Text>4.TAB GIVE OPTIONS TO DELETE (SONG OWNER ONLY)</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

/* SearchBarScreen:
 *    This screen has a search bar allows user to search a song from Spotify
 */
class SearchBarScreen extends React.Component {

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    return (

      <SearchBar
        inputStyle={{ backgroundColor: 'black' }}
        containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
        placeholderTextColor={'grey'}
        placeholder={'SEARCH...'}
      />
    );
  }
}

export default createBottomTabNavigator({
  OPTION: { screen: OptionScreen },
  SEARCH: { screen: SearchBarScreen },
  Home: { screen: ChannelQueueScreen },
>>>>>>> b7d6aad586d05c6fe3aa5a2e76c58217c5707814
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#89CFF0',
  },
  getStartedContainer: {
    fontSize: 20,
    backgroundColor: "white",
    alignItems: 'center',
    marginHorizontal: 0,
    marginVertical: 90
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  todoText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 24,
    textAlign: 'left',
    paddingLeft: 30
  },
});