import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';

const PromoterProfileScreen = () => {
    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.profileContainer}>
                <View style={styles.proileImageContainer}>
                    <Image style={styles.profileImage} source={{ uri: "https://pbs.twimg.com/media/EelyvfWXkAA3GjQ?format=jpg&name=medium" }} />
                </View>
                <Text style={styles.profileName}> Jonthan Swan</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text>Promoter Details</Text>
            </View>
        </SafeAreaView>
    );
}

export default PromoterProfileScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    profileContainer: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 5,
        // ios shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        // android shadow
        elevation: 2,
    },
    proileImageContainer: {
        margin: 10,
        marginLeft: 20
    },
    profileImage: {
        width: 70,
        height: 70,
        resizeMode: "contain",
        borderRadius: 200
    },
    profileName: {
        flex: 1,
        fontSize: 20,
    },
    detailContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    }
})