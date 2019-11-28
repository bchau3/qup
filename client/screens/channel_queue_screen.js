import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Image, Button, Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import {playSong, getChannelSongURI} from '../api/queue';


// for screen switch
import { createBottomTabNavigator } from "react-navigation";
import OptionScreen from "./option_screen";
import SearchBarScreen from "./search_bar_screen";
import SongQueue from "../components/song_queue";

// Get server info from config file
const queryString = require("query-string");
import { getChannelSongsByChannelId } from "../api/songs";

import TabBarIcon from "../components/TabBarIcon"; // for bar icons

/* ChannelQueueScreen:
 *    This screen shows the song queue
 *    It should show each song as a tab stacking in a scrollview.
 *    Each song tab should be able to be swipe to open options to up and down vote songs
 */
class ChannelQueueScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: "QUEUE",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? "ios-link" : "md-link"}
      />
    )
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
       
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <SongQueue/>

           <Button
              title="Play Song"
              onPress={
                this._playSong
              }
              />
        </ScrollView>
        
      </View>
    );
  }
}

_playSong = async () => {
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

// create bottom tabs to switch screens
export default createBottomTabNavigator(
  {
    OPTION: { screen: OptionScreen },
    SEARCH: { screen: SearchBarScreen },
    HOME: { screen: ChannelQueueScreen }
  },
  {
    initialRouteName: "SEARCH"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#89Cff0"
  },
  getStartedContainer: {
    fontSize: 20,
    backgroundColor: "#89Cff0",
    alignItems: "center",
    marginHorizontal: 0,
    marginVertical: 90
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  todoText: {
    fontSize: 14,
    color: "#000000",
    lineHeight: 24,
    textAlign: "left",
    paddingLeft: 30
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
