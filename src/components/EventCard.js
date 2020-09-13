import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RegisterGuestsModal from "./RegisterGuestsModal";

const EventCard = ({ event }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const editEvent = () => {
    navigation.navigate('VenueEventForm', {
      action: 'Update Event',
      event
    })
  }

  const deleteEvent = () => {
    console.log('Deleting');
    console.log(event);
  }

  const viewEvent = () => {
    navigation.navigate('VenueEventPage', {
      event
    })
  }

  return (
    <View style={styles.card}>
      <Image style={styles.eventImage} source={{uri: event.imageURL}}></Image>
      <View style={styles.cardContent}>
          <View style={styles.leftCol}>
            <Text style={styles.eventName}>{event.eventName}</Text>
            <Text style={styles.eventDate}>{event.date.toDateString() + " " + event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            <TouchableOpacity style={styles.registerBtn} onPress={() => setModalVisible(true)}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.btnText}>Register Guests</Text>
                <FontAwesome5 style={styles.btnIcon} name="edit"></FontAwesome5>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rightCol}>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={viewEvent}>
                  <View style={[styles.circularBtn, {borderColor: '#148995'}]}>
                    <FontAwesome5 name="book-open" style={{alignSelf: 'center', marginTop: 11, color: '#148995'}}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={editEvent}>
                  <View style={[styles.circularBtn, {borderColor: '#148995'}]}>
                    <FontAwesome5 name="pen" style={{alignSelf: 'center', marginTop: 11, color: '#148995'}}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteEvent}>
                  <View style={[styles.circularBtn, {borderColor: '#148995'}]}>
                    <FontAwesome5 name="trash" style={{alignSelf: 'center', marginTop: 11, color: '#148995'}}/>
                  </View>
                </TouchableOpacity>
            </View>
          </View>
      </View>
      <RegisterGuestsModal event={event} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    width: 350,
    marginBottom: 10
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  leftCol: {
    marginTop: 8
  },
  rightCol: {
    marginTop: 8
  },
  eventImage: {
    width: 350,
    height: 190
  },
  eventName: {
    fontFamily: 'Avenir',
    fontSize: 19,
    fontWeight: '300',
    alignSelf: 'flex-start'
  },
  eventDate: {
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '300',
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  btnContainer: {
    flexDirection: 'row',
    marginBottom: 13,
    marginTop: 3
  },
  circularBtn: {
    borderWidth: 0.5,
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 10
  },
  registerBtn: {
    width: 130,
    height: 35,
    borderColor: '#148995',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 20
  },
  btnText: {
    fontFamily: 'Avenir',
    alignSelf: 'flex-start',
    top: 7,
    left: 6,
    fontWeight: '300',
    color: '#148995'
  },
  btnIcon: {
    alignSelf: 'flex-end',
    fontSize: 17,
    color: '#148995',
    top: 5,
    left: 11
  }
})

export default EventCard;
