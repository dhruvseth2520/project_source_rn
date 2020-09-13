import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';


import { getThreads } from '../api/Messages'
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

import MessageListItem from '../components/MessageListItem'

const MessageListScreen = ({ navigation }) => {
    const userId = '64dhruv'
    const isFocused = useIsFocused()

    const [threads, setThreads] = useState(getThreads(userId))

    useEffect(() => {
        setThreads(getThreads(userId))
    }, [isFocused])


    const handleMessageItem = (thread, userId) => {
        const latestMessage = thread.MESSAGES[0]
        switch (thread.threadType) {
            case '1on1':
                const otherMemberDetail = thread.members.filter((member) => (userId != member._id))[0]
                return (
                    <MessageListItem
                        key={thread._id}
                        name={otherMemberDetail.name}
                        avatar={otherMemberDetail.avatar}
                        latestMessage={latestMessage.text}
                        createAtDate={latestMessage.createdAt}
                        read={thread.unreadBy.includes(userId)}
                        onPress={() => navigation.navigate('MessageRoom', {
                            threadName: otherMemberDetail.name,
                            threadId: thread._id
                        })}
                    />
                )
            default:
                return null
        }
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView>
                {threads.map((thread) => (handleMessageItem(thread, userId)))}
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