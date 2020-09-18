import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import React from "react";

const LoginVenueOrPromoterScreen = ({ navigation }) => {
    const handlePromoter = () => {
        navigation.navigate('PromoterInfo')
    }

    const handleVenue = () => {
        navigation.navigate('VenueInfo');
    }

    const handleBack = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.screen}>
            <StatusBar barStyle={'dark-content'} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.heroText}>
                  <Text style={styles.title}>Welcome to Source</Text>
                  <Text style={styles.info}>The new way to promote</Text>
                </View>


                <View style={styles.buttonArea}>
                    <Text style={styles.captionText}>Are you a</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.defaultButton} onPress={handlePromoter}>
                            <Text style={styles.buttonText}>Promoter</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.captionText}>or a</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.defaultButton} onPress={handleVenue}>
                            <Text style={styles.buttonText}>Venue</Text>
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
    heroText: {
      marginTop: 50,
      marginLeft: 30,
      padding: 15,
    },
    title: {
      color: '#1EC5D6',
      fontSize: 60,
      fontFamily: 'Arial Rounded MT Bold'
    },
    info: {
      fontFamily: 'Avenir',
      marginTop: 10,
      fontSize: 16,
      fontWeight: '300'
    },
    buttonArea: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: "center",
      marginTop: 300
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
        borderRadius: 5,
        borderColor: '#1AA2B0',
        backgroundColor: '#1AA2B0',
        borderWidth: 0.3
    },
    buttonText: {
        flex: 6,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 16
    },
    captionText: {
      marginBottom: 5,
      marginTop: 5,
      fontFamily: 'Avenir',
      fontSize: 15,
      fontWeight: '300'
    }
});
