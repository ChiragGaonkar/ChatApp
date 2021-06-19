import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import {useLayoutEffect} from 'react'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { TouchableOpacity } from 'react-native'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

    const[chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(()=>navigation.replace('Login'));
    }

    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot(snapshot=>(
            setChats(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            })))
        ));
        return unsubscribe;
    },[]);

    // moving in db collection 
    // taking a snapshot of db
    // putting the values like id and data from db to chats using setChats
    // return unsubscribe

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'ChatApp', 
            headerStyle: {backgroundColor:'white'},
            headerTitleStyle: {color: 'black'},
            headerTintColor: 'black',
            headerLeft:() => (
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity onPress={signOutUser}>
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight:() =>(
                <View style={styles.icons}>
                    {/* while using icons dont forget to style it.
                    otherwise it wont be visible */}
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name={'camerao'} size={24} color={'black'}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        onPress={()=>navigation.navigate("AddChat")} >
                        <SimpleLineIcons name={'pencil'} size={24} color={'black'} />
                    </TouchableOpacity>
                </View>
            ),
        });
    },[]); 

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat',{
            id: id,
            chatName: chatName,
        });
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id,data:{chatName}})=>(
                    <CustomListItem 
                    key={id} 
                    id={id} 
                    chatName={chatName} 
                    enterChat={enterChat}     
                    />
                ))}
                {/* CustomListItem is a file which is passed in a HomeScreen as a component*/}
                {/* we should always pass key for better rendering of list */}
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    icons:{
        flexDirection:'row',
        justifyContent: 'space-between',
        width: 80,
        marginRight: 20,
    },
    container:{
        height: '100%',
    }
})
