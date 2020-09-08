import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';


const MessageListItem = ({ name, image, lastMessage, timeStamp, read }) => {

    const truncateLastMessage = (str, n) => (
        (str.length > n) ? str.substr(0, n - 1) + '... ' : str + ' '
    )

    return (
        <View style={styles.rootContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.profileImage} source={{ uri: image }} />
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
                    <View style={styles.lastMessageContainer}>
                        <Text style={[
                            styles.lastMessageText,
                            read ? null :
                                { fontWeight: 'bold' }
                        ]}>{truncateLastMessage(lastMessage, 24)}</Text>
                    </View>
                    <View style={styles.timeStampContainer}>
                        <Text style={styles.timeStampText}>{timeStamp}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.statusContainer}>
                <View style={read ? null : styles.statusItem}></View>
            </View>
        </View>
    );
}

export default MessageListItem;

const styles = StyleSheet.create({
    rootContainer: {
        height: 70,
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
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
    lastMessageContainer: {
    },
    lastMessageText: {},
    timeStampContainer: {
        flex: 1
    },
    timeStampText: {
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