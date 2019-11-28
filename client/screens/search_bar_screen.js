import * as React from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from "react-native";

// for screen switch
import { SearchBar } from "react-native-elements";

// Get server info from config file
import { server_url } from "../config.js";
const queryString = require("query-string");

import { addSong } from "../api/songs";

/* SearchBarScreen:
 *    This screen has a search bar allows user to search a song from Spotify
 */
export default class SearchBarScreen extends React.Component {
    state = {
        search: "",
        list: []
    };

    updateSearch = search => {
        this.setState({ search });
        this.songSearch(search);
    };

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    inputStyle={{ backgroundColor: "#ffb6c1" }}
                    containerStyle={{
                        backgroundColor: "#DB7093",
                        borderWidth: 1,
                        borderRadius: 5
                    }}
                    inputContainerStyle={{ backgroundColor: "#ffb6c1" }}
                    placeholderTextColor={"#436EEE"}
                    placeholder={"Search for a song"}
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    showCancel={true}
                />
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.getStartedContainer} >
                        {this.state.list.map((song) => {
                            return (
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => {
                                        this._addSong(song)
                                    }}
                                    underlayColor="#fff"
                                >
                                    <View style={{ paddingRight: 10 }}>
                                        <Image
                                            style={{ width: 50, height: 50 }}
                                            source={{ uri: song.album_artwork }}
                                        />
                                    </View>

                                    <Text>
                                        <Text style={styles.songTitle}>
                                            {song.song_name}
                                            {"\n\n"}
                                        </Text>
                                        <Text>{song.artist_name}</Text>
                                    </Text>

                                    {/* <Text style={styles.buttonText}>{song.key}</Text> */}
                                    {/* <Text style={styles.buttonText}>{song.song_uri}</Text> */}
                                    {/* {<Text style={styles.buttonText}>{song.album_artwork}</Text>} */}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }

    _addSong = async (song_json) => {
        const channel_id = await this._getChannelId();
        addSong(channel_id, song_json);
    }

    songSearch = async (query) => {
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
            var duration_ms = responseJSON.body.tracks.items[i].duration_ms

            var json = JSON.parse(JSON.stringify({
                track_id: track_id,
                artist_name: artist_name,
                song_name: song_name,
                song_uri: song_uri,
                album_artwork: album_artwork,
                duration_ms: duration_ms
            }));
            console.log(this.state.list);
            this.setState({ list: this.state.list.concat(json) });
        }
    };

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
