import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

import { getMessagesList } from '../api/Messages'
import { ScrollView } from 'react-native-gesture-handler';

import MessageListItem from '../components/MessageListItem'

const MessageListScreen = () => {
    const messageList = getMessagesList()

    return (
        <SafeAreaView style={styles.rootContainer}>
            <ScrollView>
                {
                    messageList.map((message) => (
                        <MessageListItem
                            key={message.id}
                            name={message.name}
                            image={message.image}
                            lastMessage={message.lastMessage}
                            timeStamp={message.timeStamp}
                            read={message.read}
                        />
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