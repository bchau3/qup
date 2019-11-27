import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { styles } from "../style/splash_screen_style";

export default class SplashScreen extends React.Component {

    render() {
        return (
            <View style={styles.backgroundContainer}>

                <View style={styles.ImageContainer}>
                    <Image
                        style={styles.imageStyle}
                        source={require("../assets/images/qup_logo.png")}
                    />
                </View>
            </View>
        );
    }
}