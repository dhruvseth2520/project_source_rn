import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const PromoterHome = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <StatusBar barStyle={'dark-content'} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <EventBanner title="20% off" onPress={() => navigation.navigate('PromoterRegister')} venueName="Harry's"/>
                    <EventBanner title="40% off" onPress={() => navigation.navigate('PromoterRegister')} venueName="Harry's"/>
                    <EventBanner title="40% off" onPress={() => navigation.navigate('PromoterRegister')} venueName="Harry's"/>
                    <EventBanner title="40% off" onPress={() => navigation.navigate('PromoterRegister')} venueName="Harry's"/>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default PromoterHome;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    safeArea: {
        flex: 1
    },
    // EventBanner
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
