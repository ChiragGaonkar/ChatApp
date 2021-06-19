import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { Platform } from 'react-native';
import { StyleSheet, View } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {Button, Input, Text, colors} from 'react-native-elements';
import { auth } from '../firebase';

// Passing props as {navigation} because LoginScreen is Present in App.js Navigation container
const RegisterScreen = ({navigation}) => {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle:{backgroundColor:'dodgerblue'},
            headerBackTitle:"Back"
        });
    },[navigation]); 
    // we can use useLayoutEffect to change the header of any screen

    const register = () =>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(authUser =>{
            authUser.user.updateProfile({
                displayName : name,
                photoURL : imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
        })
        .catch(error=> alert(error.message));
    }
    //using firebase to register and authenticate
    //First we will createUserWithEmailAndPassword
    //it will return some value which will be used by then
    //if error catch block will catch the error and alert

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios"? 'padding' : 'height'} 
            style={styles.container}>
            <StatusBar style={'light'}/>
            <Text h4 style={{marginBottom:50}}>Create ChatApp Account</Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder={'Name'}
                    autoFocus
                    type={'text'}
                    value={name}
                    onChangeText={(text)=>setName(text)}
                />
                <Input
                    placeholder={'Email'}
                    type={'email'}
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <Input
                    placeholder={'Password'}
                    type={'password'}
                    value={password}
                    secureTextEntry
                    onChangeText={(text)=>setPassword(text)}
                />
                <Input
                    placeholder={'Profile Photo (Optional)'}
                    type={'text'}
                    value={imageUrl}
                    onChangeText={(text)=>setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button 
                buttonStyle={{backgroundColor: "dodgerblue"}}
                // To change the color of button from react native elements.           
                containerStyle={styles.button}
                raised 
                onPress={register} 
                title={'Register'}
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer:{
        width: 300,
    },
    button:{
        width: 200,
    },
})
