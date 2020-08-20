import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import React from "react";

const LoginScreen = () => {
  const GoogleLoginHandler = () => {
    alert("Stay Away! I'm not ready yet")
  }

  const FacebookLoginHandler = () => {
    alert("Also not ready")
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'light-content'} />
      <Image
        source={{ uri: "https://www.wildandaway.com/wp-content/uploads/2018/11/best-nightlife-in-asia-bangkok-1.jpg" }}
        style={styles.backgroundImage}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoArea}>
          <Image style={styles.logoImage} source={require("../assets/icon.png")} />
        </View>
        <View style={styles.buttonArea}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.defaultButton, styles.googleLoginButton]} onPress={GoogleLoginHandler}>
              <Image
                source={{ uri: "https://avatars1.githubusercontent.com/u/7328930?v=4&s=80" }}
                style={styles.LoginLogo}
              />
              <Text style={styles.googleLoginText}>Login with Google</Text>
              <View style={{ flex: 1 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.defaultButton, styles.facebookLoginButton]} onPress={FacebookLoginHandler}>
              <Image
                source={{ uri: "https://logodix.com/logo/1185546.png" }}
                style={styles.LoginLogo}
              />
              <Text style={styles.facebookLoginText}>Login with Facebook</Text>
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
    // backgroundColor: 'white'
  },
  logoArea: {
    flex: 2,
    alignSelf: 'center'
  },
  logoImage: {
    width: 120,
    resizeMode: "contain"
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  buttonContainer: {
    width: '80%',
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
    borderWidth: 0.3
  },
  googleLoginButton: {
    backgroundColor: 'white',
  },
  LoginLogo: {
    flex: 1,
    resizeMode: "contain",
    padding: 15
  },
  googleLoginText: {
    flex: 6,
    color: 'grey',
    textAlign: 'center'
  },
  facebookLoginButton: {
    backgroundColor: '#3b5998',
  },
  facebookLoginText: {
    flex: 6,
    color: 'white',
    textAlign: 'center'
  },
});
