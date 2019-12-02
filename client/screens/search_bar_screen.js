import * as React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground
} from 'react-native';

// for screen switch
import { SearchBar } from 'react-native-elements';
import { styles } from '../style/search_bar_screen_style';

// Get server info from config file
import { server_url } from '../config.js';
const queryString = require('query-string');

import { addSong } from '../api/songs';

/* SearchBarScreen:
 *    This screen has a search bar allows user to search a song from Spotify
 */
export default class SearchBarScreen extends React.Component {
  state = {
    search: '',
    list: []
  };

  updateSearch = search => {
    this.setState({ search });
    this.songSearch(search);
  };
  render() {
    return (
      <ImageBackground source={require("../assets/images/queue_background.png")} style={styles.container}>
        {/* <View style={styles.searchBarContainer}> */}

        <View style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40,
        }}>
          <SearchBar
            inputStyle={{ backgroundColor: '#7C7C7C', color: '#c6c6c6', fontSize: 24}}
            containerStyle={{
              backgroundColor: '#7C7C7C',
              borderRadius: 10,
              width: 360,
              height: 50,
              borderWidth:2,
              justifyContent: "center",
              alignItems: "center"
            }}
            clearIcon={{ color: '#c6c6c6' }}
            searchIcon={{ color: '#c6c6c6' }}
            inputContainerStyle={{ backgroundColor: '#7C7C7C' }}
            placeholderTextColor={'#c6c6c6'}
            placeholder={'Search'}
            onChangeText={this.updateSearch}
            value={this.state.search}
            showCancel={true}
          />
        </View>
        <ScrollView
          style={styles.resultContainer}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}>

          <View style={styles.songContainer}>
            {this.state.list.map(song => {

              parsedTitle = ""
              if (song.song_name.length >= 25) {
                for (var i = 0; i < 25; i++) {
                  parsedTitle += song.song_name[i]
                }
                parsedTitle += "..."
              }
              else
                parsedTitle = song.song_name

              return (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    this._addSong(song);
                  }}
                  underlayColor="#fff"
                >
                  <View style={{ paddingLeft: 2, paddingRight: 10 }}>
                    <Image
                      style={{ width: 60, height: 60 }}
                      source={{ uri: song.album_artwork }}
                    />
                  </View>

                  <Text>
                    <Text style={styles.songTitle}>
                      {/* {song.song_name} */}
                      {parsedTitle}
                      {'\n'}
                    </Text>
                    <Text style={{ color: "#c6c6c6", fontSize: 13 }}>{song.artist_name}</Text>
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  _addSong = async song_json => {
    const channel_id = await this._getChannelId();
    addSong(channel_id, song_json);
  };

  songSearch = async query => {
    const channel_id = await this._getChannelId();
    const encodedQuery = encodeURIComponent(query);
    let response = await fetch(
      `${server_url}/search?q=${encodedQuery}&channel_id=${channel_id}`
    );
    let responseText = await response.text();
    let responseJSON = await JSON.parse(responseText);
    console.log(responseJSON);
    this.parseSongs(responseJSON);
  };

  parseSongs = responseJSON => {
    this.setState({ list: [] });
    for (var i = 0; i < 15; i++) {
      var track_id = responseJSON.body.tracks.items[i].id;
      var artist_name = responseJSON.body.tracks.items[i].album.artists[0].name;
      var song_name = responseJSON.body.tracks.items[i].name;
      var song_uri = responseJSON.body.tracks.items[i].uri;
      var album_artwork = responseJSON.body.tracks.items[i].album.images[2].url;
      var duration_ms = responseJSON.body.tracks.items[i].duration_ms;

      var json = JSON.parse(
        JSON.stringify({
          track_id: track_id,
          artist_name: artist_name,
          song_name: song_name,
          song_uri: song_uri,
          album_artwork: album_artwork,
          duration_ms: duration_ms
        })
      );


      console.log(this.state.list);
      this.setState({ list: this.state.list.concat(json) });
    }
  };

  _getChannelId = async () => {
    let channel_id = '';
    try {
      channel_id = (await AsyncStorage.getItem('channel_id')) || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return channel_id;
  };
}
