import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import * as Google from "expo-google-app-auth";

const LoginScreen = ({ navigation }) => {
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        // androidClientId: "649481912557-qem9m0m1sueat8p8jlp833dpdd8dr49s.apps.googleusercontent.com",
        iosClientId: "649481912557-qem9m0m1sueat8p8jlp833dpdd8dr49s.apps.googleusercontent.com",
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        return result;
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

  const handleGoogle = () => {
    signInWithGoogleAsync().then(response => {
      fetch('http://192.168.1.202:3000/api/auth/user', {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: response.user.id
        })
      }).then(response => response.json()).then(data => {
        if (!data.registered) {
          navigation.navigate('VoP');
        } else {
          if (data.type === "Promoter") {
            navigation.navigate('PromoterTab');
          } else if (data.type === "Venue") {
            navigation.navigate('VenueTab');
          }
        }
      })
    });
  }

  const handleFacebook = () => {
    alert("Not ready")
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoArea}>
          <Image style={styles.logoImage} source={require("../../assets/sourceLogo.png")} />
        </View>
        <View style={styles.buttonArea}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.defaultButton, styles.googleLoginButton]} onPress={handleGoogle}>
              <Image
                source={{ uri: "https://avatars1.githubusercontent.com/u/7328930?v=4&s=80" }}
                style={styles.LoginLogo}
              />
              <Text style={styles.googleLoginText}>Sign-in with Google</Text>
              <View style={{ flex: 1 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.defaultButton, styles.facebookLoginButton]} onPress={handleFacebook}>
              <Image
                source={{ uri: "https://logodix.com/logo/1185546.png" }}
                style={styles.LoginLogo}
              />
              <Text style={styles.facebookLoginText}>Sign-in with Facebook</Text>
              <View style={{ flex: 1 }} />
            </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  safeArea: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'stretch',
  },
  logoArea: {
    flex: 2,
    alignSelf: 'center',
  },
  logoImage: {
    width: 150,
    resizeMode: "contain",
    marginTop: 150
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  buttonContainer: {
    width: '70%',
    height: 50,
    margin: 10,
  },
  defaultButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 2,
    borderColor: 'black',
    borderWidth: 0.3,
  },
  googleLoginButton: {
    backgroundColor: 'white',
  },
  LoginLogo: {
    flex: 1,
    resizeMode: "contain",
    padding: 15,
  },
  googleLoginText: {
    flex: 6,
    color: 'grey',
    textAlign: 'center'
  },
  facebookLoginButton: {
    backgroundColor: '#3b5998',
    borderColor: '#3b5998'
  },
  facebookLoginText: {
    flex: 6,
    color: 'white',
    textAlign: 'center'
  },
});
