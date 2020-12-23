import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import TimeAgo from 'react-native-timeago';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MessageListItem = ({ name, avatar, latestMessage, createAtDate, read, onPress }) => {

    const truncatelatestMessage = (str, n) => (
        (str.length > n) ? str.substr(0, n - 1) + '... ' : str + ' '
    )

    return (
        <TouchableOpacity onPress={onPress} style={styles.rootContainer}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ uri: avatar }} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.nameContainer}>
                    <Text style={[
                        styles.nameText,
                        read ? null :
                            { fontWeight: 'bold' }
                    ]}>{name}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.latestMessageContainer}>
                        <Text style={[
                            styles.latestMessageText,
                            read ? null :
                                { fontWeight: 'bold' }
                        ]}>{truncatelatestMessage(latestMessage, 24)}</Text>
                    </View>
                    <View style={styles.createAtContainer}>
                        <TimeAgo style={styles.createAtText} time={createAtDate} />
                    </View>
                </View>
            </View>
            <View style={styles.statusContainer}>
                <View style={read ? null : styles.statusItem}></View>
            </View>
        </TouchableOpacity>
    );
}

export default MessageListItem;

const styles = StyleSheet.create({
    rootContainer: {
        height: 70,
        flexDirection: 'row',
    },
    avatarContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 60,
        height: 60,
        resizeMode: "cover",
        borderRadius: 200
    },
    contentContainer: {
        flex: 6,
        flexDirection: 'column'
    },
    nameContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    nameText: {
        fontSize: 17
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    latestMessageContainer: {
    },
    latestMessageText: {},
    createAtContainer: {
        flex: 1
    },
    createAtText: {
        color: '#636363'
    },
    statusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusItem: {
        height: 10,
        width: 10,
        backgroundColor: '#4f8aff',
        borderRadius: 200
    }
})
