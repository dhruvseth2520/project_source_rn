import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert} from 'react-native';
import { FontAwesome5, AntDesign, FontAwesome } from '@expo/vector-icons';
import { getData } from "../../../utils/localStorage";
import { PulseIndicator } from 'react-native-indicators';
import { useNavigation } from "@react-navigation/native";
import { FAB } from 'react-native-paper';
import ShareButtons from '../../../components/ShareButtons';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import env from "../../../utils/environment";

const EventDetails = ({ route }) => {
  const [venue, setVenue] = useState({});
  const [eventType, setEventType] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [promoter, setPromoter] = useState({});
  const [saved, setSaved] = useState(false);
  const event = route.params.event;
  const view = route.params.view;
  const navigation = useNavigation();

  const isSaved = route.params.isSaved;

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  let promotionCondition = "";
  if (event.promotionCondition && event.promotionCondition.condition && event.promotionCondition.amount) {
    if (event.promotionCondition.condition === "Party Size") {
      promotionCondition = "For every group of " + event.promotionCondition.amount;
    } else if (event.promotionCondition.condition === "Amount Spent") {
      promotionCondition = "If a minimum of " + event.promotionCondition.amount + " MMK is spent";
    }
  }


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
        }
      })
    })
  }

  useEffect(() => {
    switch (event.category) {
      case "Night Out":
        setEventType({name: "Night Out", icon: "moon"})
        break;
      case "Live Show":
        setEventType({name: "Live Show", icon: "microphone-alt"})
        break;
      case "Themed Event":
        setEventType({name: "Themed Event", icon: "mask"})
        break;
      case "Game Day":
        setEventType({name: "Game Day", icon: "futbol"})
        break;
      case "Holiday Special":
        setEventType({name: "Holiday Special", icon: "candy-cane"})
        break;
      case "Ladies Night":
        setEventType({name: "Ladies Night", icon: "glass-cheers"})
        break;
      case "Couples Event":
        setEventType({name: "Couples Event", icon: "restroom"})
        break;
      default:
        break;
    }
  }, [])



  async function createReminder() {
      Calendar.requestCalendarPermissionsAsync().then(() => {
        Calendar.requestRemindersPermissionsAsync().then(() => {
          Alert.alert(
            'Event Reminder',
            `Set a reminder for ${event.eventName} on ${new Date(event.date).toDateString()}?`,
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'OK', onPress: () => {
                  Calendar.createReminderAsync(null, {
                    title: `Reminder for ${event.eventName}`,
                    startDate: new Date(),
                    dueDate: new Date(event.date),
                    location: venue.venueName + ", " + venue.venueAddress,
                    notes: event.description,
                    completed: false
                  }).then(() => {
                    Alert.alert('Success', `A reminder has been created for ${event.eventName}`)
                  })
                }}
            ],
            { cancelable: false }
          );
        });
      });
  }

  useEffect(() => {
    if (view === "Venue") {
      getData('@venueFormData').then(data => {
        setVenue(data);
        setLoading(false);
      });
    } else if (view === "Promoter") {
      fetch(`${env.API_URL}/api/venue/detail/${event.venueId}`).then(response => response.json()).then(data => {
        setVenue(data);
        setLoading(false);
      });
    }
  }, [])

  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity style={styles.backArrow} onPress={() => {
        navigation.goBack();
      }}>
        <AntDesign name="arrowleft" size={25} color="black" />
      </TouchableOpacity>
      {isLoading ? (
        <PulseIndicator color="#22D2C9" style={{alignSelf: 'center', left: -11, marginTop: 120, marginBottom: 20}}></PulseIndicator>
      ) : (
        <>
          {view === 'Promoter' ? (
            <TouchableOpacity style={styles.saveButtonContainer} onPress={saveEvent}>
              <View>
                {saved ? (<FontAwesome name="bookmark" style={styles.saveButton} />) : (<FontAwesome name="bookmark-o" style={styles.saveButton}  />)}
              </View>
            </TouchableOpacity>
          ) : <></>}

          <View style={styles.imageContainer}>
            <Image source={{uri: event.imageURL}} style={styles.eventImage} />
          </View>

          <View style={styles.eventContainer}>
            <View style={styles.headerContainer}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '61%'}}>
                  <Text style={{fontFamily: 'Avenir', fontSize: 16, color: 'gray'}}>Event</Text>
                  <Text style={styles.eventTitle}>{event.eventName}</Text>
                  <View style={{flexDirection: 'row', marginTop: 10, left: 3}}>
                    <Text style={styles.typeLabel}>{eventType.name}</Text>
                    <FontAwesome5 name={eventType.icon} style={styles.typeIcon}></FontAwesome5>
                  </View>
                </View>

                <View style={[styles.venueContainer, {marginTop: event.eventName.length > 13 ? 25 : 13}]}>
                  <Image source={{uri: venue.venueImage}} style={{height: 50, width: 50, borderRadius: 25, alignSelf: 'center'}}></Image>
                  <Text style={styles.venueName}>{venue.venueName}</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 25, marginLeft: 0, width: '95%'}}>
                <TouchableOpacity  style={{flexDirection: 'row', width: '53%'}} onPress={() => Linking.openURL(`https://maps.google.com/?q=${venue.venueName + ", " + venue.venueAddress}`)}>
                  <View style={styles.headerIconContainer}>
                    <FontAwesome5 name="map-marker-alt" style={styles.headerIcon} />
                  </View>
                  <Text style={[styles.headerText, {marginTop: -2}]}>{venue.venueAddress}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={createReminder} style={{marginLeft: 12, flexDirection: 'row', width: '47%'}}>
                  <View style={styles.headerIconContainer}>
                    <FontAwesome5 name="calendar" style={styles.headerIcon} />
                  </View>
                  <Text style={[styles.headerText, {marginTop: -2}]}>{new Date(event.date).toDateString() + " " + new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bodyContainer}>
              <View style={{borderBottomWidth: 0.5, borderColor: 'gray', width: '95%'}}>
                <Text style={styles.title}>Description</Text>
                <Text style={[styles.bodyText, {marginBottom: 30}]}>{event.description}</Text>
              </View>

              <View style={[styles.promoContainer, {borderBottomWidth: view === 'Promoter' ? 0.5 : 0, borderColor: 'gray'}]}>
                <View style={styles.promoRow}>
                  <View style={{width: '12%'}}>
                    <FontAwesome5 name="wine-bottle" style={styles.promoIcon} />
                  </View>
                  <View style={{width: '80%', left: 20}}>
                    <Text style={styles.promoTitle}>Promotion</Text>
                    <Text style={styles.promoDescription}>{event.promotion}</Text>
                    {promotionCondition !== "" ? (
                      <Text style={styles.promoAsterisk}>*{promotionCondition}</Text>
                    ) : <></>}
                  </View>
                </View>
                <View style={[styles.promoRow, {marginTop: 10, marginBottom: 45}]}>
                  <View style={{width: '12%'}}>
                    <FontAwesome5 name="search-dollar" style={[styles.promoIcon, {top: 10}]} />
                  </View>
                  <View style={{width: '80%', left: 20}}>
                    <Text style={styles.promoTitle}>Promoter Fees</Text>
                    <Text style={styles.promoDescription}>{event.promoterFees + " MMK per head"}</Text>
                    {view === "Venue" ? (<Text style={styles.promoAsterisk}>*{event.serviceFees + " MMK per head service fees"}</Text>) : <></>}
                  </View>
                </View>
              </View>

              {view === 'Promoter' ? (
                <View style={styles.socialContainer}>
                  <Text style={[styles.title, {fontFamily: 'Avenir', fontWeight: '400', fontSize: 18}]}>Share this event</Text>
                  <Text style={styles.comment}>Share your invite link on social media or with your friends and get paid for every referred guest who attends {event.eventName}</Text>
                  <ShareButtons event={event} />
                </View>
              ) : <></>}
            </View>
          </View>
        </>
        )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1
  },
  backArrow: {
    position: 'absolute',
    top: 55,
    left: 20,
    zIndex: 1
  },
  eventImage: {
    height: 350,
    width: '100%'
  },
  eventContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    top: -30
  },
  headerContainer: {
    marginTop: 30,
    width: '85%',
    marginLeft: 30
  },
  eventTitle: {
    fontFamily: 'Gill Sans',
    fontSize: 36,
    marginTop: 10
  },
  headerIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EAEAEA',
    padding: 10,
    top: -4
  },
  headerIcon: {
    fontSize: 16,
    alignSelf: 'center',
    top: 1,
    color: '#1AB0A8'
  },
  headerText: {
    fontFamily: 'Avenir',
    width: '80%',
    marginLeft: 10,
    color: '#5A5A5A'
  },
  venueContainer: {
    width: '39%',
    marginLeft: 11,
    marginTop: 25,
  },
  venueName: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: '300',
    marginTop: 11,
    alignSelf: 'center'
  },
  bodyContainer: {
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 0,
    width: '85%',
  },
  title: {
    fontFamily: 'Gill Sans',
    fontSize: 20
  },
  bodyText: {
    marginTop: 10,
    fontWeight: '300',
    fontFamily: 'Avenir'
  },
  eventIcon: {
    alignSelf: 'center',
    fontSize: 28,
    color: '#1AB0A8'
  },
  promoIcon: {
    fontSize: 28,
    alignSelf: 'center',
    top: 8,
    color: '#1AB0A8'
  },
  promoContainer: {
    marginTop: 30,
    width: '95%'
  },
  promoRow: {
    flexDirection: 'row',
    marginBottom: 20
  },
  promoTitle: {
    fontFamily: 'Gill Sans',
    fontSize: 18
  },
  promoDescription: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    top: 7
  },
  promoAsterisk: {
    top: 15,
    fontFamily: 'Avenir',
    fontWeight: '300',
    color: 'gray',
    fontSize: 12
  },
  typeLabel: {
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '300'
  },
  typeIcon: {
    fontSize: 11,
    top: 2,
    color: '#565656',
    left: 5
  },
  socialContainer: {
    marginTop: 30,
    width: '97%'
  },
  comment: {
    fontFamily: 'Avenir',
    fontSize: 13,
    color: '#535353',
    marginTop: 5,
    fontWeight: '300'
  },
  saveButtonContainer: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'flex-end',
    right: 30,
    top: 55
  },
  saveButton: {
    fontSize: 22,
    color: 'white'
  }
})

export default EventDetails;
