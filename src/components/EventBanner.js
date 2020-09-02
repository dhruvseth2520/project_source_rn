import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const EventBanner = ({ title, onPress, venueName, image }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress} style={styles.eventBannerContainer}>
            <View style={styles.eventBannerImageContainer}>
                <Image style={styles.eventBannerImage} source={{ uri: image }} />
            </View>
            <View style={styles.eventTitle}>
                <Text style={styles.eventTitleText}>{title}</Text>
            </View>
            <View style={styles.eventVenueName}>
                <Text style={styles.eventVenueNameText}>{venueName}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}


export default EventBanner;

const styles = StyleSheet.create({
    eventBannerContainer: {
        flexGrow: 1,
        backgroundColor: 'white',
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        height: 200,
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
    eventBannerImageContainer: {
        flex: 8,
        alignItems: 'stretch'
    },
    eventBannerImage: {
        flex: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '100%'
    },
    eventTitle: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    eventTitleText :{
        color: "#562093"
    },
    eventVenueNameText: {
        color: "black"
    },
    eventVenueName: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 5
    }
})