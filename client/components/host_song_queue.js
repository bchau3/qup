import * as React from "react";
import { Text, Image, View, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity, RefreshControl, Alert, TouchableHighlight } from "react-native";
import { Button, Icon } from "react-native-elements";
import { getChannelSongsByChannelId } from "../api/songs";
//import Swipeout from "react-native-swipeout";
import Swipeable from 'react-native-swipeable';
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../style/song_queue_style";

var fixedSongTitle;

const leftContent = <Text>Pull to activate</Text>;

shouldRemove = () => {
  this.alert("WILL REMOVE SONG")
}

shouldUpvote = () => {
  this.alert("WILL UPVOTE SONG")
}

shouldDownVote = () => {
  this.alert("WILL DOWNVOTE SONG")
}

const rightButtons = [
    <TouchableOpacity
      onPress={shouldRemove}
    >
      <Text style={{ color: '#D55EFF', paddingLeft: 10, paddingTop: 5 }}>Remove</Text>
      <Ionicons name={`ios-trash`} size={35} color={'#D55EFF'} style={{ paddingLeft: 25 }} />
    </TouchableOpacity>,
  
  <TouchableOpacity
      onPress={shouldUpvote}
    >
      <Text style={{ color: '#36C3FF', paddingLeft: 10, paddingTop: 5  }}>Upvote</Text>
      <Ionicons name={`ios-thumbs-up`} size={35} color={'#36C3FF'} style={{ paddingLeft: 20 }} />
    </TouchableOpacity>,
  
  <TouchableOpacity
      onPress={shouldDownVote}
    >
      <Text style={{ color: '#ff3fc9',paddingLeft: 5, paddingTop: 5  }}>Downvote</Text>
      <Ionicons name={`ios-thumbs-down`} size={35} color={'#ff3fc9'} style={{ paddingLeft: 22 }} />
    </TouchableOpacity>
];


export default class SongQueue extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      songs: [],
      refreshing: false
    };

    this._onRefresh();
  }

  swipeable = null;

  handleUserBeganScrollingParentView() {
    this.swipeable.recenter();
  }


  render() {

    return (

      <ScrollView
        // style={styles.container}
        // contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />
        }
      >
        <View style={styles.getStartedContainer} >

          {this.state.songs.map((song) => {

            // song title might be too large to fit
            fixedSongTitle = ""
            if (song.song_name.length >= 30) {
              for (var i = 0; i < 30; ++i) {
                fixedSongTitle += song.song_name[i]
              }
              fixedSongTitle += "..."
            }
            else
              fixedSongTitle = song.song_name

            // make a conditional that if the song's priority is 1, it'll return that song container along with play/pause functionalities
            // and a "now playing" title above it
            if (song.priority === 1) {
              return (
                <View style={{alignSelf: "stretch"}}>
                  <Text style={styles.title}>
                      Now Playing:
                    </Text>

                    <TouchableOpacity
                      style={styles.buttonStyleOnPlaying}
                      activeOpacity={1}>
                      <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                        <Image
                          style={{ width: 50, height: 50 }}
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
                    </TouchableOpacity>

                    <Text style={{ color: "white", paddingTop: 20, paddingBottom: 3, fontWeight: 'bold', textAlign: "left", paddingLeft: 20, paddingRight: 20, fontSize: 15, }}>
                      Queue:
                    </Text>
                </View>
              );
            }
            else {
              return (
                <Swipeable onRef={ref => this.swipeable = ref}
                  rightButtons={rightButtons}

                  //style={{ borderWidth: 1, borderColor: "black"}}
                  activeOpacity={1}
                >

                  <View style={styles.buttonStyle}>
                    <View style={{ paddingRight: 10, paddingLeft: 10, width: 70, height: 50, }}>
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{ uri: song.album_artwork }}
                      />
                    </View>

                    <Text style={{ width: 235 }}>
                      <Text style={styles.songTitle}>
                        {fixedSongTitle}
                        {"\n"}
                      </Text>
                      <Text style={{ paddingTop: 30 }}>{song.artist_name}</Text>
                    </Text>
                    <View style={{ paddingTop: 10 }}>
                      <Icon
                        name='bars'
                        type='font-awesome'
                        size={30}
                        color="black"
                        iconStyle={alignContext = 'center'} />
                    </View>
                  </View>
                  {/*test to make a touchable icon that opens options to features*/}



                </Swipeable>
              );
            }
          })}
        </View>
      </ScrollView>

    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this._getChannelSongs().then(() => {
      this.setState({ refreshing: false });
    });
  }

  _getUsername = async () => {
    let username = '';
    try {
      username = await AsyncStorage.getItem('username') || 'none';
    } catch (error) {
      console.log(error.message);
    }
    return username;
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

  parseSongs = responseJSON => {
    this.setState({ songs: [] });
    for (var i = 0; i < responseJSON.length; i++) {
      var track_id = responseJSON[i].id;
      var artist_name = responseJSON[i].artist_name;
      var song_name = responseJSON[i].song_name;
      var song_uri = responseJSON[i].song_uri;
      var album_artwork = responseJSON[i].album_artwork;
      var priority = responseJSON[i].priority;

      var json = JSON.parse(JSON.stringify({
        track_id: track_id,
        artist_name: artist_name,
        song_name: song_name,
        song_uri: song_uri,
        album_artwork: album_artwork,
        priority: priority
      }));
      //console.log(this.state.songs);
      this.setState({ songs: this.state.songs.concat(json) });
    }
    if (this.state.songs.length != 0) {
      this.props.action([this.state.songs[0]])
    }
    //console.log(this.state.songs);
  };
}