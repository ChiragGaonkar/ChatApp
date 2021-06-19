import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth, db } from '../firebase';

const AddChatScreen = ({navigation}) => {
    const[input,setInput] = useState("");

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Add New Chat',
        });
    },[navigation]);

    const createChat = async () => {
        await db
        .collection("chats")
        .add({
            chatName: input,
        })
        .then(() => {
            navigation.goBack();
        })
        .catch((error)=>{
            alert(error)
        });
    };

    // using dataBase to store Chat Name 
    // Go to db collection 
    // add the chat name 
    // then navigate back to home 
    // if error then catch and display

    return (
        <View style={styles.container}>
            <Input 
                placeholder={'Enter Chat Name'} 
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                    <Icon 
                        name='wechat' 
                        type={'antdesign'} 
                        size={24} 
                        color={'black'}
                        style={{marginRight:20}}
                    />
                }
                onSubmitEditing={createChat}
            />
            <Button disabled={!input} onPress={createChat} title={'Create Chat'}/>
        </View>
    );
};

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        padding: 20,
        backgroundColor: 'white',
        height: '100%',
    },
})
