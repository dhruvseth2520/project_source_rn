import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Jumbotron = ({ image, title, caption }) => {
  return (<View style={styles.container}>
      <Image
        source={{uri: image}}
        style={styles.image}>
      </Image>
      <Text style={styles.title}>{title}</Text>
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
    fontSize: 45,
    top: 225,
    left: 20
  },
  caption: {
    color: 'white',
    fontFamily: 'Avenir',
    width: '80%',
    fontWeight: '500',
    top: 230,
    left: 26
  }
})

export default Jumbotron;
