import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import {
  PulseIndicator,
  DotIndicator,
  MaterialIndicator,
} from 'react-native-indicators';
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { storeData, removeData, getData } from '../../utils/localStorage';
import env from "../../utils/environment";
import { FAB } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { authLogin } from '../../serverSDK/auth'
import { getPromoterDetails, getVenueDetails } from '../../serverSDK/api'


/*

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



*/

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
      {isLoading ? <View style={{ alignItems: 'center', flex: 1 }}>
        <PulseIndicator size={36} color="#1AB0A8" />
      </View> : (
        <>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../../assets/Source_Logo_Final-03.png')} />
              <Text style={styles.logoCaption}>The new way to promote</Text>
            </View>

            <View style={styles.buttonContainer}>
              <FAB
                style={[styles.loginButton, {marginTop: 25, backgroundColor: 'white'}]}
                icon="google"
                label="Continue with Google"
                onPress={() => handleLogin(signInWithGoogleAsync, "Google")}
                color="#DB4437"
              />
              <FAB
                style={[styles.loginButton, {backgroundColor: '#3b5998', marginTop: 25}]}
                icon="facebook"
                label="Continue with Facebook"
                onPress={() => handleLogin(signInWithFacebookAsync, "Facebook")}
                color="white"
              />
            </View>


          <View style={styles.imageContainer}>
            <Image style={styles.heroImage} source={require('../../assets/partyImage.png')} />
          </View>
        </>
      )}

    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  loadingText: {
    color: '#1AB0A8',
    fontFamily: 'Avenir',
    fontSize: 36,
    fontWeight: '600',
    alignSelf: 'center'
  },
  logoContainer: {
    flex: 3,
    alignItems: 'center'
  },
  logo: {
    marginTop: 120,
    height: 50,
    width: 240
  },
  logoCaption: {
    fontFamily: 'Gill Sans',
    fontSize: 16,
    top: 20,
    fontWeight: '300'
  },
  imageContainer: {
    flex: 4
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center'
  },
  heroImage: {
    width: 'auto',
    marginTop: 45,
    height: '93%'
  },
  loginButton: {
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '78%',
    paddingHorizontal: 30,
    paddingVertical: 5
  },
  loginBtnText: {
    fontFamily: 'Avenir',
    fontSize: 15,
    top: 6,
    marginLeft: 10
  },
  loginLogo: {
    height: 30,
    width: 30
  },

});

export default LoginScreen;
