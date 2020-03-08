import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, processColor, TouchableHighlight} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {WebView} from 'react-native-webview';

const Browser = require('react-native-browser')

const Stack = createStackNavigator();
class MyWeb extends Component {
  render() {
    return (<View style={{flex:1}}>
      <WebView
        source={{ uri: 'https://m.wikipedia.org' }}
        style={{ marginTop: 20, width:320, height:80 }}
      />
      </View>
    );
  }
}

function HomeScreen({navigation}){
  return (<View style={styles.container}>
    <View>
    <Text>Start Link:</Text>
    <Text>End Link:</Text>
    <View>
      <TouchableHighlight onPress={()=>{
        console.log('help');
      }
    }>
        <Text>Find link</Text>
      </TouchableHighlight>
    </View>
      

  </View>
  <MyWeb/>
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
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  video: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
    flex: 1
  }
});