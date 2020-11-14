import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import RegisterGuestsModal from "./RegisterGuestsModal";
import GuestListModal from "./GuestListModal";
import ErrorModal from "./ErrorModal";
import env from "../utils/environment";
import FlipCard from 'react-native-flip-card'
import ShareButtons from './ShareButtons';
import { getData } from '../utils/localStorage';

const EventCard = ({ event, refreshEvents, view }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isFlipped, setFlipped] = useState(false);
  const [guestListVisible, setGuestListVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [guests, setGuests] = useState([]);

  const saveEvent = () => {
    getData('@promoterFormData').then(response => {
      fetch(`${env.API_URL}/api/promoters/saved`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({promoterId: response._id, eventId: event._id})
      }).then(response => response.json()).then(data => {
        if (data.status === "Success") {
          setSaved(!saved);
          refreshEvents();
        }
      })
    })
  }

  const refreshSavedStatus = () => {
    getData('@promoterFormData').then(response => {
      fetch(`${env.API_URL}/api/promoters/saved/${response._id}`).then(response => response.json()).then(data => {
        for (let i = 0; i < data.length; i++) {
          const savedEvent = data[i];
          if (event._id === savedEvent._id) {
            setSaved(true);
            return;
          }
        }
        setSaved(false);
      })
    })
  }

  useEffect(() => {
    fetchData();
  }, [guestListVisible, modalVisible]);

  useEffect(() => {
    if (view === "Promoter") {
      refreshSavedStatus();
    }
  }, [event])

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFlipped(false);
    });
    return unsubscribe;
  }, [])

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
    if (view === "Venue") {
      navigation.navigate('VenueEventPage', {
        event,
        view
      })
    } else {
      navigation.navigate('PromoterEventDetail', {
        event,
        view
      })
    }
  }

  if (view === "Venue") {
    return (
        <>
          <TouchableOpacity onPress={viewEvent} activeOpacity={0.7}>
              <View style={styles.card}>
                <Image style={styles.eventImage} source={{uri: event.imageURL}}></Image>
                <View style={styles.cardContent}>
                    <View style={styles.leftCol}>
                      <Text style={styles.eventName}>{event.eventName}</Text>
                      <Text style={styles.eventDate}>{new Date(event.date).toDateString() + " " + new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>

                      <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5, marginLeft: -11}}>
                        <TouchableOpacity style={styles.registerBtn} onPress={() => setModalVisible(true)}>
                          <View style={{flexDirection: 'row'}}>
                            <FontAwesome5 style={styles.btnIcon} name="edit"></FontAwesome5>
                            <Text style={styles.btnText}>Register Guests</Text>
                          </View>
                        </TouchableOpacity>
                        {guests.length > 0 ? (
                          <TouchableOpacity style={[styles.registerBtn, { marginLeft: 8, width: 125 }]} onPress={() => setGuestListVisible(true)}>
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
                          <TouchableOpacity onPress={editEvent}>
                            <View style={styles.circularBtn}>
                              <FontAwesome5 name="pen-alt" style={styles.cardIcon}/>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={deleteEvent}>
                            <View style={styles.circularBtn}>
                              <FontAwesome5 name="trash" style={styles.cardIcon}/>
                            </View>
                          </TouchableOpacity>
                      </View>
                    </View>
                </View>
              </View>
          </TouchableOpacity>

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
        </>
    )
  } else if (view === "Promoter") {
      return (
              <FlipCard flip={isFlipped}>
                <TouchableOpacity onPress={viewEvent} onLongPress={() => setFlipped(!isFlipped)} activeOpacity={0.8}>
                    <View style={styles.card}>
                      <Image style={styles.eventImage} source={{uri: event.imageURL}}></Image>
                      <View style={styles.cardContent}>
                          <View style={styles.leftCol}>
                            <Text style={[styles.eventName, {fontSize: 20}]}>{event.eventName}</Text>
                            <Text style={[styles.eventName, {fontSize: 15, marginTop: 0}]}>{event.venueName}</Text>
                            <Text style={[styles.eventDate, {marginBottom: 18, marginTop: 3}]}>{new Date(event.date).toDateString() + " " + new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                          </View>

                          <View style={styles.rightCol}>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity onPress={saveEvent}>
                                  <View style={styles.circularBtn}>
                                    {saved ? (<FontAwesome name="bookmark" style={styles.cardIcon}  />) : (
                                      <FontAwesome name="bookmark-o" style={styles.cardIcon}  />
                                    )}
                                  </View>
                                </TouchableOpacity>
                            </View>
                          </View>
                      </View>
                    </View>
                </TouchableOpacity>
                <CardFlipSide event={event} />
            </FlipCard>
  )}
}


const CardFlipSide = ({ event }) => {
  return (<View style={styles.card}>
    <View style={styles.cardBack}>
      <Text style={[styles.label, {marginTop: 27}]}>Description</Text>
      <Text style={styles.value}>{event.description}</Text>
      <Text style={styles.label}>Promotion</Text>
      <Text style={styles.value}>{event.promotion}</Text>
      <Text style={styles.label}>Promoter Fees</Text>
      <Text style={[styles.value, {marginBottom: 15}]}>{event.promoterFees + " MMK per head"}</Text>
      <ShareButtons event={event} view="Card" />
    </View>
  </View>)
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    width: 350,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 5,
    },
    shadowOpacity: 0.20,
    elevation: 8,
    backgroundColor: 'white',
    left: 1,
    borderRadius: 28
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  leftCol: {
    marginTop: 12,
    width: '60%',
    left: 15
  },
  rightCol: {
    marginTop: 10,
    right: 5
  },
  eventImage: {
    width: 350,
    height: 190,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  eventName: {
    fontFamily: 'Avenir',
    fontSize: 19,
    fontWeight: '300',
    alignSelf: 'flex-start'
  },
  eventDate: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '300',
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  btnContainer: {
    flexDirection: 'row',
    top: -4
  },
  circularBtn: {
    width: 30,
    height: 30,
    borderRadius: 24,
    marginRight: 10,
  },
  saveButton: {
    marginRight: 15,
    marginLeft: 5,
    top: 10
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
  cardIcon: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    color: '#2395A0'
  },
  btnIcon: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: '#2395A0',
    top: 4,
    left: 12
  },
  cardBack: {
    height: 285,
  },
  label: {
    paddingHorizontal: 25,
    fontSize: 16,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    marginTop: 5
  },
  value: {
    fontFamily: 'Gill Sans',
    fontWeight: '300',
    paddingHorizontal: 25,
    paddingVertical: 10
  }
})

export default EventCard;
