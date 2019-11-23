import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";

// for screen switch
import { createBottomTabNavigator } from "react-navigation";
import OptionScreen from "./option_screen";
import { SearchBar } from "react-native-elements";

// Get server info from config file
import { server_url } from "../config.js";
const queryString = require("query-string");

import TabBarIcon from "../components/TabBarIcon"; // for bar icons

/* ChannelQueueScreen:
 *    This screen shows the song queue
 *    It should show each song as a tab stacking in a scrollview.
 *    Each song tab should be able to be swipe to open options to up and down vote songs
 */
class ChannelQueueScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: "QUEUE",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? "ios-link" : "md-link"}
      />
    )
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text>!QUEUE!</Text>
            <Text>TODO:</Text>
            <Text>1.SHOW QUEUE IS EMPTY</Text>
            <Text>2.EACH SONG HAS ITS OWN SECTION</Text>
            <Text>3.ABLE TO SWIPE THE SONG TABS</Text>
            <Text>4.TAB GIVE OPTIONS TO DELETE (SONG OWNER ONLY)</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

/* SearchBarScreen:
 *    This screen has a search bar allows user to search a song from Spotify
 */
class SearchBarScreen extends React.Component {
  state = {
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
    songSearch(search, 1);
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
        ></ScrollView>
      </View>
    );
  }
}

export async function songSearch(query, channel_id) {
  console.log(query);
  const encodedQuery = encodeURIComponent(query);
  let response = await fetch(
    `${server_url}/search?q=${encodedQuery}&channel_id=1`
  );
  let responseText = await response.text();
  let responseJSON = await JSON.parse(responseText);
  console.log(responseJSON);
  return responseJSON;
}

// create bottom tabs to switch screens
export default createBottomTabNavigator(
  {
    OPTION: { screen: OptionScreen },
    SEARCH: { screen: SearchBarScreen },
    HOME: { screen: ChannelQueueScreen }
  },
  {
    initialRouteName: "SEARCH"
  }
);

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
  }
});
