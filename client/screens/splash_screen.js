import React from 'react';
import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { styles } from "../style/splash_screen_style";


export default class SplashScreen extends React.Component {

    render() {
        return (
            <ImageBackground source={require("../assets/images/splash_screen_background.png")} style={styles.ImageContainer}>
                <Image
                    style={styles.imageStyle}
                    source={require("../assets/images/qup_logo.png")}
                />
            </ImageBackground>
        );
    }
}