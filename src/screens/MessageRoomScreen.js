import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { updateMessagesByThreadId, updateThreadById, getMessagesByThreadId, updateThreadAsRead } from '../api/Messages'
import { useIsFocused } from '@react-navigation/native'

const MessageRoomScreen = ({ route }) => {
    const userId = '64dhruv'
    const threadId = route.params.threadId
    const isFocused = useIsFocused()

    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages(getMessagesByThreadId(threadId))
        updateThreadAsRead(userId, threadId)
    }, [isFocused])

    const onSend = useCallback((newMessage = []) => {
        setMessages(previousMessages => {
            const newMessages = GiftedChat.append(previousMessages, newMessage)
            updateMessagesByThreadId(threadId, newMessages)
            return newMessages
        })
    }, [])


    return (
        <GiftedChat
            messages={messages}
            onSend={newMessage => onSend(newMessage)}
            user={{ _id: userId }}
        />
    );
}

export default MessageRoomScreen;