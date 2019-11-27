import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';

// import screens
import SplashScreen from './screens/splash_screen';
import HomeScreen from './screens/home_screen';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        1500
      )
    )
  }

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
        this.setState({isLoading: false});
    }
  }

  render() {
    //if (!isLoadingComplete && !props.skipLoadingScreen) {
    if (this.state.isLoading){
      return (
        <SplashScreen />
      );
    } else {
      return (
          < HomeScreen />
      );
    }


  }
}