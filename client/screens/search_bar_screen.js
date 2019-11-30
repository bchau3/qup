import * as React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
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
      <View style={styles.container}>
        {/* <View style={styles.searchBarContainer}> */}
        <Text
          style={{
            color: '#36C3FF',
            fontSize: 40,
            paddingBottom: 20,
            fontWeight: '700'
          }}
        >
          SEARCH
        </Text>
        <SearchBar
          inputStyle={{ backgroundColor: '#7C7C7C', color: '#c6c6c6' }}
          containerStyle={{
            backgroundColor: '#7C7C7C',
            borderRadius: 15
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
        {/* </View> */}
        <ScrollView
          style={styles.resultContainer}
        >
          <View style={styles.getStartedContainer}>
            {this.state.list.map(song => {
              return (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    this._addSong(song);
                  }}
                  underlayColor="#fff"
                >
                  <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: song.album_artwork }}
                    />
                  </View>

                  <Text>
                    <Text style={styles.songTitle}>
                      {song.song_name}
                      {'\n\n'}
                    </Text>
                    <Text>{song.artist_name}</Text>
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
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
