import * as React from 'react';
import {
    AppRegistry,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Button,
    Alert,
    ImageBackground
} from 'react-native';

// for screen switch 
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

// for stacknaviagtor
import LinksScreen from './links_screen';
import ChannelScreen from './find_channel_screen';
import { styles } from '../style/home_screen_style';

// HomeScreen
class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titleText: 'Q-UP',
            createButtonText: 'Create Channel',
            joinButtonText: 'Join Channel'
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require("../assets/images/home_background.png")} style={styles.getStartedContainer}>

                <View style={{ paddingBottom: 85 }}>
                    <Image source={require("../assets/images/qup_text_logo.png")} style={{ width: 250, height: 110 }} />
                </View>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => { navigate("LINKFLOW"); }}>
                    <Text style={styles.buttonTextHomeScreen}> {this.state.createButtonText} </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle2}
                    onPress={() => { navigate("CHANNELFLOW"); }}>
                    <Text style={styles.buttonTextHomeScreen}> {this.state.joinButtonText} </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

// Used to assign screens to a variable which are used to connect screens
// const ScreenStack = createStackNavigator(
const ScreenStack = createStackNavigator(
    {
        HOME: HomeScreen,
        LINKFLOW: LinksScreen,
        CHANNELFLOW: ChannelScreen,
    },
    {
        initialRouteName: 'HOME',
        headerMode: 'none',
        headerBackTitleVisible: null
    }
);

const AppContainer = createAppContainer(ScreenStack);

export default AppContainer;