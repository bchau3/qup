import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthSession, apisAreAvailable } from 'expo';

// Authentication APIs
import {storeCodeAtId, getAuthToken} from '../api/auth.js';

// Get server info from config file
import {server_url} from '../config.js';

export default class TestLogin extends Component {
    state = {
        userInfo: null,
        access: null,
        authToken: null,
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {!this.state.access ? (
                    <Button title="Open Spotify Auth" onPress={this._handlePressAsync} />
                ) : (
                        this._renderUserInfo()
                    )}
            </View>
        );
    }

    // Handle Printing Info
    // This info is printed after authentication
    _renderUserInfo = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text>Code: {this.state.access.code} </Text>
                <Text>State: {this.state.access.state} </Text>
                <Text>AuthToken: {this.state.authToken}</Text>
                <Button onPress={this._handlePressStoreCodeAsync.bind(this, )} title="Store Code"> </Button>
                <Button title="Get Auth Token"> </Button>
                <Button title="Refresh Auth Token"> </Button>
                <Button onPress={this.clearInfo} title="Clear info"> </Button>
            </View>
        );
    };

    // Stores the current code at user with 'id' in database
    _handlePressStoreCodeAsync = async (code, id) => {
        storeCodeAtId(code, id);
    }

    // Handle Login
    _handlePressAsync = async () => {
        let redirectUrl = AuthSession.getRedirectUrl();

        // You need to add this url to your authorized redirect urls on your Spotify dashboard
        console.log({
            redirectUrl
        });

        // Make request
        let result = await AuthSession.startAsync({
            authUrl:
                `${server_url}/login/` +
                `${encodeURIComponent(redirectUrl)}`,
        });

        if (result.type !== 'success') {
            alert('Uh oh, something went wrong');
            return;
        }

        // Params has format {code: "", state: ""}
        console.log(result.params);
        this.setState({access: result.params});
        
        

        // TODO: Get accessToken from code
        console.log(getAuthToken(result.params.code, redirectUrl));

        // TODO: Get username with accessToken

        // TODO: Store code @ user w/ username in database
        let storeResponse = await storeCodeAtId(this.state.access.code, 1);
    };

    // Clear userInfo to restart auth process
    clearInfo = () => {
        this.setState({access: null});
    }

}