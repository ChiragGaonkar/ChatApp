//Using ES & React Native Snippets (rnfes)
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { Platform } from 'react-native';
// Input, Button, Image are taken from react-native-elements
// Passing props as {navigation} because LoginScreen is Present in App.js Navigation container
const LoginScreen = ({navigation}) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    //Second arg is onMount(empty array).
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser){
                navigation.replace('Home');
                //Navigating to the HomeScreen
            }
        });
        return unsubscribe;
    }, [])
    //Using Firebase for Logging In.

    const signIn = () => {
        // SignIn Function
        auth.signInWithEmailAndPassword(email,password)
        .catch((error) => alert(error.message));
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == 'ios'? "padding" : "height"} 
            style={styles.container}>
            <StatusBar style={'light'}/>
            {/* Makes StatusBar(Time,Range,Wifi,Battery Percentage) White */}
            <Image
                source={{
                    uri:'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'
                }}
                style={{width:200, height:200}}
            />
            {/* Putting Image in the app */}
            <View style={styles.inputContainer}>
                <Input 
                    placeholder={'Email'} 
                    autoFocus 
                    type={'email'} 
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <Input 
                    placeholder={'Password'} 
                    secureTextEntry 
                    type={'password'}
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            {/* Putting Input Fields */}
            <Button containerStyle={styles.button} onPress={signIn} title={'Log In'}/>
            <Button 
                onPress={() => {navigation.navigate("Register")}}
                // Changing from  LogInScreen to RegisterScreen
                containerStyle={styles.button} 
                type={'clear'} 
                title={'Register'}
            />
            {/* Putting Button */}
            {/* containerStyle is used because we are putting icons */}
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    inputContainer:{
        width: 300,
    },
    button:{
        width: 200,
        margin: 10,
    },
})
