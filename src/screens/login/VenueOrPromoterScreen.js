import { Text, View, StyleSheet, Image, ImageBackground, SafeAreaView, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';

const LoginVenueOrPromoterScreen = ({ navigation, route }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={styles.screen}>
            <ImageBackground source={require('../../assets/tealgradient.png')} style={{height: '100%'}}>
                <View style={styles.safeArea}>
                    <View style={styles.imageContainer}>
                      <Image source={require('../../assets/vopimage.png')} style={{width: 0.9 * windowWidth, height: 0.36 * windowHeight}} />
                    </View>
                    <View style={styles.buttonArea}>
                        <Text style={styles.captionText}>Are you a</Text>
                        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PromoterInfo')}>
                          <FontAwesome5 style={[styles.btnIcon, {marginLeft: 30}]} name="user" />
                          <Text style={styles.btnText}>Promoter</Text>
                        </TouchableOpacity>

                        <Text style={styles.captionText}>or a</Text>
                        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('VenueInfo')}>
                          <FontAwesome5 style={[styles.btnIcon, {marginLeft: 40}]} name="map-marker-alt" />
                          <Text style={styles.btnText}>Venue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          </ImageBackground>

        </View>
    );
};

export default LoginVenueOrPromoterScreen;

const styles = StyleSheet.create({
    safeArea: {
      flexDirection: 'column',
      flex: 1
    },
    imageContainer: {
      flex: 1,
      marginTop: 80,
      alignItems: "center"
    },
    buttonArea: {
      flex: 1,
      alignItems: "center",
      marginTop: 70
    },
    captionText: {
      fontFamily: 'Avenir',
      fontSize: 15,
      fontWeight: '500',
      color: '#323232'
    },
    loginButton: {
      flexDirection: 'row',
      width: 200,
      borderRadius: 30,
      borderColor: '#323232',
      borderWidth: 1,
      height: 50,
      marginVertical: 18
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
