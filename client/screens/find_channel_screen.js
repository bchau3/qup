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
  Alert,
  Animated,
  AsyncStorage
} from "react-native";

import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions
} from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import ChannelQueueScreen from "./channel_queue_screen";

import {joinChannel} from '../api/channel';

// For Confirmation code
export const CELL_SIZE = 70;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
export const ACTIVE_CELL_BG_COLOR = "#f7fafe";
const codeLength = 4;
import CodeFiled from "react-native-confirmation-code-field";

/* ChannelScreen:
 *    ChannelScreen promote user to enter a invitation code to join an existing channel
 *    If successful, switch ChannelQueueScreen. Otherwise, ask user to enter code again.
 *    Having back button for user to go back to home page of the app
 */

class JoinChannelScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
    title: "Join Channel"
  });

  _animationsColor = [...new Array(codeLength)].map(
    () => new Animated.Value(0)
  );
  _animationsScale = [...new Array(codeLength)].map(
    () => new Animated.Value(1)
  );

  onFinishCheckingCode = async code => {
    // Check for channel with code
    channel_id = await joinChannel(code);
    // If channel_id not returned
    if (channel_id == null) {
      return Alert.alert(
        "Channel Code",
        "No channel exists with code",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    // channel_id returned
    // Set Asyncstorage to channel_id
    this._storeChannelId(channel_id);
    // Go to queue page for channel
    Alert.alert("Confirmation Code", "Successful!", [{ text: "OK" }], {
      cancelable: false
    });
    this.props.navigation.navigate("QUEUE");
  };

  _storeChannelId = async (channel_id) => {
    try {
      await AsyncStorage.setItem("channel_id", channel_id.toString());
    } catch (error) {
      // Error storing data
      console.log(error.message);
    }
  };

  animateCell({ hasValue, index, isFocused }) {
    Animated.parallel([
      Animated.timing(this._animationsColor[index], {
        toValue: isFocused ? 1 : 0,
        duration: 250
      }),
      Animated.spring(this._animationsScale[index], {
        toValue: hasValue ? 0 : 1,
        duration: hasValue ? 300 : 250
      })
    ]).start();
  }

  cellProps = ({ hasValue, index, isFocused }) => {
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? this._animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          })
        : this._animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          }),
      borderRadius: this._animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS]
      }),
      transform: [
        {
          scale: this._animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1]
          })
        }
      ]
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      this.animateCell({ hasValue, index, isFocused });
    }, 0);

    return {
      style: [styles.input, animatedCellStyle]
    };
  };

  containerProps = { style: styles.inputWrapStyle };

  render() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Verification</Text>
        <Image
          style={styles.icon}
          source={require("../assets/images/qup_logo.png")}
        />
        <Text style={styles.inputSubLabel}>
          {"Please enter the channel code"}
        </Text>
        <CodeFiled
          maskSymbol=" "
          variant="clear"
          codeLength={codeLength}
          keyboardType="numeric"
          cellProps={this.cellProps}
          containerProps={this.containerProps}
          onFulfill={this.onFinishCheckingCode}
          CellComponent={Animated.Text}
        />
        <View style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Verify</Text>
        </View>
      </View>
    );
  }
}

const ChannelmateFlow = createStackNavigator(
  {
    JOINCHANNEL: JoinChannelScreen,
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
  },
  inputWrapper: {
    backgroundColor: "white",
    paddingHorizontal: 20
  },

  inputLabel: {
    paddingTop: 50,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40
  },

  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto"
  },
  inputSubLabel: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center"
  },
  inputWrapStyle: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },

  input: {
    margin: 0,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: 55,
    ...Platform.select({
      web: {
        lineHeight: 65
      }
    }),
    fontSize: 30,
    borderRadius: CELL_BORDER_RADIUS,
    color: "#3759b8",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3
  },

  nextButton: {
    marginTop: 40,
    borderRadius: 80,
    minHeight: 80,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    flex: 1,
    minWidth: 360,
    marginBottom: 100
  },

  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700"
  }
});
