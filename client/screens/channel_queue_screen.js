import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Image, Button, Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity, AsyncStorage, ImageBackground } from "react-native";
import {playSong, getChannelSongURI} from '../api/queue';
import { Icon } from "react-native-elements";


// for screen switch
import { createBottomTabNavigator } from "react-navigation";
import OptionScreen from "./option_screen";
import SearchBarScreen from "./search_bar_screen";
import SongQueue from "../components/song_queue";
import CurrentlyPlaying from "../components/currently_playing";
import { styles } from "../style/channelmate_queue_style"
import { LinearGradient } from 'expo-linear-gradient';

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
    return (
      <ImageBackground source={require("../assets/images/queue_background.png")} style={styles.container}>

        <SongQueue action={this.handler} />

        {/*play controls*/}
        {this.state.playingSong.map((song) => {

          fixedSongTitle = ""
          if (song.song_name.length >= 25) {
            for (var i = 0; i < 25; ++i) {
              fixedSongTitle += song.song_name[i]
            }
            fixedSongTitle += "..."
          }
          else
            fixedSongTitle = song.song_name

          return (
            <LinearGradient
              colors={['#101227', '#36C3FF']}
              start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 3 }}
              style={styles.playbackControl}
            >
              <View style={{ paddingRight: 5, paddingLeft: 8, paddingTop: 10}}>
                <Image
                  style={{ width: 90, height: 90, borderWidth: 3, borderColor: "white" }} //, borderColor: "white" 
                  source={{ uri: song.album_artwork }}
                />
              </View>

              <View style={{ paddingTop: 20, paddingRight: 4, width: 150}}>
                <Text style={styles.songTitle}>
                  {fixedSongTitle}
                </Text>
                <Text style={styles.artistName}>{song.artist_name}</Text>
              </View>

              {/* playback buttons */}

              <View style={{ paddingLeft: 80, paddingTop: 26, paddingRight: 10 }}>
                <Icon
                  name='step-forward'
                  type='font-awesome'
                  size={40}
                  color='white'
                  iconStyle={alignContent = 'space-between'}
                  onPress={() => {
                    //TODO
                  }} />
              </View>

            </LinearGradient>

          );
        })}
      </ImageBackground>
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

