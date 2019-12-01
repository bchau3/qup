import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: "#89Cff0"
    },
    getStartedContainer: {
      fontSize: 20,
      alignItems: "center",
      marginHorizontal: 0,
      marginVertical: 90
    },
    getStartedText: {
      fontSize: 17,
      color: "rgba(96,100,109, 1)",
      lineHeight: 24,
      textAlign: "center"
    },
    todoText: {
      fontSize: 14,
      color: "#000000",
      lineHeight: 24,
      textAlign: "left",
      paddingLeft: 30
    },
    buttonStyle: {
      marginRight: 10,
      marginLeft: 10,
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 2,
      backgroundColor: "#c6c6c6",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#000000",
      width: 340,
      height: 70,
      flexDirection: "row"
    },
    buttonStyleOnPlaying: {
      marginRight: 10,
      marginLeft: 10,
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#c6c6c6",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#ff3fc9",
      width: 340,
      height: 70,
      flexDirection: "row"
    },
    buttonText: {
      color: "#000000",
      textAlign: "center",
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 12,
    },
    title: {
        color: "white",
        textAlign: "left",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 15,
        fontWeight: 'bold'
      },
    songTitle: {
      color: "black",
      textAlign: "left",
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom:10,
      fontSize: 15,
      fontWeight: 'bold'
    },
    playbackControl: {
      marginRight: 0,
      marginLeft: 0,
      marginTop: 0,
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: "#FFFFFF",
      borderRadius: 0,
      borderWidth: 1,
      borderColor: "#000000",
      width: 500,
      height: 100,
      //justifyContent: "space-between",
      alignSelf: 'flex-end',
      bottom: 0,
    }
  });

  export {styles}