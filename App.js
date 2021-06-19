import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';


// we have to download some dependencies from
// https://reactnavigation.org/docs/getting-started/
// https://reactnativeelements.com/docs/
// https://docs.expo.io/guides/using-firebase/

//This 2 lines of code ignores the set timer warning.
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Setting a timer for a long period of time'])
//or
// To fix this issue...
// Navigate to your node_modules/react-native/Libraries/Core/Timers/JSTimers.js file.
// Look for the variable MAX_TIMER_DURATION_MS
// Change its value to 10000 * 1000
// Save the changes (with auto format turned off) and re-build your app.

const Stack = createStackNavigator();
// Stack will hold all the screens

const globalScreenOptions={
  headerStyle:{backgroundColor:'#2196F3'},
  headerTitleStyle:{color:'white'},
  headerTintColor: 'white',
}

// initialRouteName={'Home'} in Stack.Navigator in can be used while developing 
// so that u wont come across log in page again and again.

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName={'Login'}>
        {/* Adding Screen */}
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name="AddChat" component={AddChatScreen}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
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
