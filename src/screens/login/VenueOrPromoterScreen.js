import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import React from "react";

const LoginVenueOrPromoterScreen = ({ navigation }) => {
    const handlePromoter = () => {
        navigation.navigate('PromoterRegister')
    }

    const handleVennue = () => {
        navigation.navigate('VenueRegister');
    }

    const handleBack = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.screen}>
            <StatusBar barStyle={'dark-content'} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.imageArea}>
                    <Image style={styles.profileImage} source={{ uri: "https://pbs.twimg.com/media/EelyvfWXkAA3GjQ?format=jpg&name=medium" }} />
                </View>
                <View style={styles.profileInfo} >
                    <Text style={styles.infoText} >Jonthan Swan</Text>
                    <Text style={styles.infoText}>jonthan.swan@gmail.com</Text>
                </View>
                <View style={styles.buttonArea}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.defaultButton} onPress={handlePromoter}>
                            <Text style={styles.buttonText}>Promoter</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.defaultButton} onPress={handleVennue}>
                            <Text style={styles.buttonText}>Venue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.defaultButton, {borderWidth: 0}]} onPress={handleBack}>
                            <Text style={[styles.buttonText, {color: 'blue'}]}>Not you?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default LoginVenueOrPromoterScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    safeArea: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    imageArea: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    profileImage: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        borderRadius: 200
    },
    profileInfo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    infoText: {
        margin: 3
    },
    buttonArea: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    buttonContainer: {
        width: '80%',
        height: 50,
        margin: 10,
    },
    defaultButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 2,
        borderColor: 'black',
        borderWidth: 0.3
    },
    buttonText: {
        flex: 6,
        color: 'grey',
        textAlign: 'center'
    }
});
