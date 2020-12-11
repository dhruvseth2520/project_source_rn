import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../../utils/localStorage';
import EventCard from "../../components/EventCard";
import env from "../../utils/environment";

const PromoterSavedEvents = () => {
  const navigation = useNavigation();
  const [savedEvents, setSavedEvents] = useState([]);

  const fetchData = () => {
    getData('@promoterFormData').then(response => {
      fetch(`${env.API_URL}/api/promoters/saved/${response._id}`).then(response => response.json()).then(data => {
        let upcomingEvents = [];
        data.forEach(event => {
          const currentDate = new Date();
          const difference = (new Date(event.date) - currentDate) / 86400000;
          if (difference >= -0.5) {
            upcomingEvents.push(event);
          }
        })
        setSavedEvents(sortByDate(upcomingEvents));
      })
    })
  }

  const sortByDate = (arr) => {
    return arr.sort(function(a, b) {
                        var keyA = new Date(a.date);
                        var keyB = new Date(b.date);
                        // Compare the 2 dates
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [])

  return (
      <ScrollView style={styles.screen}>
          <Text style={styles.title}>Saved</Text>
          <Text style={styles.label}>You have {savedEvents.length} saved event(s)</Text>
          <FlatList
              style={styles.eventContainer}
              keyExtractor={event => event._id}
              data={savedEvents}
              renderItem={({ item }) => {
                return (
                    <EventCard event={item} refreshEvents={fetchData} view="Promoter" />
                )
              }}
          />

      </ScrollView>
  )
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "white",
    },
    title: {
      marginTop: 100,
      marginLeft: 33,
      fontFamily: 'Futura',
      fontSize: 35,
      fontWeight: '400',
      marginBottom: 10,
      color: '#343434',
    },
    label: {
      fontFamily: 'Avenir',
      fontSize: 15,
      fontWeight: '400',
      marginLeft: 35,
    },
    eventContainer: {
      marginLeft: 35,
      marginBottom: 80,
      marginTop: 5
    },
});

export default PromoterSavedEvents;
