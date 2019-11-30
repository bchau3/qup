import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import { Button, Icon } from "react-native-elements";

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
              <Icon
                name='play'
                type='font-awesome'
                size={26}
                color='#000080'
                iconStyle={alignContent = 'space-between'}
                onPress={() => {
                  //TODO
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
  },
});