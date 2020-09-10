import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';


import { getThreads } from '../api/Messages'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import MessageListItem from '../components/MessageListItem'

const MessageListScreen = ({ navigation }) => {
    const userId = '64dhruv'

    const [threads, setThreads] = useState(getThreads(userId))


    const handleMessagePress = (message_id) => {
        navigation.navigate('MessageRoom', { message_id: message_id })
    }

    const handleMessageItem = (thread, userId) => {
        const latestMessage = thread.MESSAGES[0]
        switch (thread.threadType) {
            case '1on1':
                const otherMemberDetail = thread.members.filter((member) => (userId != member._id))
                return (
                    <MessageListItem
                        name={otherMemberDetail[0].name}
                        avatar={otherMemberDetail[0].avatar}
                        latestMessage={latestMessage.text}
                        createAtDate={latestMessage.createdAt}
                        read={(userId in thread.unreadBy) ? true : false }
                    />
                )
            default:
                return null
        }
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView>
                {
                    threads.map((thread) => (
                        <TouchableOpacity key={thread._id} onPress={() => handleMessagePress(thread._id)}>
                            {handleMessageItem(thread, userId)}
                        </TouchableOpacity>
                    ))
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