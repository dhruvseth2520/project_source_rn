import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegisterGuests = ({ route }) => {
  const event = route.params.event;
  return <View style={styles.background}>
    <Text>{event.eventName}</Text>
  </View>
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white'
  }
})

export default RegisterGuests;
