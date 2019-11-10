import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';

export default function BasicButton (props){
  
  return (
      <View style={styles.buttonContainer}>
        <Button 
          title={props.title}
          onPress={handleOnPressButton}
          id={props.id}
          style={props.style}
        />
      </View>
    );

}

 // handle the switch case
 function handleOnPressButton(gg) {
  // switch function based on button id
  switch (gg.id){
    case '1': // 1 - creat
      creation();
    break;
    case '2': // 2 - join
      membership();
    break;
    default:  // 
        alert('UNKNOW!');
  }
}

function creation (){
  alert('PLEASE LINK YOUR SPOTIFY ACCOUNT');
}

function membership (){
  alert('PLEASE SELECTE A CHANNEL TO JOIN');
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   fontSize:30,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});