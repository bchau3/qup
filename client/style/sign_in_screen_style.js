import { Platform, StyleSheet } from 'react-native';
// For Confirmation code
export const CELL_SIZE = 80;
export const CELL_BORDER_RADIUS = 20;
export const DEFAULT_CELL_BG_COLOR = "red";
export const NOT_EMPTY_CELL_BG_COLOR = "yellow";
export const ACTIVE_CELL_BG_COLOR = "orange";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#070C3C",
    },
    getStartedContainer: {
      fontSize: 20,
      backgroundColor: "#89CFF0",
      alignItems: "center",
      marginHorizontal: 0,
      marginVertical: 30
    },
    getStartedText: {
      fontSize: 17,
      color: "rgba(96,100,109, 1)",
      lineHeight: 24,
      textAlign: "center"
    },
    todoText: {
      textAlign: "left",
      fontSize: 15
    },
    contentContainer: {
      paddingTop: 30
    },
    buttonStyle: {
      marginRight: 10,
      marginLeft: 10,
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#ffb6c1",
      borderRadius: 50,
      borderWidth: 1,
      borderColor: "#000000",
      width: 200
    },
    buttonText: {
      color: "#000000",
      textAlign: "center",
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 15
    },
    imageStyle: {
      width: 250,
      height: 250
    },
    inputWrapper: {
      //backgroundColor: "#070C3C",
      backgroundColor: "white",
      //paddingHorizontal: 5,
      flex: 0.65,
        alignItems: 'center',
      justifyContent: 'center',
    },
    inputLabel: {
      //paddingTop: 50,
      color: "black",
      fontSize: 25,
      fontWeight: "700",
      textAlign: "center",
      flexDirection: "column-reverse"
      //paddingBottom: 40
    },
  
    icon: {
      width: 150,
        height: 150,
        //padding: 20,
    },
    inputSubLabel: {
      //paddingTop: 30,
      fontSize: 20,
      color: "black",
      textAlign: "center"
    },
    inputWrapStyle: {
      height: CELL_SIZE,
      marginTop: 30,
      paddingHorizontal: 20,
      justifyContent: "space-between"
    },
  
    input: {
      margin: 0,
      height: CELL_SIZE,
      width: CELL_SIZE,
      lineHeight: 55,
      ...Platform.select({
        web: {
          lineHeight: 65
        }
      }),
      fontSize: 30,
      borderRadius: CELL_BORDER_RADIUS,
      color: "#3759b8",
      backgroundColor: "#fff",
  
      // IOS
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      // Android
      elevation: 3
    },
  
    nextButton: {
    //   marginTop: 40,
    //   borderRadius: 80,
    //   minHeight: 80,
    //   backgroundColor: "#3557b7",
       justifyContent: "center",
    //   flex: 1,
    //   minWidth: 360,
    //   marginBottom: 100,
      
      fontWeight: 'bold',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#36C3FF",
        borderRadius: 50,
        borderWidth: 2.2,
        borderColor: "white",
        width: 230,
        height: 60,
    },
  
    nextButtonText: {
      textAlign: "center",
      fontSize: 20,
      color: "#fff",
      fontWeight: "700"
    }
  });

export {styles}