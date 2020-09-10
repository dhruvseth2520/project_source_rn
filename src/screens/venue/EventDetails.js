import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const EventDetails = ({ route }) => {
  const event = route.params.event;

  return (
    <ScrollView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.eventName}</Text>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1
  },
  header: {
    marginTop: 70,
    marginLeft: 25
  },
  title: {
    fontSize: 32,
    fontFamily: 'Avenir',
    fontWeight: '300'
  }
})

export default EventDetails;
