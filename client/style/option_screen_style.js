import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 70,
    backgroundColor: "#89CFF0"
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
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    paddingBottom: 20
  },
  titleText: {
    paddingTop: 100,
    paddingLeft: 40,
    fontSize: 60,
    color: "#36C3FF",
    textAlign: "left",
    fontWeight: "700"
  },
  hostTitleText: {
    paddingTop: 100,
    paddingLeft: 40,
    fontSize: 60,
    color: "#ff3fc9",
    textAlign: "left",
    fontWeight: "700"
  },
  buttonContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  }
});

export { styles }