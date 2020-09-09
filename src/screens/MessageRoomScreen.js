import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { getThreads } from '../api/Messages'

const MessageRoomScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => (
        setMessages(getThreads()[0]['MESSAGES'])
    ), [])

    function handleSend(newMessage = []) {
        setMessages(GiftedChat.append(messages, newMessage));
    }
    return (
        <GiftedChat
            messages={messages}
            onSend={newMessage => handleSend(newMessage)}
            user={{ _id: '64dhruv' }}
        />
    );
}

export default MessageRoomScreen;