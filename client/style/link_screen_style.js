import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: "#101227",
        //backgroundColor: "#070C3C",
    },
    imageStyle: {
        width: 150,
        height: 150,
        padding: 20,
    },
    buttonStyle: {
        fontWeight: 'bold',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#1ED760",
        borderRadius: 50,
        borderWidth: 1,
        width: 230,
        height:50,
        fontSize: 30,
        borderColor: 'white',
        borderWidth: 2.2,
    },
    buttonStyle2: {
        fontWeight: 'bold',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#070C3C",
        borderRadius: 50,
        borderWidth: 1,
        width: 180,
        height:50,
        fontSize: 30,
        borderColor: "#1ED760",
    },
    LinkScreenContainer: {
        //fontSize: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "white",
        backgroundColor: "#101227",
        //backgroundColor: "#070C3C",
    },
    textStyleLink: {
        fontSize: 20,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText2: {
        color: "white",
        fontWeight: 'bold',
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20
    },
});


export {styles}