import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { storeData, removeData } from '../../utils/localStorage';
import env from  "../../utils/environment";
import { FAB } from 'react-native-paper';


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
    } catch(e) {
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

  const handleLogin = (callback) => {
    callback().then(response => {
      if (!response.cancelled) {
        fetch(`${env.API_URL}/api/auth/user`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: response.id
          })
        }).then(response => response.json()).then(data => {
          if (!data.registered) {
            storeData('@userId', data.id).then(() => {
              navigation.navigate('VoP');
            });
          } else {
            setLoading(true);
            if (data.type === "Promoter") {
              fetch(`${env.API_URL}/api/promoter/${data.id}`)
              .then(response => response.json())
              .then(data => {
                  storeData('@promoterFormData', data).then(() => {
                    removeData('@venueFormData').then(() => {
                      navigation.navigate('PromoterTab');
                    });
                  });
              })
            } else if (data.type === "Venue") {
              fetch(`${env.API_URL}/api/venue/${data.id}`)
              .then(response => response.json())
              .then(data => {
                  storeData('@venueFormData', data).then(() => {
                    removeData('@promoterFormData').then(() => {
                      navigation.navigate('VenueTab');
                    })
                  });
              })
            }
          }
        })
      }
    });
  }

  return (
    <View style={styles.screen}>
          <StatusBar barStyle={'dark-content'} />
          <ImageBackground
            source={require('../../assets/loginScreenBackground.jpg')}
            style={{height: '100%', width: '100%'}}>
            {isLoading ? <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="white" />
              <Text style={styles.loadingText}>Welcome Back</Text>
            </View> : (
            <>
              <View style={{flex: 4}}>
                <Image source={require('../../assets/glowlight2.png')} style={styles.banner} />
              </View>
              <View style={{flex: 3, width: '88%', alignSelf:'center'}}>
                <Text style={styles.slogan}>The new way to promote</Text>
                <View style={styles.buttonArea}>
                    <FAB
                      style={styles.googleLoginButton}
                      icon="google"
                      label="Sign In with Google"
                      onPress={() => handleLogin(signInWithGoogleAsync)}
                      color="#DB4437"
                    />
                    <FAB
                      style={styles.facebookLoginButton}
                      icon="facebook"
                      label="Sign In with Facebook"
                      onPress={() => handleLogin(signInWithFacebookAsync)}
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
  banner: {
    width: '60%',
    height: '60%',
    alignSelf: 'center',
    marginTop: 20
  },
  slogan: {
    fontSize: 33,
    fontFamily: 'Trebuchet MS',
    fontWeight: '500',
    color: 'white',
    marginLeft: 25,
    alignSelf: 'center',
    width: '70%',
  },
  buttonArea: {
    justifyContent: 'flex-start',
    alignSelf: "center",
    height: 100,
    marginTop: 10
  },
  googleLoginButton: {
    backgroundColor: 'white',
    marginTop: 30
  },
  loadingText: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 36,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 20
  },
  facebookLoginButton: {
    backgroundColor: '#3b5998',
    borderColor: '#3b5998',
    marginTop: 20
  }
});

export default LoginScreen;
