import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const EventBanner = ({ title, onPress, venueName }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress} style={styles.eventBannerContainer}>
            <View style={styles.eventBannerImageContainer}>
                <Image style={styles.eventBannerImage} source={{ uri: "https://us.123rf.com/450wm/anton345/anton3451611/anton345161100032/68970620-happy-hour-new-vintage-headline-sign-design-with-a-banner-ribbon-for-text-vector-graphic-.jpg?ver=6" }} />
            </View>
            <View style={styles.eventTitle}>
                <Text>{title}</Text>
            </View>
            <View style={styles.eventVenueName}>
                <Text>{venueName}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}


export default EventBanner;

const styles = StyleSheet.create({
    eventBannerContainer: {
        flexGrow: 1,
        backgroundColor: '#e3e3e3',
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        height: 200,
        alignSelf: 'stretch'
    },
    eventBannerImageContainer: {
        flex: 8,
        alignItems: 'stretch'
    },
    eventBannerImage: {
        flex: 1,
        borderRadius: 5,
        width: '100%'
    },
    eventTitle: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 5
    },
    eventVenueName: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 5
    }
})