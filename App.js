import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, processColor, TouchableHighlight} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {WebView} from 'react-native-webview';

async function storeData(key, data){
  try{
    await AsyncStorage.setItem(key, data)
  } catch(e){
    console.log('nahhh')
    console.log(e)
  }
}
async function getData(key){
  try{
    const value= await AsyncStorage.getItem(key)
    if(value!=null)
      return value;
  } catch(e){
    console.log('oh no')
    console.log(e)
  }
}

const Stack = createStackNavigator();
class MyWeb extends Component {
  storeData = async (key, data)=>{
    try{
      await AsyncStorage.setItem(key, data)
    } catch(e){
      console.log(e)
    }

  }
  _onNavChange(webViewState){
    let url = webViewState.url;
    this.storeData('curr', url)
  }
  
  render() {
    return (<View style={{flex:1, justifyContent:'center', alignSelf:'center'}}>
      <WebView
        onNavigationStateChange={this._onNavChange.bind(this)}
        source={{ uri: 'https://m.wikipedia.org' }}
        style={styles.web}
      />
      </View>
    );
  }
}

function HomeScreen({navigation}){
  return (<View style={styles.container}>
    <LinkGetter />
  <MyWeb/>
  </View>)
}

class LinkGetter extends Component{
  constructor(props){
    super(props);
    this.state={start:'<<-- Press to set the current wiki page as this!', end:'<<-- Press to set the current wiki page as this!'}
  }
  render(){
    return(
    <View>
      <TouchableHighlight onPress={()=>{
        getData('curr').then(val=>{
          this.setState({start:val})
          storeData('start', val).then(()=>console.log('yayyy'))
        })
        
      }
    }>
      <Text style={styles.button}>Set Start Link:</Text>
    </TouchableHighlight>

    <TouchableHighlight onPress={()=>{
      getData('curr').then(val=>{
        this.setState({end:val})
        storeData('end', val).then(()=>console.log('i think it worked'))
      });
      
      
    }}>
        <Text style={styles.button}>Set End Link:</Text>
      </TouchableHighlight>
    
    <View>
      <TouchableHighlight onPress={()=>{
        console.log('Start button here')
      }
    }>
        <Text>Find link</Text>
      </TouchableHighlight>
    </View>
      

  </View>
    )
  }
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
        <Stack.Screen name="WikiRace Start" component={HomeScreen} />
        <Stack.Screen name="WikiRace Go!" component={Race}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-evenly'
  },
  video: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
    flex: 1
  },
   web:{

     width:320,
      height:60 
   },
   button:{
     backgroundColor:'gray',
     margin:10,
     fontSize:20,
     color:'green'
     
   }
});