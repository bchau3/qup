import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 70
    // backgroundColor: "#89CFF0"
    backgroundColor: "#070C3C"

  },
  getStartedContainer: {
    fontSize: 20,
    backgroundColor: "#89CFF0",
    alignItems: "flex-start",
    marginHorizontal: 0,
    marginVertical: 90,
    paddingLeft: 30
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    paddingBottom: 40
  },
  titleText: {
     paddingTop: 70,
    // paddingLeft: 40,
    paddingBottom: 70,
    fontSize: 55,
    color: "#36C3FF",
    fontWeight: "700"
  },
  hostTitleText: {
     paddingTop: 70,
    // paddingLeft: 40,
    paddingBottom: 70,
    fontSize: 55,
    color: "#ff3fc9",
    fontWeight: "700"
  },
  buttonContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  }
});

export { styles }