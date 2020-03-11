import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, processColor, TouchableHighlight, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {WebView} from 'react-native-webview';

async function storeData(key, data) {
    try {
        await AsyncStorage.setItem(key, data)
    } catch (e) {
        console.log('nahhh')
        console.log(e)
    }
}
async function logGetData(key) {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value != null)
            console.log(value)
    } catch (e) {
        console.log('oh no')
        console.log(e)
    }
}
async function getData(key) {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value != null)
            return value;
    } catch (e) {
        console.log('oh no')
        console.log(e)
    }
}
class TimedWebView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            min: '00',
            sec: '00',
            timer: 'null',
            startDisable: false,
            start: '',
            end: ''
        }
        getData('start').then((val) => { this.setState({ start: val }) })
        getData('end').then((val) => { this.setState({ end: val }) })
    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
    onStart = () => {
        let timer = setInterval(() => {

            var num = (Number(this.state.sec) + 1).toString(),
                count = this.state.min;

            if (Number(this.state.sec) == 59) {
                count = (Number(this.state.min) + 1).toString();
                num = '00';
            }

            this.setState({
                min: count.length == 1 ? '0' + count : count,
                sec: num.length == 1 ? '0' + num : num
            });
        }, 1000);
        this.setState({ timer });

        this.setState({ startDisable: true })

    }
    onStop = () => {
        clearInterval(this.state.timer);
        this.setState({ startDisable: false })
    }
    onButtonClear = () => {
        this.setState({
            timer: null,
            min: '00',
            sec: '00',
        });
    }
    _onNavChange(webViewState){
        let url = webViewState.url;
        if(url==this.state.end){
            this.onStop();
        }
    }

    render() {
        if (!this.state.startDisable)
            return (
                <View style={styles.MainContainer}>

                    <Text style={styles.counterText}>{this.state.min} : {this.state.sec}</Text>

                    <TouchableOpacity
                        onPress={this.onStart}
                        activeOpacity={0.6}
                        style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]}
                        disabled={this.state.startDisable} >

                        <Text style={styles.buttonText}>START</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.onStop}
                        activeOpacity={0.6}
                        style={[styles.button, { backgroundColor: '#FF6F00' }]} >

                        <Text style={styles.buttonText}>STOP</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.onButtonClear}
                        activeOpacity={0.6}
                        style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]}
                    >

                        <Text style={styles.buttonText}> CLEAR </Text>

                    </TouchableOpacity>

                </View>

        );
        else {
            return (
                <View style={styles.MainContainer}>

                    <Text style={styles.counterText}>{this.state.min} : {this.state.sec}</Text>

                    <TouchableOpacity
                        onPress={this.onStart}
                        activeOpacity={0.6}
                        style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]}
                        disabled={this.state.startDisable} >

                        <Text style={styles.buttonText}>START</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.onStop}
                        activeOpacity={0.6}
                        style={[styles.button, { backgroundColor: '#FF6F00' }]} >

                        <Text style={styles.buttonText}>STOP</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.onButtonClear}
                        activeOpacity={0.6}
                        style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]}
                    >

                        <Text style={styles.buttonText}> CLEAR </Text>

                    </TouchableOpacity>

                    <WebView
        onNavigationStateChange={this._onNavChange.bind(this)}
        source={{ uri: this.state.start }}
        style={styles.web}
      />

                </View>)
        }

    }
}

export function Race({ navigation }) {
    return (<View style={{ flex: 1 }}>

        <TimedWebView />

    </View>)
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        width: '80%',
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 7,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    },
    counterText: {

        fontSize: 28,
        color: '#000'
    },
    web:{
        width:320,
        height:60 
    }
});