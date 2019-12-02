import React, { createRef } from "react";
import {
  AppRegistry, // change background color
  Image,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
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
import { LinearGradient } from 'expo-linear-gradient';


// For Confirmation code
export const CELL_SIZE = 60;
export const CELL_BORDER_RADIUS = 5;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#ff3fc9";
export const ACTIVE_CELL_BG_COLOR = "powderblue";
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

  inputRef = createRef();

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
      const { current } = this.inputRef;
      if (current) {
        current.clear();
        current.focus();
      }
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
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
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
            outputRange: [1, .8]
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.initContainer}>
          {/* <View style={styles.inputWrapper}> */}
          <LinearGradient
            colors={['#101227', '#36C3FF']}
            start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 6.5 }}
            style={styles.container}
          >

            <Text style={styles.inputLabel}>Verification</Text>

            <View style={{ paddingBottom: 25 }}>
              <Image
                style={styles.icon}
                source={require("../assets/images/qup_logo.png")}
              />
            </View>

            <Text style={styles.inputSubLabel}>
              Please enter the channel code
          </Text>

            <View style={{ paddingBottom: 50 }}>
              <CodeFiled
                ref={this.inputRef}
                autoFocus={true}
                variant="clear"
                codeLength={codeLength}
                keyboardType="numeric"
                cellProps={this.cellProps}
                containerProps={this.containerProps}
                onFulfill={this.onFinishCheckingCode}
                CellComponent={Animated.Text}
              />
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              underlayColor="#fff"
            >
              <Text style={styles.nextButtonText}>Cancel</Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* </View> */}
        </View>
      </TouchableWithoutFeedback>
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