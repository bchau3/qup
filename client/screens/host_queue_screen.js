import * as React from 'react';
import { ScrollView,StyleSheet,Text,View, Button} from 'react-native';

// for screen switch 
import { createBottomTabNavigator } from 'react-navigation'
import OptionScreen from "./option_screen";
import SearchBarScreen from "./search_bar_screen";
import SongQueue from "../components/song_queue";
import {playSong} from "../api/queue";

/* HostQueueScreen:
 *    Screen shows the song queue that are made for the host only
 *    It has all functionality of a Channelmate Queue, but with more
 *    options such as skip song, etc.
 */
class HostQueueScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'QUEUE',
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <SongQueue />

            <Button
              title="Play Song"
              onPress={() => {
                this._playSong
              }}
            />
              
        </ScrollView>

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
  }
});