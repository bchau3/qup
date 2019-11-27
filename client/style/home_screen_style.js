import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: "#101227",
        //backgroundColor: "#070C3C",
    },
    buttonContainer: {
        fontSize: 50,
        flexDirection: "row",
        backgroundColor: "gold",
        alignItems: "center",
        marginHorizontal: 55,
        marginVertical: 200
    },
    titleContainer: {
        //font: 'Normal',
        fontSize: 95,
        //color: '#36c3ff',
        color: 'pink',
        alignItems: "center",
        fontWeight: "900"
    },
    developmentModeText: {
        marginBottom: 20,
        color: "rgba(0,0,0,0.4)",
        fontSize: 14,
        lineHeight: 19,
        textAlign: "center"
    },
    contentContainer: {
        paddingTop: 30
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10,
        backgroundColor: "black"
    },
    getStartedContainer: {
        //flex: 1,
        //fontSize: 25,
        //color: 'whitesmoke',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightText: {
        color: "rgba(96,100,109, 0.8)"
    },
    codeHighlightContainer: {
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        lineHeight: 24,
        textAlign: "center"
    },
    tabBarInfoContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: "center",
        backgroundColor: "#fbfbfb",
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        textAlign: "center"
    },
    navigationFilename: {
        marginTop: 5
    },
    helpContainer: {
        marginTop: 15,
        alignItems: "center"
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        fontSize: 14,
        color: "#2e78b7"
    },
    buttonSize: {
        fontSize: 100,
        width: 100,
        height: 100,
        color: "#2e78b7"
    },
    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ffb6c1",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000000"
    },
    loginText: {
        color: "#000000",
        textAlign: "center",
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 25
    },
    todoText: {
        textAlign: "left",
        fontSize: 15
    },
    buttonStyle: {
        fontWeight: 'bold',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ff3fc9",
        borderRadius: 50,
        borderWidth: 2.2,
        borderColor: "white",
        width: 230,
        height: 60,
    },
    buttonStyle2: {
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
    buttonText: {
        color: "black",
        fontWeight: 'bold',
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 25
    },
    buttonTextHomeScreen: {
        color: "white",
        fontWeight: 'bold',
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 25
    },
    imageStyle: {
        width: 150,
        height: 150,
        padding: 20,
    },
});

export { styles }