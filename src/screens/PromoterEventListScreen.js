import React from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import EventBanner from '../components/EventBanner'

const PromoterEventListScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <StatusBar barStyle={'dark-content'} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <EventBanner title="20% off" onPress={() => navigation.navigate('PromoterInbox')} venueName="Harry's"/>
                    <EventBanner title="40% off" onPress={() => navigation.navigate('PromoterInbox')} venueName="Harry's"/>
                    <EventBanner title="40% off" onPress={() => navigation.navigate('PromoterInbox')} venueName="Harry's"/>
                    <EventBanner title="40% off" onPress={() => navigation.navigate('PromoterInbox')} venueName="Harry's"/>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default PromoterEventListScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    safeArea: {
        flex: 1
    }
})
