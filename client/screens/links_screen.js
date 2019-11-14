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
    Button
} from 'react-native';

import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import HostQueueScreen from './host_queue_screen';

/*
 * LinksScreen:
 *    Screen promoteS user to link account to Spotify server.
 *    When user agrees to link account, switch to SignInScreen.
 *    When user refused to link account, switch to HomeScreen.
 */
class LinksScreen extends React.Component {

    static navigationOptions = {
        header: null,
    }

    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>

                    <View style={styles.getStartedContainer}>
                        <Text>Promote user 2 options: LINK and CANCEL</Text>
                        <Text>Compare between screen or overlay for final result</Text>
                        <View styles={{ flexDirection: "row" }}>
                            <Button title='LINK' onPress={() => { navigate('SIGNIN') }} />
                            <Button title='CANCEL' onPress={() => { this.props.navigation.goBack(null) }} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

/* SignInScreen: 
 *   Screen where user links account and should automatically switch to HostQueueScreen
 *   if successful, otherwise return to previous page (LinksScreen)
 */
class SignInScreen extends React.Component {

    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.getStartedContainer}>
                        <Text>Show if user is able to connect to the Spotify account</Text>
                        <Button title='SUCCESSFULLY LINKING THE ACCOUNT' onPress={() => { alert('WELCOME'), this.props.navigation.navigate('HOST') }} />
                        <Button title='FAILED TO LINK YOUR ACCOUNT' onPress={() => { alert('OOPS'), this.props.navigation.goBack(null) }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const HostFlow = createStackNavigator(
    {
        LINK: LinksScreen,
        SIGNIN: SignInScreen,
        HOST: HostQueueScreen,
    },
    {
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(HostFlow);

export default AppContainer;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#89CFF0',
    },
    getStartedContainer: {
        fontSize: 20,
        backgroundColor: "gold",
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