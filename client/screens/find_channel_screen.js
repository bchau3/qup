import React from "react";
import {
  AppRegistry, // change background color
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert
} from "react-native";

import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ChannelQueueScreen from "./channel_queue_screen";

/* ChannelScreen:
 *    ChannelScreen promote user to enter a invitation code to join an existing channel
 *    If successful, switch ChannelQueueScreen. Otherwise, ask user to enter code again.
 *    Having back button for user to go back to home page of the app
 */
class ChannelScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
    title: "Join Channel"
  });

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.getStartedContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.props.navigation.navigate("QUEUE");
            }}
            underlayColor="#fff"
          >
            <Text style={styles.buttonText}>Channel Joined</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
            underlayColor="#fff"
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.todoText}>TODOS:Find Channels To Join</Text>
        <Text style={styles.todoText}>1. enter invitation code?</Text>
        <Text style={styles.todoText}>
          2. comfirmation of joining the channel
        </Text>
        <Text style={styles.todoText}>3. switch to queue screen</Text>
        <Text style={styles.todoText}>
          4. button to refresh the channel list
        </Text>
        <Text style={styles.todoText}>5. if user is banned, show alert</Text>
      </ScrollView>
    );
  }
}

const ChannelmateFlow = createStackNavigator(
  {
    FINDCHANNEL: ChannelScreen,
    QUEUE: ChannelQueueScreen
  },
  {
    headerMode: "none"
  }
);
const AppContainer = createAppContainer(ChannelmateFlow);

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89Cff0"
  },
  getStartedContainer: {
    fontSize: 20,
    backgroundColor: "#89CFF0",
    alignItems: "center",
    marginHorizontal: 0,
    marginVertical: 30
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  todoText: {
    textAlign: "left",
    fontSize: 15
  },
  contentContainer: {
    paddingTop: 30
  },
  buttonStyle: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffb6c1",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
    width: 200
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15
  },
  imageStyle: {
    width: 250,
    height: 250
  }
});
