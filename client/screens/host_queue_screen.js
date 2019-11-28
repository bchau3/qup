import * as React from 'react';
import { ScrollView,StyleSheet,Text,View, Button, AsyncStorage, TouchableOpacity} from 'react-native';

// for screen switch 
import { createBottomTabNavigator } from 'react-navigation'
import OptionScreen from "./option_screen";
import SearchBarScreen from "./search_bar_screen";
import SongQueue from "../components/song_queue";
import {playSong} from "../api/queue";

/* HostQueueScreen:
 *    Screen shows the song queue that are made for the host only
 *    It has all functionality of a Channelmate Queue, but with more
 *    options such as skip song, etc.
 */
class HostQueueScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'QUEUE',
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <SongQueue />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={
              this._playSong
            }
            underlayColor="#fff"
          >
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
              
        </ScrollView>

      </View>
    );
  }

  _playSong = async () => {
    console.log("hello?");
    const channel_id = await this._getChannelId();
    console.log(channel_id);

    playSong(channel_id);
  }

  _getChannelId = async () => {
    let channel_id = '';
    try {
        channel_id = await AsyncStorage.getItem('channel_id') || 'none';
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
    return channel_id;
  }
}

// using createBottomTabNavigator, we can create tabs on the bottom of the page to switch screens
export default createBottomTabNavigator(
  {
    OPTION: { screen: OptionScreen },
    SEARCH: { screen: SearchBarScreen },
    HOME: { screen: HostQueueScreen },
  },
  {
    initialRouteName: 'SEARCH'
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#89Cff0"
  },
  getStartedContainer: {
    fontSize: 20,
    backgroundColor: "#89Cff0",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginVertical: 60
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  todoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "left"
  },
    buttonStyle: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffb6c1",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#000000",
    width: 380,
    height: 70,
    flex: 1,
    flexDirection: "row"
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
  },
  songTitle: {
    color: "#000000",
    textAlign: "left",
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
    fontWeight: 'bold'
  }
});