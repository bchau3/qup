import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';

// for screen switch 
import { createBottomTabNavigator } from 'react-navigation'
import OptionScreen from "./option_screen";
import SearchBarScreen from "./search_bar_screen";
import SongQueue from "../components/song_queue";
import CurrentlyPlaying from "../components/currently_playing";
import { getChannelSongsByChannelId } from "../api/songs"


/* HostQueueScreen:
 *    Screen shows the song queue that are made for the host only
 *    It has all functionality of a Channelmate Queue, but with more
 *    options such as skip song, etc.
 */
class HostQueueScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'QUEUE',
  }

  state = {
    playingSong: []
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
    this.setState({ playingSong: song });
    
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



  render() {
    const { navigate } = this.props.navigation;
    { this._getChannelSongs() }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <SongQueue />
        </ScrollView>

        {/*play controls*/}
        {/*I can't figure out a way to display just one song. I left off at this... */}
        <View style={styles.playbackControl}>
          {this.state.playingSong.map((song) =>{
          <View style={{ paddingRight: 10, paddingLeft: 10 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: this.state.playingSong.album_artwork }}
            />
          </View>
          <Text>
            <Text style={styles.songTitle}>
              {this.state.playingSong.song_name}
              {"\n"}
            </Text>
            <Text style={{ paddingTop: 30 }}>{this.state.playingSong.artist_name}</Text>
          </Text>
        </View>
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
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#000000",
    width: 500,
    height: 100,
    alignSelf: 'flex-end',
    bottom: 0,
  }
});