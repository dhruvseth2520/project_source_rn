import { Text, View, StyleSheet, Image, ImageBackground, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';
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
            <ImageBackground source={require('../../assets/tealgradient.png')} style={{height: '100%'}}>
                <SafeAreaView style={styles.safeArea}>
                    <Image source={require('../../assets/vopimage.png')} style={styles.image} />
                    <View style={styles.buttonArea}>
                        <Text style={styles.captionText}>Are you a</Text>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity style={styles.loginButton} onPress={handlePromoter}>
                            <FontAwesome5 style={[styles.btnIcon, {marginLeft: 30}]} name="user" />
                            <Text style={styles.btnText}>Promoter</Text>
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.captionText}>or a</Text>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity style={styles.loginButton} onPress={handleVenue}>
                            <FontAwesome5 style={[styles.btnIcon, {marginLeft: 40}]} name="map-marker-alt" />
                            <Text style={styles.btnText}>Venue</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
          </ImageBackground>

        </View>
    );
};

export default LoginVenueOrPromoterScreen;

const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    header: {
      width: '100%',
      height: 200,
      top: -50
    },
    image: {
      width: 380,
      position: 'absolute',
      height: 320,
      top: 140,
      left: 13
    },
    safeArea: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: 'stretch',
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
      margin: 10
    },
    captionText: {
      marginBottom: 5,
      marginTop: 5,
      fontFamily: 'Avenir',
      fontSize: 15,
      fontWeight: '500',
      color: '#323232'
    },
    loginButton: {
      flexDirection: 'row',
      width: 190,
      borderRadius: 30,
      borderColor: '#323232',
      borderWidth: 1,
      height: 50,
      marginLeft: 75
    },
    btnIcon: {
      top: 14,
      fontSize: 18,
      left: 18,
      color: '#323232'
    },
    btnText: {
      top: 15,
      fontSize: 15,
      left: 30,
      fontFamily: 'Avenir',
      color: '#323232'
    }
});
