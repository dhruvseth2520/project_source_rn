import { Text, View, StyleSheet, Image, ImageBackground, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
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
            <ImageBackground
              style={{height: '100%'}}
              source={{uri: 'https://cdn.shopify.com/s/files/1/0157/9972/files/EmilyLey_TurquoiseGradient_1280x2272.png?v=1572549679'}}>
            <SafeAreaView style={styles.safeArea}>
                <Image source={require('../../assets/socialMedia.png')} style={{width: 360, height: 290, position: 'absolute', top: 140, left: 10}} />
                <View style={styles.buttonArea}>
                    <Text style={styles.captionText}>Are you a</Text>
                    <View style={styles.buttonContainer}>
                      <FAB
                          style={styles.fab}
                          color="#1AA2B0"
                          label="Promoter"
                          icon="account"
                          onPress={handlePromoter}
                        />
                    </View>
                    <Text style={styles.captionText}>or a</Text>
                    <View style={styles.buttonContainer}>
                        <FAB
                            style={styles.fab}
                            color="#1AA2B0"
                            label="Venue"
                            icon="map-marker"
                            onPress={handleVenue}
                          />
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
    safeArea: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: 'stretch',
    },
    title: {
      fontSize: 48,
      fontFamily: 'Trebuchet MS',
      fontWeight: '600',
      color: 'white',
      alignSelf: 'center',
      top: 70,
    },
    fab: {
      right: 0,
      bottom: 0,
      width: 240,
      marginLeft: 48,
      backgroundColor: 'white'
    },
    heroImage: {
      top: 200,
      marginLeft: 30,
      padding: 15,
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
      fontWeight: '600',
      color: 'white'
    }
});
