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


class ChannelQueueScreen extends React.Component {

  static navigationOptions = {
    title: 'QUEUE',
  }

  render(){ 
    const {navigate} = this.props.navigation;
    return (

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

class SearchBar extends React.Component {
    render(){
        return (
        <View style={styles.getStartedContainer}> 
         <Text>!SEARCH!</Text>
         <Text>!SEARCH BAR IS HERE!</Text>
        </View>
        );
    }
}

export default createBottomTabNavigator({
    Settings: {screen: OptionScreen},
    SEARCH: {screen: SearchBar},
    Home: {screen: ChannelQueueScreen },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  getStartedContainer: {
    fontSize:20,
    backgroundColor:"white",
    alignItems: 'center',
    marginHorizontal: 0,
    marginVertical:90
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  todoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
});