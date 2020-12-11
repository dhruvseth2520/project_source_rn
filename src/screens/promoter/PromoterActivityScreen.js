import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PromoterActivityScreen = () => {
  return (<View style={styles.background}>
    <Text style={styles.title}>Activity</Text>

  </View>)
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'white'
    },
    title: {
      marginTop: 100,
      marginLeft: 33,
      fontFamily: 'Futura',
      fontSize: 35,
      fontWeight: '400',
      marginBottom: 20,
      color: '#343434',
    },
})

export default PromoterActivityScreen;
