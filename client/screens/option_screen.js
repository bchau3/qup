import React from "react";
import { ScrollView, StyleSheet, Text, View, Button, AsyncStorage} from "react-native";
import {deleteChannel} from '../api/channel';

/* OptionScreen:
 *    Option Screen shows the options for either host or channelmats to leave the channel
 */
export default class OptionScreen extends React.Component {
  render() {
    //const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text>HIDING BUTTONS DEPENDS ON THE ROLE OF THE USER</Text>
            <Text>[OPTION]</Text>
            <Text>!LEAVE CHANNEL! (CHANNELMATE ONLY)</Text>
            <Button
              title="LEAVE THE CHANNEL"
              onPress={() => {
                alert("Successfully Leaving the Channel"),
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
              }}
            />

            <Text>!CLOSE CHANNEL! (HOST ONLY)</Text>
            <Button
              title="CLOSE THIS CHANNEL"
              onPress={() => {
                this._closeChannel()
              }}
            />

            <Text>!UNLINK ACCOUNT! (HOST ONLY)</Text>
            {/* not a good call but it works */}
            <Button
              title="UNLINK MY ACCOUNT"
              onPress={() => {
                this._closeChannel()     
              }}
            />
          </View>
        </ScrollView>
      </View>
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
    backgroundColor: "#89CFF0"
  },
  getStartedContainer: {
    fontSize: 20,
    backgroundColor: "#89CFF0",
    alignItems: "flex-start",
    marginHorizontal: 0,
    marginVertical: 90,
    paddingLeft: 30
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
