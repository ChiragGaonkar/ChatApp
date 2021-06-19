import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem ,} from 'react-native-elements';
import { db } from '../firebase';

const CustomListItem = ({id, chatName, enterChat}) => {
    const[chatMessages, setChatMessages]=useState([]);

    //UseEffect hooks executes every single time when application renders.
    //sometimes we want to update only when specific resource changes 
    //that time we may pass our second arg which is a array.
    //return is used to clean up the hook
    //First the content in return(old content) executes then from the hook
    useEffect(()=>{
        const unsubscribe = db
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
            setChatMessages(snapshot.docs.map((doc) => doc.data()))
        );
        return unsubscribe;
    });

    return (
        <ListItem onPress={()=>enterChat(id,chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL ||
                    "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'bold'}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
