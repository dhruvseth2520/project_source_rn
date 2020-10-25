import { Text, View, StyleSheet, Image, ImageBackground, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { storeData, removeData } from '../../utils/localStorage';
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
        source={{uri: 'https://i.pinimg.com/736x/3e/b9/27/3eb92787b1b67241b99d19c27aa26f54.jpg'}}
        style={{height: '100%'}}>

      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Source</Text>
        <Image style={styles.banner} source={{uri: "https://795364.smushcdn.com/1538781/wp-content/uploads/10-Social-Media-Marketing.png?lossy=1&strip=1&webp=1"}}></Image>
        <Text style={styles.slogan}>The new way to promote</Text>

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
    width: 280,
    height: 280,
    position: 'absolute',
    top: 200,
    alignSelf: 'center'
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
  slogan: {
    fontSize: 30,
    fontFamily: 'Trebuchet MS',
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
    width: '75%',
    top: 420,
    left: 50
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    top: 480
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

export default LoginScreen;
