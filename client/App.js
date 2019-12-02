import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';

// import screens
import SplashScreen from './screens/splash_screen';
import HomeScreen from './screens/home_screen';

console.disableYellowBox = true;

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
      return <HomeScreen startAsync={loadBackgroundAsyn} />;
    }
  }
}

async function loadBackgroundAsyn() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/general_background.png'),
      require('./assets/images/home_background.png'),
      require('./assets/images/option_background.png'),
      require('./assets/images/queue_background.png'),
      require('./assets/images/search_background.png'),
      require('./assets/images/splash_screen_background.png'),
      require('./assets/images/spotifyLogo.png'),
      require('./assets/images/qup_logo.png'),
      require('./assets/images/qup_text_logo.png')
    ])
  ]);
}