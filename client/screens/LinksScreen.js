import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from 'react-native';

// for screen switch 
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HostQueueScreen from './HostQueueScreen';


class LinksScreen extends React.Component {

    static navigationOptions = {
        title: 'LINK',
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
                        <Text>!PLEASE LINK YOUR SPOTIFY ACCOUNT!</Text>
                        <Button title='Link Account' onPress={() => { navigate('Links') }} />
                        <Button title='I DONT WANNA' onPress={() => { this.props.navigation.goBack(null) }} />

                    </View>
                </ScrollView>
            </View>
        );
    }
}

class SignInOption extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.getStartedContainer}>
                        <Text>!SIGN ME IN!</Text>
                        <Button title='SUCCESS' onPress={() => { alert('SUCC IT!!!!! :)'), this.props.navigation.navigate('Host') }} />
                        <Button title='OOPS NO' onPress={() => { alert('failed to link your account'), this.props.navigation.goBack(null) }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

// createStackNavigator + creastAppCOntainer for screen switches
const RootStack = createStackNavigator(
    {
        Home: LinksScreen,
        Links: SignInOption,
        Host: HostQueueScreen,
    },
);
const AppContainer = createAppContainer(RootStack);

export default AppContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});