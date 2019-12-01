import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import { Button, Icon } from "react-native-elements";

// for screen switch 
import { createBottomTabNavigator } from 'react-navigation'
import OptionScreen from "./option_screen";
import SearchBarScreen from "./search_bar_screen";
import SongQueue from "../components/song_queue";
import { getChannelSongsByChannelId, getCurrentSong } from "../api/songs"
import { playSong } from "../api/queue";

var Slider = require('react-native-slider');

/* HostQueueScreen:
 *    Screen shows the song queue that are made for the host only
 *    It has all functionality of a Channelmate Queue, but with more
 *    options such as skip song, etc.
 */
class HostQueueScreen extends React.Component {

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
    tabBarLabel: 'QUEUE',
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

  _getCurrentSong = async () => {
    const channel_id = await this._getChannelId();
    const songJSON = await getCurrentSong(channel_id);
    //console.log(songJSON);
    this.parseCurrentSong(songJSON);
  }

  // why is the track not the same as the first song in our list
  // our responseJSON when retrieving the real time song being played on that account
  // is an object
  parseCurrentSong(responseJSON) {
    this.setState({ playingSong: [] });

    if (responseJSON.length == 0) {
      return;
    }

    var track_id = responseJSON.item.id;
    var artist_name = responseJSON.item.album.artists[0].name;
    var song_name = responseJSON.item.name;
    var song_uri = responseJSON.item.uri;
    var album_artwork = responseJSON.item.album.images[2].url;
    var total_duration = (responseJSON.item.duration_ms / (1000 * 60)); // make it into minutes
    var current_duration = (responseJSON.progress_ms / (1000 * 60));

    var json = JSON.parse(JSON.stringify({
      track_id: track_id,
      artist_name: artist_name,
      song_name: song_name,
      song_uri: song_uri,
      album_artwork: album_artwork,
      total_duration: total_duration,
      current_duration: current_duration,
    }));
    this.setState({ playingSong: this.state.playingSong.concat(json) });
    console.log(json)
  }

  handler(playingSong) {
    this.setState({ playingSong: playingSong });
  }

  _playSong = async () => {
    channel_id = await this._getChannelId()
    playSong(channel_id).then(() => {
      // Refresh current playing song
      this._getCurrentSong();
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
          // song title might be too large to fit
          var fixedSongTitle = ""
          if (song.song_name.length >= 20) {
            for (var i = 0; i < 20; ++i) {
              fixedSongTitle += song.song_name[i]
            }
            fixedSongTitle += "..."
          }
          else
            fixedSongTitle = song.song_name
          return (
            <View style={styles.playbackControl}>
              <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                <Image
                  style={{ width: 50, height: 50, alignSelf: 'auto', marginTop: 4 }}
                  source={{ uri: song.album_artwork }}
                />
              </View>
              <Text>
                <Text style={styles.songTitle}>
                  {fixedSongTitle}
                  {"\n"}
                </Text>
                <Text style={{ paddingTop: 30 }}>{song.artist_name}</Text>
              </Text>

              {/* playback buttons */}
              <Icon
                name='play'
                type='font-awesome'
                size={26}
                color='#000080'
                iconStyle={alignContent = 'space-between'}
                onPress={() => {
                  this._getCurrentSong();
                }} />

              <Icon
                name='pause'
                type='font-awesome'
                size={26}
                color='#000080'
                iconStyle={alignContent = 'space-between'}
                onPress={() => {
                  //TODO
                }} />

              <Icon
                name='step-forward'
                type='font-awesome'
                size={26}
                color='#000080'
                iconStyle={alignContent = 'space-between'}
                onPress={() => {
                  //TODO
                }} />
            </View>
          );
        })}
      </View>
    );
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
  songTitle: {
    color: "#000000",
    textAlign: "left",
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
    fontWeight: 'bold'
  }
});