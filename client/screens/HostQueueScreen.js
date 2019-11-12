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

class HostQueueScreen extends React.Component {
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
        <View style={styles.getStartedContainer}> 
         <Text>!QUEUE!</Text>
         <Text>TODO:</Text>
         <Text>1.SHOW QUEUE IS EMPTY</Text>
         <Text>2.EACH SONG HAS ITS OWN SECTION</Text>
         <Text>3.ABLE TO SWIPE THE SONG TABS</Text>
         <Text>3-1.HOST HAS UPVOTE, DOWNVOTW</Text>
         <Text>4.TAB GIVE OPTIONS TO DELETE ANY SONGS</Text>
         <Text>5.CURRENT SONG SHOULD HAS A WINDOW AT BOTTOM</Text>
         <Text>5-1.THE HOST CAN SKIP CURRENT SONG</Text>

        </View>
      </ScrollView>  
    </View>
  );
  }
}
// left off on this, make the entire screen blue not just the text
class SearchBar extends React.Component {
    render(){
        return (
        <View style={styles.container}> 
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.getStartedContainer}> 
              <Text>!SEARCH!</Text>
              <Text>!SEARCH BAR IS HERE!</Text>
            </View>
          </ScrollView>  
        </View>
        );
    }
}

export default createBottomTabNavigator({
    Home: {screen: HostQueueScreen },
    Search: {screen: SearchBar},
    Settings: {screen: OptionScreen},
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#89CFF0',
  },
  getStartedContainer: {
    fontSize:20,
    backgroundColor:'#89CFF0',
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