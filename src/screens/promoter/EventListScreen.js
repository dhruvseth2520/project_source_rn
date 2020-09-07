import React from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView, Text } from 'react-native';
import EventBanner from '../../components/EventBanner'
import { getEvents } from '../../api/Events'

const PromoterEventListScreen = ({ navigation }) => {
    const tempEventsList = getEvents()

    return (
        <View style={styles.screen}>
            <StatusBar barStyle={'dark-content'} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <Text style={styles.listTitle}> Upcoming Events </Text>
                    {
                        tempEventsList.map((event) => (
                            <EventBanner
                                key={event.event_id}
                                title={event.title}
                                onPress={() => navigation.navigate('PromoterEventDetail', {
                                    event_id: event.event_id,
                                    title: event.title,
                                    venueName: event.venueName,
                                    image: event.image
                                })}
                                venueName={event.venueName}
                                image={event.image} />
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default PromoterEventListScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: "#fff",
    },
    safeArea: {
        flex: 1
    },
    listTitle: {
        margin: 5,
        marginTop: 10,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
})

