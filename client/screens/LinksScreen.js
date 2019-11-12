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

<<<<<<< HEAD
  static navigationOptions = {
    title: 'Account Link',
    header: null,
  }
=======
    static navigationOptions = {
        title: 'LINK',
        header: null,
    }
>>>>>>> b7d6aad586d05c6fe3aa5a2e76c58217c5707814

    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>

<<<<<<< HEAD
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
=======

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
>>>>>>> b7d6aad586d05c6fe3aa5a2e76c58217c5707814
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
<<<<<<< HEAD
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

=======
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
>>>>>>> b7d6aad586d05c6fe3aa5a2e76c58217c5707814
