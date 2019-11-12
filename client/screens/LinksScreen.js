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

// for screen switch 
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HostQueueScreen from './HostQueueScreen';


class LinksScreen extends React.Component {

  static navigationOptions = {
    title: 'Account Link',
    header: null,
  }

  render(){ 
    const {navigate} = this.props.navigation;
    return (

    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        

        <View style={styles.getStartedContainer}> 
          <Text style={styles.linkPrompt}>Link your Spotify Premium Account!</Text>
          <TouchableOpacity
            style = {styles.buttonStyle}
            onPress = {() => {navigate('Links')}}
            underlayColor = '#fff'>
            <Text style = {styles.buttonStyleText}>Link Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.buttonStyle}
            onPress = {() => {this.props.navigation.goBack(null)}}
            underlayColor = '#fff'>
            <Text style = {styles.buttonStyleText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>  
    </View>
  );
  }
}

class SignInOption extends React.Component {
  render(){
      return (
        <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
      <View style={styles.getStartedContainer}> 
       <Text style = {styles.linkPrompt}>Provide login credentials!</Text>
          <TouchableOpacity
            style = {styles.buttonStyle}
            onPress = {() => {alert('Successfully linked account!'), this.props.navigation.navigate('Host')}}
            underlayColor = '#fff'>
            <Text style = {styles.buttonStyleText}>Success!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.buttonStyle}
            onPress={()=>{alert('Failed to link your account...'), this.props.navigation.goBack(null)}}            
            underlayColor = '#fff'>
            <Text style = {styles.buttonStyleText}>Fail!</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>  
    </View>
      );
  }
}

// createStackNavigator + creastAppCOntainer for screen switches
const RootStack = createStackNavigator(
  {
    Home: LinksScreen,
    Links: SignInOption,
    Host: HostQueueScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
const AppContainer = createAppContainer(RootStack);

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#89CFF0',
  },
  linkPrompt: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',    
  },
  buttonStyle: {
    marginRight:100,
    marginLeft:100,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#ffb6c1',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#000000'
  },
  buttonStyleText: {
    color:'#000000',
    textAlign:'center',
    paddingLeft : 20,
    paddingRight : 20,
    fontSize : 15
  },
});

