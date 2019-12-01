import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: "#89Cff0"
    },
    getStartedContainer: {
      fontSize: 20,
      backgroundColor: "#89Cff0",
      alignItems: "flex-start",
      marginHorizontal: 20,
      marginVertical: 60
    },
    getStartedText: {
      fontSize: 17,
      color: "rgba(96,100,109, 1)",
      lineHeight: 24,
      textAlign: "center"
    },
    todoText: {
      fontSize: 17,
      color: "rgba(96,100,109, 1)",
      lineHeight: 24,
      textAlign: "left"
    },
    playbackControl: {
      backgroundColor: "black",
      borderRadius: 0,
      borderWidth: 1,
      borderColor: "white",
      width: 375,
      height: 110,
      alignSelf: 'center',
      bottom: 0,
      flexDirection: 'row',
    },
    songTitle: {
      color: "white",
      fontSize: 20,
      fontWeight: "600",
    },
    artistName: {
      color: "white",
      fontSize: 16
    }
  });

  export {styles}