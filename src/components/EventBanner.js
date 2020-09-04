import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const EventBanner = ({ title, onPress, venueName, image }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress} style={styles.rootContainer}>
            <View style={styles.bannerImageContainer}>
                <Image style={styles.bannerImage} source={{ uri: image }} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.textContentContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.venueName}>{venueName}</Text>
                </View>
                <View style={styles.iconContentContainer}>
                    <TouchableOpacity onPress={() => null} style={[styles.circularBtn, { backgroundColor: '#4F4F4F' }]}>
                        <Ionicons style={styles.btnIcon} name="ios-chatbubbles"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => null} style={[styles.circularBtn, { backgroundColor: '#ebe80e' }]}>
                        <Ionicons style={styles.btnIcon} name="ios-star"></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}


export default EventBanner;

const styles = StyleSheet.create({
    rootContainer: {
        flexGrow: 1,
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        height: 180,
        alignSelf: 'stretch',
        // ios shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        // android shadow
        elevation: 2,
    },
    bannerImageContainer: {
        flex: 5,
        alignItems: 'stretch'
    },
    bannerImage: {
        flex: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '100%'
    },
    contentContainer: {
        flex: 2,
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    textContentContainer: {
        flex: 4
    },
    title: {
        flex: 1.5,
        fontWeight: 'bold',
        marginHorizontal: 5,
        marginVertical: 5,
        fontSize: 16,
        color: "#562093"
    },
    venueName: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 5,
        fontSize: 12,
        color: "black"
    },
    iconContentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
        alignItems: 'center',
        marginRight: 10
    },
    circularBtn: {
        borderRadius: 20,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnIcon: {
        fontSize: 20,
        color: 'white',
    }

})