import React, { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, SafeAreaView, Image, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventCard from "../../components/EventCard";
import Header from "../../components/Header";
import env from "../../utils/environment";
import { getData } from "../../utils/localStorage";


const VenueEventsScreen = () => {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [])

  const fetchData = () => {
    getData('@venueFormData').then(response => {
      fetch(`${env.API_URL}/api/events/${response.venueId}`).then(response => response.json()).then(data => {
        setEvents(data);
      })
    })
  }


  return (
    <ScrollView style={styles.background} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
      <Header title="Events" />
      <Image style={styles.heroImage} source={{uri: 'https://images.unsplash.com/photo-1558346489-19413928158b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'}} />
      <Text style={styles.description}>Create custom events with promotions for your target market and share them with our vast network of promoters and influencers</Text>
      <Text style={styles.subTitle}>Your Events</Text>
      <SafeAreaView style={styles.eventContainer} >
        {events.length === 0
          ? <Text style={{fontFamily: "Avenir", fontWeight: '300', marginTop: -3}}>You have no events to show yet. Add your first now!</Text>
          : <FlatList
              showsVerticalScrollIndicator={false}
              data={events}
              keyExtractor={event => event.eventName}
              renderItem={({ item }) => {
                // Only render events that are occuring today or in the future here
                return <EventCard event={item} />
              }}
            ></FlatList>
        }
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('VenueEventForm')}>
          <FontAwesome5 name="plus" style={{alignSelf: 'center', fontSize: 16, marginTop: 19, color: 'white'}} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 33,
    marginTop: 70
  },
  description: {
    fontFamily: 'Gill Sans',
    fontWeight: '300',
    color: '#424242',
    marginLeft: 32,
    marginTop: 15,
    paddingRight: 25,
    fontSize: 15
  },
  heroImage: {
    width: 350,
    height: 200,
    marginTop: 20,
    marginLeft: 32
  },
  subTitle: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 33,
    marginTop: 30
  },
  eventContainer: {
    marginTop: 10,
    marginLeft: 35
  },
  addBtn: {
    width: 54,
    height: 54,
    borderRadius: 54,
    backgroundColor: '#1AA2B0',
    marginTop: 20,
    marginLeft: 142,
    marginBottom: 50
  }
})

export default VenueEventsScreen;
