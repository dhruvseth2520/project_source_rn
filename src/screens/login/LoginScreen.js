import { Text, View, StyleSheet, Image, ImageBackground, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { storeData } from '../../utils/localStorage';
import env from  "../../utils/environment";
import { FAB } from 'react-native-paper';


const LoginScreen = ({ navigation }) => {
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
      permissions: ['public_profile'],
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
            if (data.type === "Promoter") {
              fetch(`${env.API_URL}/api/promoter/${data.id}`)
              .then(response => response.json())
              .then(data => {
                  storeData('@promoterFormData', data).then(() => {
                    navigation.navigate('PromoterTab');
                  });
              })
            } else if (data.type === "Venue") {
              fetch(`${env.API_URL}/api/venue/${data.id}`)
              .then(response => response.json())
              .then(data => {
                  storeData('@venueFormData', data).then(() => {
                    navigation.navigate('VenueTab');
                  });
              })
            }
          }
        })

      }

    });
  }

  const handleFacebook = () => {
    alert("Not ready")
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <Image style={styles.banner} source={{uri: "https://cdn.dribbble.com/users/66052/screenshots/10007568/social-media-marketing.png"}}></Image>
        <View style={styles.buttonArea}>
          <View style={styles.buttonContainer}>
              <FAB
                style={[styles.fab, styles.googleLoginButton]}
                icon="google"
                label="Sign In with Google"
                onPress={() => handleLogin(signInWithGoogleAsync)}
                color="#DB4437"
              />
          </View>
          <View style={styles.buttonContainer}>
            <FAB
              style={[styles.fab, styles.facebookLoginButton]}
              icon="facebook"
              label="Sign In with Facebook"
              onPress={() => handleLogin(signInWithFacebookAsync)}
              color="white"
            />
          </View>
        </View>
      </SafeAreaView>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  banner: {
    width: '100%',
    height: 350,
    position: 'absolute',
    top: 150,

  },
  safeArea: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'stretch',
  },
  logoArea: {
    position: 'absolute',
    alignSelf: 'center',
    top: 150,
  },
  title: {
    fontSize: 64,
    fontFamily: 'Avenir',
    fontWeight: '500',
    color: '#1AA2B0'
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    top: 580
  },
  buttonContainer: {
    width: '70%',
    height: 50,
    marginVertical: 10
  },
  googleLoginButton: {
    backgroundColor: 'white'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    width: 250,
    right: 0,
    bottom: 0,
  },
  facebookLoginButton: {
    backgroundColor: '#3b5998',
    borderColor: '#3b5998'
  }
});
