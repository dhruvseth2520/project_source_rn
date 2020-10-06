import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ title, dashboard }) => {
  return (
    <View>
      <Image style={styles.header} source={require('../assets/canva-photo-editor.png')}></Image>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 230,
    marginTop: 0,
    width: '100%'
  },
  title: {
    fontSize: 36,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: 'white',
    position: 'absolute',
    top: 100,
    left: 32,
    zIndex: 1
  },

})

export default Header;
