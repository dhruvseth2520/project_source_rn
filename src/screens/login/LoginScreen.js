import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { storeData, removeData, getData } from '../../utils/localStorage';
import env from "../../utils/environment";
import { FAB } from 'react-native-paper';

import { authLogin } from '../../serverSDK/auth'
import { getPromoterDetails, getVenueDetails } from '../../serverSDK/api'


const LoginScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        // androidClientId: "649481912557-qem9m0m1sueat8p8jlp833dpdd8dr49s.apps.googleusercontent.com",
        iosClientId: "649481912557-qem9m0m1sueat8p8jlp833dpdd8dr49s.apps.googleusercontent.com",
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        return result.user;
      } else {
        return {
          cancelled: true
        };
      }
    } catch (e) {
      return {
        error: true
      };
    }
  }

  async function signInWithFacebookAsync() {
    Facebook.initializeAsync('667100777242989', 'Source')
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('667100777242989', {
      permissions: ['public_profile', 'user_friends'],
    });
    if (type === 'success') {
      const result = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      )
      return await result.json();
    } else {
      return {
        cancelled: true
      };
    }
  }

  // NOTE: JWTd (done)
  const handleLogin = async (callback, loginService) => {
    try {
      const callbackResponse = await callback()
      if (callbackResponse.cancelled) return

      const loginApiResponse = await authLogin(callbackResponse.id, loginService)

      var user = loginApiResponse.user;
      storeData('@accessToken', loginApiResponse.accessToken);

      if (!user.registered) navigation.navigate('VoP')

      setLoading(true);

      if (user.type === "Promoter") {
        const promoterDetailsResponse = await getPromoterDetails(
          loginApiResponse.accessToken
        )
        await storeData('@promoterFormData', promoterDetailsResponse)
        await removeData('@venueFormData')
        navigation.navigate('PromoterTab');
      }

      if (user.type === "Venue") {
        const venueDetailsResponse = await getVenueDetails(
          loginApiResponse.accessToken
        )
        await storeData('@venueFormData', venueDetailsResponse)
        await removeData('@promoterFormData')
        navigation.navigate('VenueTab');
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'dark-content'} />
      <ImageBackground
        source={require('../../assets/loginScreenBackground.jpg')}
        style={{ height: '100%', width: '100%' }}>
        {isLoading ? <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Welcome Back</Text>
        </View> : (
            <>
              <View style={styles.logoContainer}>
                <Image source={require('../../assets/Source_Logo_Final-06.png')} style={styles.logo} />
              </View>
              <View style={{ flex: 4, width: '100%', alignSelf: 'center' }}>
                <Text style={styles.slogan}>The new way</Text>
                <Text style={[styles.slogan, { top: -8 }]}>to promote.</Text>
                <View style={styles.buttonArea}>
                  <FAB
                    style={styles.loginButton}
                    icon="google"
                    label="Sign In with Google"
                    onPress={() => handleLogin(signInWithGoogleAsync, "Google")}
                    color="white"
                  />
                  <FAB
                    style={styles.loginButton}
                    icon="facebook"
                    label="Sign In with Facebook"
                    onPress={() => handleLogin(signInWithFacebookAsync, "Facebook")}
                    color="white"
                  />
                </View>
              </View>
            </>
          )}
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column'
  },
  slogan: {
    fontSize: 37,
    marginTop: 10,
    fontFamily: 'Avenir-Black',
    color: 'white',
    marginLeft: 65,
    width: '70%',
  },
  buttonArea: {
    justifyContent: 'flex-start',
    width: '70%',
    marginLeft: 65,
    height: 100,
    marginTop: 10
  },
  loginButton: {
    shadowOpacity: 0.1,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'transparent',
    marginTop: 20,
    marginBottom: 5
  },
  loadingText: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 36,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 20
  },
  logoContainer: {
    flex: 4,
    top: 140,
    alignSelf: 'center'
  },
  logo: {
    width: 260,
    height: 53
  }
});

export default LoginScreen;
