import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const PromoterEventScreen = ({ navigation, route }) => {
    return (
        <View style={styles.rootContainer}>
            <Text>{route.params.title}</Text>
            <Text>{route.params.venueName}</Text>
            <Text>{route.params.event_id}</Text>
        </View>
    );
}

export default PromoterEventScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})