import React from "react";
import { TouchableOpacity, Alert, ScrollView, StyleSheet, Text, View, Button, AsyncStorage, ImageBackground } from "react-native";
import { Overlay } from 'react-native-elements';
import { deleteChannel } from '../api/channel';
import { styles } from '../style/option_screen_style';
import { createStackNavigator, NavigationActions } from 'react-navigation';

/* OptionScreen:
 *    Option Screen shows the options for either host or channelmats to leave the channel
 */
export default class OptionScreen extends React.Component {

  render() {
    return (
      <ImageBackground source={require("../assets/images/option_background.png")} style={styles.container}>

        <View style={styles.buttonContainer}>
          <View style={{alignItems: "flex-start"}}>

          <Text style={styles.hostTitleText}>MENU</Text>

            <TouchableOpacity
              onPress={
                this._alertJoinCode
              }
            >
              <Text style={styles.buttonText}>GET JOIN CODE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this._closeChannel()
              }}
            >
              <Text style={styles.buttonText}>CLOSE THE CHANNEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this._closeChannel()
              }}
            >
              <Text style={styles.buttonText}>UNLINK MY ACCOUNT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  _closeChannel = async () => {
    // Get channel_id
    let channel_id = await this._getChannelId();
    // Close channel
    deleteChannel(channel_id);
    this.props.navigation.goBack(
      this.props.navigation.goBack(
        this.props.navigation.goBack(
          this.props.navigation.goBack(
            this.props.navigation.goBack(
              this.props.navigation.goBack(
                this.props.navigation.goBack(null)
              )
            )
          )
        )
      )
    );
  }

  _alertJoinCode = async () => {
    let join_code = "";
    try {
      join_code = (await AsyncStorage.getItem("join_code")) || "none";
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }

    return Alert.alert(
      'Your join code: ',
      join_code, [
      { text: 'OK' }
    ]
    );
  }

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
