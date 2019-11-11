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
  
  static navigationOptions = () => ({
    //header: null,
    title: "FIND A CHANNEL TO JOIN",
  });
  
    render() {
    return (
    <ScrollView style={styles.container}>
       
       <View style={styles.getStartedContainer}> 
         
          <Button title='THIS IS THIS THE CHANNEL U WANTED :)' onPress={()=>{this.props.navigation.navigate('Queue')}}/>

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
      Channel: {screen: ChannelScreen},
      Queue: {
        screen: ChannelQueueScreen
      },
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
