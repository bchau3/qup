import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#101227",
        //backgroundColor: "#89Cff0"
    },
    resultContainer: {
        backgroundColor: "#101227",
    },
    contentContainer: {

        backgroundColor: "white"
    },
    searchBarContainer: {
        //flex: 1,
        backgroundColor: "pink",
        marginTop: 40
    },
    getStartedContainer: {
        fontSize: 20,
        backgroundColor: "#c6c6c6",
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
        paddingBottom: 10,
        backgroundColor: "#ffb6c1",
        borderRadius: 0,
        borderWidth: 1,
        borderColor: "#000000",
        width: 380,
        height: 70,
        flex: 1,
        flexDirection: "row"
    },
    buttonText: {
        color: "#000000",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
    },
    songTitle: {
        color: "#000000",
        textAlign: "left",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export {styles}