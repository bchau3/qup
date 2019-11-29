import * as React from "react";
import { Text, Image, View, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-elements";
import { getChannelSongsByChannelId } from "../api/songs"

var fixedSongTitle;

export default class SongQueue extends React.Component  {

  //this.state.dataSource.cloneWithRows(responseJson.map(item => item.name))
  state = {
    songs: []
  };
  
  render() {
    return (
      <View>
        <Button
          style={{paddingTop: 20}} 
          title="Press me"
          onPress={() => {
            this._getChannelSongs()
          }}>
          </Button>
          <View style={styles.getStartedContainer} >
            {this.state.songs.map((song) => {
              // song title might be too large to fit
              fixedSongTitle = ""
              if (song.song_name.length >= 20) {
                for (var i = 0; i < 20; ++i) {
                  fixedSongTitle += song.song_name[i]
                }
                fixedSongTitle += "..."
              }
              else
                fixedSongTitle = song.song_name

              // make a conditional that if the song's priority is 1, it'll return that song container along with play/pause functionalities
              // and a "now playing" title above it

              return (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={1}
                  //removed onpress, the pressable icon should be the only thing that will bring up a menu
                  // not the whole entire song container
                >
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
                    <Text style={{paddingTop: 30}}>{song.artist_name}</Text>
                  </Text>

                  {/*test to make a touchable icon that opens options to features*/}
                  <Icon
                    name='bars'
                    type='font-awesome'
                    size={26}
                    color='#000080'
                    iconStyle={alignContext='center'}/>

                  {/* <Text style={styles.buttonText}>{song.key}</Text> */}
                  {/* <Text style={styles.buttonText}>{song.song_uri}</Text> */}
                  {/* {<Text style={styles.buttonText}>{song.album_artwork}</Text>} */}
                </TouchableOpacity>
              );
            })}
          </View>
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
    const songsJSON = await getChannelSongsByChannelId(channel_id);
    console.log(songsJSON);
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
