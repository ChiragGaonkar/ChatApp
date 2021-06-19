import React, { useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase';

// route can be used to get the parameters from other screens

const ChatScreen = ({navigation, route}) => {
    const[input,setInput] = useState('');
    const[messages, setMessages] = useState([]);

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })
        setInput('');
    };

    // now we will set up listeners
    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ));
        return unsubscribe;
    }, [route]);


    //for header modification.
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'MyChats',
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            headerTitle:()=>(
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Avatar 
                    rounded 
                    source={{
                        uri: messages[0]?.data.photoURL ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                    }}
                    />
                    <Text 
                        style={{
                            fontWeight:'700', 
                            color:'white', 
                            fontSize:20,
                            marginLeft:10,
                        }}>{route.params.chatName}</Text>

                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity 
                    style={{marginLeft:10}}
                    onPress={navigation.goBack}
                >
                    <AntDesign name={'arrowleft'} size={24} color={'white'}/>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    justifyContent:'space-between',
                    width: 80,
                    marginRight:20,
                }}>
                    <TouchableOpacity>
                        <Ionicons name={'videocam'} size={24} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name='phone' size={24} color={'white'}/>
                    </TouchableOpacity>
                </View>
            ),
        });
    },[navigation,messages]);

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'aliceblue'}}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios'? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                    <ScrollView contentContainerStyle={{paddingTop:15}}>
                        {/* we will put the chats here */}
                        {messages.map(({id,data})=> 
                            data.email === auth.currentUser.email? (
                                <View key={id} style={styles.reciever}>
                                    <Avatar
                                        rounded
                                        position={'absolute'}
                                        bottom={-15}
                                        right={-5}
                                        size={30}
                                        //For Web
                                        containerStyle={{
                                            position:'absolute',
                                            bottom:-15,
                                            right:-5,
                                        }}
                                        source={{
                                            uri:data.photoURL,
                                        }}
                                    />
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar
                                         rounded
                                         position={'absolute'}
                                         bottom={-15}
                                         right={-5}
                                         size={30}
                                         //For Web
                                         containerStyle={{
                                             position:'absolute',
                                             bottom:-15,
                                             right:-5,
                                         }}
                                         source={{
                                             uri:data.photoURL,
                                         }}
                                    />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        )}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            placeholder={'Type a message'} 
                            style={styles.textInput}
                            value={input}
                            onSubmitEditing={sendMessage}
                            onChangeText={(text) => setInput(text)}
                        />
                        <TouchableOpacity 
                            onPress={sendMessage}
                            activeOpacity={0.5}>
                            <Ionicons name={'send'} size={24} color={'dodgerblue'} />
                        </TouchableOpacity>
                    </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        alignItems: 'center',
        width:"100%",
        padding: 15,
    },
    container:{
        flex:1,
    },
    textInput:{
        bottom: 0,
        flex: 1,
        height: 40,
        marginRight: 15,
        borderColor: 'transparent',
        backgroundColor: '#ECECEC',
        borderRadius: 30,
        padding:10,
        borderWidth: 1,
    },
    reciever:{
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    sender:{
        padding: 15,
        backgroundColor: 'dodgerblue',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    recieverText:{
        color: 'black',
        marginLeft: 10,
        marginBottom: 15,
    },
    senderText:{
        color: 'white',
        marginRight: 10,
        marginBottom: 15,
    },
    senderName:{
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        marginLeft:15,
        color:'white',
    },
})
