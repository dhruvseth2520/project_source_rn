import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getData } from "../../utils/localStorage";

const EventDetails = ({ route }) => {
  const [venue, setVenue] = useState({});
  const event = route.params.event;

  useEffect(() => {
    getData('@venueFormData').then(data => setVenue(data));
  }, [])

  return (
    <ScrollView style={styles.background}>

      <Image source={{uri: event.imageURL}} style={styles.eventImage}></Image>

      <View style={styles.eventComponent}>
        <Text style={styles.title}>{event.eventName}</Text>

      </View>





      <View style={styles.eventComponent}>
        <Text style={styles.venueName}>{venue.venueName}</Text>
        <Text style={styles.address}>{venue.venueAddress}</Text>
      </View>
      <View style={styles.eventComponent}>
        <View style={styles.eventDetail}>
          <FontAwesome5 style={styles.detailIcon} name="calendar-alt" />
          <Text style={[styles.detailText, {marginLeft: 12}]}>Occurs next on {event.date.toDateString()}</Text>
        </View>
        <View style={styles.eventDetail}>
          <FontAwesome5 style={styles.detailIcon} name="clock" />
          <Text style={styles.detailText}>Starts at {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
        </View>
        <View style={styles.eventDetail}>
          <FontAwesome5 style={styles.detailIcon} name="glass-cheers" />
          <Text style={[styles.detailText, {marginLeft: 5}]}>{event.promotion}</Text>
        </View>
        <View style={[styles.eventDetail, {marginBottom: 10}]}>
          <FontAwesome5 style={styles.detailIcon} name="money-bill-wave" />
          <Text style={styles.detailText}>{event.fees} MMK per head promoter fees</Text>
        </View>
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
    marginTop: 0
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 38,
    fontWeight: '400'
  },
  eventImage: {
    width: '100%',
    height: 350,
    alignSelf: 'center'
  },
  eventComponent: {
    marginLeft: 20,
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    width: 370
  },
  venueName: {
    fontFamily: 'Avenir',
    fontSize: 27,
    fontWeight: '400'
  },
  address: {
    fontSize: 13,
    fontWeight: '300',
    marginTop: 5,
    width: 320
  },
  eventDetail: {
    flexDirection: 'row',
    marginLeft: 3,
    marginBottom: 20
  },
  detailIcon: {
    fontSize: 26
  },
  detailText: {
    marginLeft: 10,
    marginTop: 6,
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Gill Sans'

  }

})

export default EventDetails;
