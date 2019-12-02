import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Button, Icon } from "react-native-elements";

// for screen switch 
import { createBottomTabNavigator } from 'react-navigation'
import OptionScreen from "./host_option_screen";
import SearchBarScreen from "./search_bar_screen";
import SongQueue from "../components/host_song_queue";
import { getChannelSongsByChannelId, getCurrentSong } from "../api/songs"
import { playSong, pauseSong, resumeSong } from "../api/queue";
import { styles } from "../style/host_queue_style"
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { skipSongUpdateQueue } from "../api/queue"


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
      playingSong: [],
      isPaused: false
    };
  }

  static navigationOptions = {
    tabBarLabel: 'QUEUE',
  }

  componentDidMount() {
    this.timer = setInterval(() => this._getTimer(), 1000);
    this._playSong();
  }  

  componentWillUnmount() {
    clearInterval(this.timer);
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

  _skipCurrentSongUpdateQueue = async () => {
    const channel_id = await this._getChannelId();
    await skipSongUpdateQueue(channel_id);
    //const songs = await getChannelSongsByChannelId(channel_id);
    //this.parseSongs(songs);

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
    var total_duration_minutes = Math.floor(responseJSON.item.duration_ms / (1000 * 60));
    var tDurMin = total_duration_minutes.toFixed(0);
    var total_duration_seconds = Math.floor(((responseJSON.item.duration_ms / (1000 * 60)) - tDurMin) * 60);
    var tDurSec = total_duration_seconds.toFixed(0);
    var current_duration_minutes = Math.floor(responseJSON.progress_ms / (1000 * 60));
    var currMin = current_duration_minutes.toFixed(0);
    var current_duration_seconds = Math.floor(((responseJSON.progress_ms / (1000 * 60)) - currMin) * 60);
    var currSec = current_duration_seconds.toFixed(0);
    //var priority = responseJSON[0].priority;  maybe this isn't needed since we're playing it rn?

    var json = JSON.parse(JSON.stringify({
      track_id: track_id,
      artist_name: artist_name,
      song_name: song_name,
      song_uri: song_uri,
      album_artwork: album_artwork,
      tDurMin: tDurMin,
      tDurSec: tDurSec,
      currMin: currMin,
      currSec: currSec,
      //priority: priority
    }));
    this.setState({ playingSong: this.state.playingSong.concat(json) });
    //console.log(json)
  }

  handler(playingSong) {
    this.setState({ playingSong: playingSong });
  }

  _playSong = async () => {
    channel_id = await this._getChannelId()
    if(this.state.isPaused){
      console.log(this.state.playingSong[0].curr_ms);
      resumeSong(channel_id, this.state.playingSong[0].curr_ms).then(() => {
        this._getCurrentSong();
      })
      this.setState({isPaused: false});
    }
    else{
      playSong(channel_id).then(() => {
        // Refresh current playing song
        this._getCurrentSong();
      });
    }
  }

  _pauseSong = async () => {
    channel_id = await this._getChannelId();
    pauseSong(channel_id);
    this.setState({isPaused: true});
  }

  _getTimer = async () => {
    channel_id = await this._getChannelId()
    const songJSON = await getCurrentSong(channel_id);
    //console.log(songJSON);
    if (songJSON.length == 0) {
      return;
    }

    var track_id = songJSON.item.id;
    var artist_name = songJSON.item.album.artists[0].name;
    var song_name = songJSON.item.name;
    var song_uri = songJSON.item.uri;
    var album_artwork = songJSON.item.album.images[2].url;
    var total_duration_minutes = Math.floor(songJSON.item.duration_ms / (1000 * 60));
    var tDurMin = total_duration_minutes.toFixed(0);
    var total_duration_seconds = Math.floor(((songJSON.item.duration_ms / (1000 * 60)) - tDurMin) * 60);
    var tDurSec = total_duration_seconds.toFixed(0);
    var current_duration_minutes = Math.floor(songJSON.progress_ms / (1000 * 60));
    var currMin = current_duration_minutes.toFixed(0);
    var current_duration_seconds = Math.floor(((songJSON.progress_ms / (1000 * 60)) - currMin) * 60);
    var currSec = current_duration_seconds.toFixed(0);

    var json = JSON.parse(JSON.stringify({
      track_id: track_id,
      artist_name: artist_name,
      song_name: song_name,
      song_uri: song_uri,
      album_artwork: album_artwork,
      tDurMin: tDurMin,
      tDurSec: tDurSec,
      currMin: currMin,
      currSec: currSec,
      curr_ms: songJSON.progress_ms,
    }));

    let temp = [this.state.playingSong];
    temp[0] = json;
    this.setState({ playingSong: temp });
  }



  render() {
    const { navigate } = this.props.navigation;
    //{ this._getChannelSongs() }
    return (
      <ImageBackground source={require("../assets/images/queue_background.png")} style={styles.container}>
        
        <SongQueue action={this.handler} />

        {/*play controls*/}
        {this.state.playingSong.map((song) => {
          // song title might be too large to fit
          var fixedSongTitle = ""
          if (song.song_name.length >= 13) {
            for (var i = 0; i < 13; ++i) {
              fixedSongTitle += song.song_name[i]
            }
            fixedSongTitle += "..."
          }
          else
            fixedSongTitle = song.song_name

          var secondsTotal = ''
          if (song.tDurSec < 10) {
            secondsTotal += "0"
            secondsTotal += song.tDurSec
          }
          else
            secondsTotal = song.tDurSec

          var secondsElapse = ''
          if (song.currSec < 10) {
            secondsElapse += "0"
            secondsElapse += song.currSec
          }
          else
            secondsElapse = song.currSec

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
                <Text style={{ fontSize: 12, color: "white"}}>
                {song.currMin}:{secondsElapse} / {song.tDurMin}:{secondsTotal}
                </Text>
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
                    this._pauseSong();
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
                    this._skipCurrentSongUpdateQueue();
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
    OPTIONS: {
       screen: OptionScreen, 
       TabBarIcon: <ion-icon name="search"></ion-icon>
      },
    SEARCH: { screen: SearchBarScreen },
    QUEUE: { screen: HostQueueScreen },
  },
  { 
    initialRouteName: 'SEARCH',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'QUEUE') {
          iconName = `ios-albums`;
        } else if (routeName === 'SEARCH') {
          iconName = `ios-search`;
        } else if (routeName === 'OPTIONS') {
          iconName = `ios-cog`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#EE86E7',
      inactiveTintColor: '#545454',
      activeBackgroundColor: '#292929'
    },
    
  }
)

