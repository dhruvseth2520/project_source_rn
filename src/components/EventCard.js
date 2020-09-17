import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RegisterGuestsModal from "./RegisterGuestsModal";
import GuestListModal from "./GuestListModal";

const EventCard = ({ event }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [guestListVisible, setGuestListVisible] = useState(false);
  const [guests, setGuests] = useState({});

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

            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <TouchableOpacity style={styles.registerBtn} onPress={() => setModalVisible(true)}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.btnText}>Register Guests</Text>
                  <FontAwesome5 style={styles.btnIcon} name="edit"></FontAwesome5>
                </View>
              </TouchableOpacity>
              {Object.keys(guests).length ? (
                <TouchableOpacity style={[styles.registerBtn, { marginLeft: 8, width: 125, borderColor: '#1A7DB0', flexDirection: 'row' }]} onPress={() => setGuestListVisible(true)}>
                    <Text style={[styles.btnText, {color: '#1A7DB0'}]}>View Guest List</Text>
                    <FontAwesome5 style={[styles.btnIcon, { top: -9, right: 7, color: '#1A7DB0'}]} name="receipt"></FontAwesome5>
                </TouchableOpacity>
              ) : <></>}
            </View>


          </View>
          <View style={styles.rightCol}>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={viewEvent}>
                  <View style={[styles.circularBtn, {borderColor: '#1AA2B0'}]}>
                    <FontAwesome5 name="book-open" style={{alignSelf: 'center', marginTop: 11, color: '#1AA2B0'}}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={editEvent}>
                  <View style={[styles.circularBtn, {borderColor: '#1AA2B0'}]}>
                    <FontAwesome5 name="pen" style={{alignSelf: 'center', marginTop: 11, color: '#1AA2B0'}}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteEvent}>
                  <View style={[styles.circularBtn, {borderColor: '#1AA2B0'}]}>
                    <FontAwesome5 name="trash" style={{alignSelf: 'center', marginTop: 11, color: '#1AA2B0'}}/>
                  </View>
                </TouchableOpacity>
            </View>
          </View>
      </View>
      <RegisterGuestsModal
        event={event}
        modalVisible={modalVisible} setModalVisible={setModalVisible}
        guests={guests} setGuests={setGuests}
      />

      <GuestListModal
        modalVisible={guestListVisible} setModalVisible={setGuestListVisible}
        guests={guests} event={event}
      />

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
    marginTop: 8,
    width: '60%'
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
    borderColor: '#1AA2B0',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 10
  },
  btnText: {
    fontFamily: 'Avenir',
    alignSelf: 'flex-start',
    top: 7,
    left: 6,
    fontWeight: '300',
    color: '#1AA2B0'
  },
  btnIcon: {
    alignSelf: 'flex-end',
    fontSize: 17,
    color: '#1AA2B0',
    top: 5,
    left: 11
  }
})

export default EventCard;
