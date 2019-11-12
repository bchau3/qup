import React from 'react';
import { ExpoLinksView } from '@expo/samples';
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

// for screen switch
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ChannelQueueScreen from './ChannelQueueScreen';

class ChannelScreen extends React.Component {
  
  static navigationOptions = {
      title: "Find a channel to join",
  }
  
    render() {
    return (
    <ScrollView style={styles.container}>
       
       <View style={styles.getStartedContainer}> 
          <TouchableOpacity
            style = {styles.buttonStyle}
            onPress = {() => {this.props.navigation.navigate('Queue')}}
            underlayColor = '#fff'>
            <Text style = {styles.buttonStyleText}>This is the channel you wanted!</Text>
          </TouchableOpacity>
        </View>

       <Text style={styles.todoText}>
            TODOS:Find Channels To Join
        </Text>
        <Text style={styles.todoText}>
            1.  enter invitation link? 
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

// createStackNavigator + creastAppCOntainer for screen switch
const RootStack = createStackNavigator(
    {
      Channel: ChannelScreen,
      Queue: ChannelQueueScreen,
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
    backgroundColor: '#89CFF0',
  },
  getStartedContainer: {
    fontSize:20,
    backgroundColor: '#89CFF0',
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
    color: '#000000',
    lineHeight: 24,
    textAlign: 'left',
    paddingLeft: 30
  },
  buttonStyle:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#ffb6c1',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#000000'
  },
  buttonStyleText:{
      color:'#000000',
      textAlign:'center',
      paddingLeft : 20,
      paddingRight : 20,
      fontSize : 15
  }
});
