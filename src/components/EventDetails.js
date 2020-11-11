import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { getData } from "../utils/localStorage";
import { useNavigation } from "@react-navigation/native";
import { FAB } from 'react-native-paper';
import ShareButtons from './ShareButtons';
import env from "../utils/environment";

const EventDetails = ({ route }) => {
  const [venue, setVenue] = useState({});
  const [eventType, setEventType] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [promoter, setPromoter] = useState({});
  const event = route.params.event;
  const view = route.params.view;
  const navigation = useNavigation();

  useEffect(() => {
    switch (event.category) {
      case "Night Out":
        setEventType({name: "Night Out", icon: "moon"})
        break;
      case "Show":
        setEventType({name: "Show", icon: "microphone-alt"})
        break;
      case "Themed Event":
        setEventType({name: "Themed Event", icon: "mask"})
        break;
      case "Couples Event":
        setEventType({name: "Couples Event", icon: "restroom"})
        break;
      case "Activity":
          setEventType({name: "Activity", icon: "dice"})
          break;
      default:
          break;
    }
  }, [])

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
        if (view === "Venue") {
          navigation.navigate('VenueEventsHome');
        } else if (view === "Promoter") {
          navigation.navigate('PromoterEventHome');
        }
      }}>
        <Entypo name="chevron-small-left" size={34} color="black" />
      </TouchableOpacity>
      <Image source={{uri: event.imageURL}} style={styles.eventImage}></Image>

      <View style={styles.eventComponent}>
        <Text style={styles.title}>{event.eventName}</Text>
        <View style={{flexDirection: "row"}}>
          <Text style={styles.eventCategory}>{eventType.name}</Text>
          <FontAwesome5 name={eventType.icon} style={{marginTop: 7, marginLeft: 4}}/>
        </View>
      </View>

      {isLoading ? <ActivityIndicator size="large" style={{top: 30}} /> : (
        <>
            <View style={styles.eventComponent}>
              <View style={{flexDirection: "row"}}>
                <View style={{width: "60%"}}>
                  <Text style={styles.venueName}>{venue.venueName}</Text>
                  <Text style={styles.address}>{venue.venueAddress}</Text>
                </View>
              </View>
            </View>

            <View style={styles.eventComponent}>
              <View style={styles.eventDetail}>
                <FontAwesome5 style={styles.detailIcon} name="calendar-alt" />
                <Text style={[styles.detailText, {marginLeft: 21}]}>Occurs next on {new Date(event.date).toDateString()}</Text>
              </View>
              <View style={styles.eventDetail}>
                <FontAwesome5 style={styles.detailIcon} name="clock" />
                <Text style={[styles.detailText, {marginLeft: 19}]}>Starts at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
              </View>
              <View style={styles.eventDetail}>
                <FontAwesome5 style={styles.detailIcon} name="glass-cheers" />
                <Text style={[styles.detailText, {marginLeft: 13}]}>{event.promotion}</Text>
              </View>
              <View style={[styles.eventDetail, {marginBottom: 10}]}>
                <FontAwesome5 style={styles.detailIcon} name="money-bill-wave" />
                {(view === "Venue") ? (<Text style={[styles.detailText, {width: '86%'}]}>
                    {event.promoterFees} MMK per head promoter fees. {event.serviceFees} MMK per head service fees.
                </Text>) : (<Text style={[styles.detailText, {width: '86%'}]}>{event.promoterFees} MMK per head promoter fees</Text>)}
              </View>
            </View>

            <View style={{marginLeft: 20, paddingHorizontal: 5, paddingVertical: 20, width: '88%', marginBottom: 10}}>
              <Text style={styles.description}>{event.description}</Text>
            </View>

            {view === "Promoter" ? (
              <ShareButtons event={event} view="Page" />
            ) : <></>}
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
  title: {
    fontFamily: 'Avenir',
    fontSize: 35,
    fontWeight: '300'
  },
  eventCategory: {
    marginTop: 5,
    fontFamily: 'Avenir',
    fontWeight: '300',
    marginLeft: 4
  },
  eventImage: {
    width: '100%',
    height: 310,
    alignSelf: 'center'
  },
  eventComponent: {
    marginLeft: 20,
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    width: '88%'
  },
  venueName: {
    fontFamily: 'Avenir',
    fontSize: 27,
    fontWeight: '300'
  },
  address: {
    fontSize: 13,
    fontWeight: '300',
    marginTop: 5,
    width: '80%'
  },
  contact: {
    fontSize: 13,
    fontWeight: '300',
    marginTop: 5
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
  },
  description: {
    fontFamily: 'Avenir',
    fontWeight: '300'
  },
  backArrow: {
    position: 'absolute',
    top: 45,
    left: 10,
    zIndex: 1
  },

})

export default EventDetails;
