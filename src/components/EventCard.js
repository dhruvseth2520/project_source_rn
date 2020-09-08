import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


const EventCard = ({ event }) => {

  return (
    <View style={styles.card}>
      <Image style={styles.eventImage} source={{uri: event.imageURL}}></Image>
      <Text style={styles.eventName}>{event.eventName}</Text>
      <Text style={styles.eventDate}>{event.date.toDateString() + " " + event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
      <TouchableOpacity>
        <View>

        </View>
      </TouchableOpacity>
      <Text style={styles.eventPromotion}>{event.promotion}</Text>
      <Text style={styles.eventFees}>{event.fees + " MMK / promoter"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    width: 350,
    marginBottom: 20
  },
  eventImage: {
    width: 350,
    height: 220
  },
  eventName: {
    top: 12,
    fontFamily: 'Avenir',
    fontSize: 19,
    fontWeight: '300',
    alignSelf: 'flex-start'
  },
  eventDate: {
    top: 12,
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '300',
    alignSelf: 'flex-start',
    marginBottom: 25
  },
  eventFees: {
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: '300',
    alignSelf: 'flex-end',
    top: 255,
    position: 'absolute'
  },
  eventPromotion: {
    top: 237,
    marginBottom: 1,
    fontFamily: 'Avenir',
    fontSize: 14,
    right: -2,
    fontWeight: '300',
    alignSelf: 'flex-end',
    position: 'absolute'
  }
})

export default EventCard;
