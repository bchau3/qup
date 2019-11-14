import React from 'react';
import {
    AppRegistry,    // change background color
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Alert
} from 'react-native';

import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import ChannelQueueScreen from './channel_queue_screen';


/* ChannelScreen:
 *    ChannelScreen promote user to enter a invitation code to join an existing channel
 *    If successful, switch ChannelQueueScreen. Otherwise, ask user to enter code again.
 *    Having back button for user to go back to home page of the app
 */
class ChannelScreen extends React.Component {

    static navigationOptions = () => ({
        //header: null,
        title: "FIND A CHANNEL TO JOIN",
    });

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.getStartedContainer}>
                    <Text>Enter Your Invitation Code</Text>
                    <Button title='FOUND' onPress={() => { this.props.navigation.navigate('QUEUE') }} />
                    <Button title='SORRY' onPress={() => { this.props.navigation.goBack(null) }} />
                </View>

                <Text style={styles.todoText}>
                    TODOS:Find Channels To Join
          </Text>
                <Text style={styles.todoText}>
                    1.  enter invitation code?
          </Text>
                <Text style={styles.todoText}>
                    2.  comfirmation of joining the channel
          </Text>
                <Text style={styles.todoText}>
                    3.  switch to queue screen
          </Text>
                <Text style={styles.todoText}>
                    4.  button to refresh the channel list
          </Text>
                <Text style={styles.todoText}>
                    5.  if user is banned, show alert
          </Text>


            </ScrollView>
        );
    }
}



const ChannelmateFlow = createStackNavigator(
    {
        FINDCHANNEL: ChannelScreen,
        QUEUE: ChannelQueueScreen,
    },
    {
        headerMode: 'none'
    }
)
const AppContainer = createAppContainer(ChannelmateFlow);

export default AppContainer;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#89CFF0',
    },
    getStartedContainer: {
        fontSize: 20,
        backgroundColor: "white",
        alignItems: 'center',
        marginHorizontal: 0,
        marginVertical: 90
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    todoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
    },
});