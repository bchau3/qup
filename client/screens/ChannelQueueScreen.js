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
    title: 'Queue',
  }

  render(){ 
    const {navigate} = this.props.navigation;
    return (

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
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#89CFF0',
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
    fontSize: 14,
    color: '#000000',
    lineHeight: 24,
    textAlign: 'left',
    paddingLeft: 30
  },
});