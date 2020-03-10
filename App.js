import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, processColor, TouchableHighlight} from 'react-native';
 
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {WebView} from 'react-native-webview';

import {Race} from './Race'


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
  function nav(){
    
  }
  return (<View style={styles.container}>
    <LinkGetter navigation={{navigation}}/>
  <MyWeb/>
  </View>)
}

class LinkGetter extends Component{
  constructor(props){
    super(props);
    console.log(props.navigation)
    this.state={
      start:'<<-- Press to set the current wiki page as this!', 
      end:'<<-- Press to set the current wiki page as this!',
      nav:props.navigation}
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
        console.log('help!!')
        console.log(this.state.nav)
        this.state.nav.navigation.navigate('WikiRace Go!')
      }
    }>
        <Text style={styles.next}>Start the race!</Text>
      </TouchableHighlight>
    </View>
      

  </View>
    )
  }
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
     backgroundColor:'white',
     margin:10,
     fontSize:20,
     color:'green',
     padding:5
     
   },
   next:{
     backgroundColor:'white',
     margin:10,
     padding:5,
     fontSize:15,
     textAlign:'center',
     color:'blue'
   }
});