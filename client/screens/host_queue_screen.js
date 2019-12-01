import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Button, Icon } from "react-native-elements";

// for screen switch 
import { createBottomTabNavigator } from 'react-navigation'
import OptionScreen from "./host_option_screen";
import SearchBarScreen from "./search_bar_screen";
import SongQueue from "../components/song_queue";
import { getChannelSongsByChannelId } from "../api/songs"
import { playSong } from "../api/queue";
import { styles } from "../style/host_queue_style"
import { LinearGradient } from 'expo-linear-gradient';


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

  _getChannelSongs = async () => {
    const channel_id = await this._getChannelId();
    const songsJSON = await getChannelSongsByChannelId(channel_id);
    //console.log(songsJSON);
    this.parseSongs(songsJSON);
  }

  parseSongs(responseJSON) {
    this.setState({ playingSong: [] });

    if (responseJSON.length == 0) {
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

  handler(playingSong) {
    this.setState({ playingSong: playingSong });
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
              colors={['#101227', '#ff3fc9']}
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

              <View style={{ paddingTop: 26, paddingRight: 10 }}>
                <Icon
                  name='play'
                  type='font-awesome'
                  size={40}
                  color="white"
                  iconStyle={alignContent = 'space-between'}
                  onPress={() => {
                    this._playSong();
                  }} />
              </View>

              <View style={{ paddingTop: 26, paddingRight: 13 }}>
                <Icon
                  name='pause'
                  type='font-awesome'
                  size={40}
                  color="white"
                  iconStyle={alignContent = 'space-between'}
                  onPress={() => {
                    //TODO
                  }} />
              </View>

              <View style={{ paddingTop: 26, paddingRight: 10 }}>
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

