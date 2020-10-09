import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { FAB } from 'react-native-paper';

const LoginVenueOrPromoterScreen = ({ navigation, route }) => {
    const handlePromoter = () => {
        navigation.navigate('PromoterInfo');
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
                <View style={styles.heroImage}>
                  <Image style={styles.image} source={{uri: 'https://www.arystonwebsolution.com/assets/images/Digital/banner.png'}}/>
                </View>

                <View style={styles.buttonArea}>
                    <Text style={styles.captionText}>Are you a</Text>
                    <View style={styles.buttonContainer}>
                      <FAB
                          style={styles.fab}
                          color="white"
                          label="Promoter"
                          icon="account"
                          onPress={handlePromoter}
                        />
                    </View>
                    <Text style={styles.captionText}>or a</Text>
                    <View style={styles.buttonContainer}>
                        <FAB
                            style={styles.fab}
                            color="white"
                            label="Venue"
                            icon="map-marker"
                            onPress={handleVenue}
                          />
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
    fab: {
      right: 0,
      bottom: 0,
      width: 250,
      marginLeft: 40,
      backgroundColor: '#19C4C0'
    },
    heroImage: {
      top: 180,
      marginLeft: 30,
      padding: 15,

    },
    image: {
      width: '100%',
      height: 270,
      left: 0,
      position: 'absolute',
      opacity: 0.9

    },
    buttonArea: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: "center",
      marginTop: 500
    },
    buttonContainer: {
      width: '80%',
      height: 50,
      margin: 10,
    },
    captionText: {
      marginBottom: 5,
      marginTop: 5,
      fontFamily: 'Avenir',
      fontSize: 15,
      fontWeight: '300'
    }
});
