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

import { joinChannel } from '../api/channel';
import { styles } from "../style/sign_in_screen_style";

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
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Verification</Text>

          <View style={{paddingBottom: 25}}>
          <Image
            style={styles.icon}
            source={require("../assets/images/qup_logo.png")}
          />
          </View>

          <Text style={styles.inputSubLabel}>
            Please enter the channel code
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

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
            underlayColor="#fff"
          >
            <Text style={styles.nextButtonText}>Cancel</Text>
          </TouchableOpacity>

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