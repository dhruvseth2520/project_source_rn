import { Text, View, StyleSheet, Image, SafeAreaView } from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <View style={styles.screen}>
        <Image
            source={{uri: "https://luxurylaunches.com/mumbai/wp-content/uploads/2019/03/Interior-Images-1-1170x780.jpg"}}
            style={styles.backgroundImage}
          />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loginButtonArea}></View>
      </SafeAreaView>
        <Image
          style={styles.logo}
          source={require("../assets/icon.png")}
        ></Image>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'flex-end',
    bottom: 100
  },
  loginButtonArea : {
    backgroundColor: "green", 
    flex: 1, 
    height: 200, 
  },
  logo: {
    position: "absolute",
    top: '10%',
    alignSelf: "center",
  },
});
