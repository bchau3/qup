import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';

export default function BasicButton(props) {
    return (
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleOnPressButton}
            title={props.title}
          />
        </View>
    );
}

function handleOnPressButton() {
    alert('You tapped the button!');
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});