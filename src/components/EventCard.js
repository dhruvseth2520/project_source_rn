import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import RegisterGuestsModal from "./RegisterGuestsModal";
import GuestListModal from "./GuestListModal";
import ErrorModal from "./ErrorModal";
import env from "../utils/environment";


const EventCard = ({ event, refreshEvents }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [guestListVisible, setGuestListVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    fetchData();
  }, [guestListVisible, modalVisible]);

  const fetchData = () => {
    fetch(`${env.API_URL}/api/events/attendance/event/${event._id}`)
    .then(response => response.json())
    .then(data => {
      setGuests(data);
    })
  }

  const editEvent = () => {
    navigation.navigate('VenueEventForm', {
      action: 'Update Event',
      event
    })
  }

  const deleteEvent = () => {
    const currentDate = new Date();
    const difference = (new Date(event.date).getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

    if (difference >= 0 && difference <= 3) {
      setErrorMessage("Events can't be deleted within 3 days of the event date");
      setErrorModalVisible(true);
    } else {
      fetch(`${env.API_URL}/api/events/${event._id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then(data => {
        if (data.status === "Success") {
          refreshEvents();
        }
      })
    }
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
            <Text style={styles.eventDate}>{new Date(event.date).toDateString() + " " + new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>

            <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5, marginLeft: -8}}>
              <TouchableOpacity style={styles.registerBtn} onPress={() => setModalVisible(true)}>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome5 style={styles.btnIcon} name="edit"></FontAwesome5>
                  <Text style={styles.btnText}>Register Guests</Text>
                </View>
              </TouchableOpacity>
              {guests.length > 0 ? (
                <TouchableOpacity style={[styles.registerBtn, { marginLeft: 8, width: 125, borderColor: '#1A7DB0'}]} onPress={() => setGuestListVisible(true)}>
                    <View style={{flexDirection: 'row'}}>
                      <FontAwesome5 style={[styles.btnIcon, { top: 5, color: '#1A7DB0'}]} name="receipt"></FontAwesome5>
                      <Text style={[styles.btnText, {left: 19, color: '#1A7DB0'}]}>View Guest List</Text>
                    </View>
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
      />

      <GuestListModal
        modalVisible={guestListVisible} setModalVisible={setGuestListVisible}
        guests={guests} setGuests={setGuests}
        event={event}
      />

      <ErrorModal
        modalVisible={errorModalVisible}
        setModalVisible={setErrorModalVisible}
        errorMessage={errorMessage}
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
    width: 120,
    height: 40,
    marginRight: 7
  },
  btnText: {
    fontFamily: 'Avenir',
    alignSelf: 'flex-start',
    fontSize: 15,
    top: 7,
    left: 16,
    fontWeight: '300',
    color: '#218A95'
  },
  btnIcon: {
    alignSelf: 'flex-end',
    fontSize: 18,
    color: '#218A95',
    top: 4,
    left: 12
  }
})

export default EventCard;
