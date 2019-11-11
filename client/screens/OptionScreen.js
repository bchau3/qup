import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
  } from 'react-native';

// for screen switch 
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

class OptionScreen extends React.Component {
  static navigationOptions = {
    //title: 'OPTION',
    header: null
  }

  render(){ 
    const {navigate} = this.props.navigation;
    return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}> 
            <Text>HIDING BUTTONS DEPENDS ON WHO THE USER IS</Text>
            <Text>!OPTION!</Text>
            <Text>!LEAVE CHANNEL!</Text>
            <Text>!CLOSE CHANNEL!</Text>
            <Text>!UNLINK MY ACCOUNT!</Text>
            {/*<Button title='UNLINK MY ACCOUNT' 
              onPress={()=>{
                alert('successfully unlinking your account'), 
                this.props.navigation.goBack(null)}
                }
              />*/}
        </View>
      </ScrollView>  
    </View>
  );
}
}

// createStackNavigator + creastAppCOntainer for screen switch
const RootStack = createStackNavigator(
  {
    Channel: {screen: OptionScreen}
  },
  {
    initialRouteName: 'Channel',
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
    getStartedContainer: {
      fontSize:20,
      backgroundColor:"white",
      alignItems: 'center',
      marginHorizontal: 0,
      marginVertical:90
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
