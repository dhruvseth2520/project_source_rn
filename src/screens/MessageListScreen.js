import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';


import { getMessagesList } from '../api/Messages'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import MessageListItem from '../components/MessageListItem'

const MessageListScreen = ({ navigation }) => {
    const [threads, setThreads] = useState([])
    const [messageList, setMessageList] = useState(getMessagesList())

    const handleMessagePress = (message_id) => {
        navigation.navigate('MessageRoom', {message_id: message_id})
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView>
                {
                    messageList.map((message) => (
                        <TouchableOpacity key={message.id} onPress={() => handleMessagePress(message.id)}>
                            <MessageListItem
                                name={message.name}
                                image={message.image}
                                lastMessage={message.lastMessage}
                                timeStamp={message.timeStamp}
                                read={message.read}
                            />
                        </TouchableOpacity>
                    )
                    )
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default MessageListScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
})