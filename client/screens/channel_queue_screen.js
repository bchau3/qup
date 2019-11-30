import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Image, Button, Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import {playSong, getChannelSongURI} from '../api/queue';


// for screen switch
import { createBottomTabNavigator } from "react-navigation";
import OptionScreen from "./option_screen";
import SearchBarScreen from "./search_bar_screen";
import SongQueue from "../components/song_queue";
import CurrentlyPlaying from "../components/currently_playing";

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

  constructor(props) {
    super(props)

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);

    // Set some state
    this.state = {
      playingSong: []
    }
  }

  static navigationOptions = {
    tabBarLabel: "QUEUE",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? "ios-link" : "md-link"}
      />
    )
  };

  

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

  _getChannelSongs = async () => {
    const channel_id = await this._getChannelId();
    const songsJSON = await getChannelSongsByChannelId(channel_id);
    //console.log(songsJSON);
    this.parseSongs(songsJSON);
  }

  parseSongs(responseJSON) {
    this.setState({ playingSong: [] });

    if(responseJSON.length == 0){
      return;
    }

    var track_id = responseJSON[0].id;
    var artist_name = responseJSON[0].artist_name;
    var song_name = responseJSON[0].song_name;
    var song_uri = responseJSON[0].song_uri;
    var album_artwork = responseJSON[0].album_artwork;
    var priority = responseJSON[0].priority;

    var json = JSON.parse(JSON.stringify({
      track_id: track_id,
      artist_name: artist_name,
      song_name: song_name,
      song_uri: song_uri,
      album_artwork: album_artwork,
      priority: priority
    }));
    this.setState({ playingSong: this.state.playingSong.concat(json) });
    //console.log(this.state.playingSong);
  }

  handler(playingSong){
    this.setState({playingSong: playingSong});
  }

  _playSong = async () => {
    channel_id = await this._getChannelId()
    playSong(channel_id).then(() => {
      // Refresh current playing song
      this._getChannelSongs();
    });
  }

  render() {
 const { navigate } = this.props.navigation;
  //{ this._getChannelSongs() }
    return (
      <View style={styles.container}>
        <SongQueue action={this.handler} />

        {/*play controls*/}
        {this.state.playingSong.map((song) => {
          return (
            <View style={styles.playbackControl}>
              <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                <Image
                  style={{ width: 50, height: 50, alignSelf: 'auto' }}
                  source={{ uri: song.album_artwork }}
                />
              </View>
              <Text>
                <Text style={styles.songTitle}>
                  {song.song_name}
                  {"\n"}
                </Text>
                <Text style={{ paddingTop: 30 }}>{song.artist_name}</Text>
              </Text>

              {/* playback buttons */}
              
            </View>
          );
        })}
      </View>
    );
  }

  _playSong = async () => {
  console.log("Hello?");
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
  },
    playbackControl: {
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#000000",
    width: 350,
    height: 60,
    alignSelf: 'center',
    bottom: 0,
    flexDirection: 'row',
  },
});
