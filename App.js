import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {WebView} from 'react-native-webview';

const Stack = createStackNavigator();


function HomeScreen({navigation}){
  return (<View>
    <Text>Start Link:</Text>
    <Text>End Link:</Text>
  </View>)
}
function Race({navigation}){

  function _onNavChange(webViewState){
    let url = webViewState.url;
  }

  return (<View>
    <WebView
    
    />
  </View>)
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WikiRace Start" component={HomeScreen}/>
        <Stack.Screen name="WikiRace Go!" component={Race}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
