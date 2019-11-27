import * as React from "react";
import { Text, Image, View, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { getChannelSongsByChannelId } from "../api/songs"

export default class SongQueue extends React.Component  {

  //this.state.dataSource.cloneWithRows(responseJson.map(item => item.name))
  state = {
    songs: []
  };
  
  render() {
    return (
      <View>
        <Button 
          title="Press me"
          onPress={() => {
            this._getChannelSongs()
          }}>
          </Button>
      </View>
    );
  }


// const styles = StyleSheet.create({
//   item: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 30,
//     margin: 2,
//     borderColor: "#2a4944",
//     borderWidth: 1,
//     backgroundColor: "#d2f7f1"
//   }
// });


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

_getChannelSongs = async() => {
  const channel_id  = await this._getChannelId();
  const songs = await getChannelSongsByChannelId(channel_id);
  // console.log(songs);

}

parseSongs = responseJSON => {
  this.setState({ list: [] });
  for (var i = 0; i < 15; i++) {
      var track_id = responseJSON.body.tracks.items[i].album.artists[0].id;
      var artist_name = responseJSON.body.tracks.items[i].album.artists[0].name;
      var song_name = responseJSON.body.tracks.items[i].name;
      var song_uri = responseJSON.body.tracks.items[i].album.artists[0].uri;
      var album_artwork = responseJSON.body.tracks.items[i].album.images[2].url;

      var json = JSON.parse(JSON.stringify({
          track_id: track_id,
          artist_name: artist_name,
          song_name: song_name,
          song_uri: song_uri,
          album_artwork: album_artwork
      }));
      console.log(this.state.list);
      this.setState({ list: this.state.list.concat(json) });
  }
};
}
