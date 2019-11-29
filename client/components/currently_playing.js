import * as React from "react";
import { Text, Image, View, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { getCurrentSong } from "../api/songs"

export default class CurrentlyPlaying extends React.Component {
  state = {
    current_song: {}
  };

  render() {
    return (
      <View>
      {!this.state.current_song.id ? (
        <View>
          <View style={styles.getStartedContainer}>
             <Image
              style={{ width: 50, height: 50 }}
            />
          </View>

          <Text>
            <Text style={styles.songTitle}>
              No Current Song
              {"\n\n"}
            </Text>
            <Text>No Current Song</Text>
          </Text>
            <TouchableOpacity
              style={styles.playButtonStyle}
              onPress={() => {
                // Todo
              }}
              underlayColor="#fff"
            >
              <Text>Play</Text>
            </TouchableOpacity>
          </View>
      ) : (
        <View style={styles.getStartedContainer}>
          <View style={{ paddingRight: 10 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: current_song.album_artwork }}
            />
          </View>

          <Text>
            <Text style={styles.songTitle}>
              {current_song.song_name}
              {"\n\n"}
            </Text>
            <Text>{current_song.artist_name}</Text>
          </Text>
          <TouchableOpacity
            style={styles.playButtonStyle}
            onPress={() => {
              // Todo
            }}
            underlayColor="#fff"
          >
            <Text>Play</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    );
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

  parseSongs = responseJSON => {
    this.setState({ songs: [] });
    for (var i = 0; i < responseJSON.length; i++) {
      var track_id = responseJSON[i].id;
      var artist_name = responseJSON[i].artist_name;
      var song_name = responseJSON[i].song_name;
      var song_uri = responseJSON[i].song_uri;
      var album_artwork = responseJSON[i].album_artwork;

      var json = JSON.parse(JSON.stringify({
        track_id: track_id,
        artist_name: artist_name,
        song_name: song_name,
        song_uri: song_uri,
        album_artwork: album_artwork
      }));
      console.log(this.state.songs);
      this.setState({ songs: this.state.songs.concat(json) });
    }
  };
}

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
  playButtonStyle: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#ffb6c1",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#000000",
    width: 90,
    height: 120,
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
