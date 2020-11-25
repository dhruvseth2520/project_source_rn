import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const Jumbotron = ({ image, title, caption }) => {
  const windowHeight = Dimensions.get('window').height;

  let titleFontSize = 45;
  if (windowHeight < 700) {
    titleFontSize = 40;
  }

  return (<View style={styles.container}>
      <Image
        source={{uri: image}}
        style={styles.image}>
      </Image>
      <Text style={[styles.title, {fontSize: titleFontSize}]}>{title}</Text>
      <Text style={styles.caption}>{caption}</Text>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    width: '84%',
    height: 350,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginVertical: 5
  },
  image: {
    width: '100%',
    position: 'absolute',
    height: 350,
    borderRadius: 20
  },
  title: {
    color: 'white',
    fontFamily: 'Futura',
    fontWeight: '600',
    left: 20,
    width: '90%',
    marginTop: 200
  },
  caption: {
    color: 'white',
    fontFamily: 'Avenir',
    width: '90%',
    fontWeight: '700',
    left: 22,
    fontSize: 15,
    marginTop: 5
  }
})

export default Jumbotron;
