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
              source={{uri: 'https://all-images.net/wp-content/uploads/2020/03/Iphone-wallpaper-minimalist-162.jpg'}}
              style={{width: '100%', height: '100%'}}
            >
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.title}>Source</Text>

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
      alignItems: 'stretch'
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
      width: 250,
      marginLeft: 40,
      backgroundColor: 'white'
    },
    heroImage: {
      top: 200,
      marginLeft: 30,
      padding: 15,
    },
    image: {
      width: '100%',
      height: 200,
      left: 0,
      position: 'absolute',
      opacity: 0.9
    },
    buttonArea: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: "center",
      marginTop: 450
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
      fontWeight: '400',
      color: 'white'
    }
});
