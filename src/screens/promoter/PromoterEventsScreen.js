import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, Image, ScrollView, Text } from 'react-native';
import Jumbotron from '../../components/Jumbotron';
import { Searchbar } from 'react-native-paper';
import EventCard from "../../components/EventCard";
import { EventsFilterGrid } from "../../components/FilterGrid";
import env from '../../utils/environment';

const PromoterEventListScreen = ({ navigation }) => {
    const [events, setEvents] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [query, setQuery] = useState("");
    const [price, setPrice] = useState({
      active: false,
      displayValue: 0,
      filterValue: 0
    });
    const [category, setCategory] = useState({
      active: false,
      displayValue: [],
      filterValue: []
    });
    const [date, setDate] = useState({
      active: false,
      displayValue: [],
      filterValue: []
    });

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

    const fetchData = () => {
      fetch(`${env.API_URL}/api/events`).then(response => response.json()).then(data => {
        const upcomingEvents = [];
        const currentDate = new Date();
        data.forEach(event => {
          const difference = (currentDate - new Date(event.date)) / 86400000;
          if (difference <= 0.5) {
            upcomingEvents.push(event);
          }
        })
        const sortedEvents = sortByDate(upcomingEvents);
        setEvents(sortedEvents);
        setEventData(sortedEvents);
      })
    }

    useEffect(() => {
      fetchData();
    }, [])

    useEffect(() => {
      setEvents(handleSearch());
    }, [query, price, category])

    const handleSearch = () => {
      const filteredEvents = [];
      eventData.forEach(event => {
        const eventNameMatch = event.eventName.toLowerCase().trim().startsWith(query.toLowerCase().trim());
        const venueNameMatch = event.venueName.toLowerCase().trim().startsWith(query.toLowerCase().trim());
        const priceMatch = event.promoterFees >= price.filterValue;

        let categoryMatch = true;
        if (category.filterValue.length) {
          const categories = category.filterValue.map(el => el.value);
          categoryMatch = categories.includes(event.category);
        }

        if ((eventNameMatch || venueNameMatch) && priceMatch && categoryMatch) {
            filteredEvents.push(event);
        }
      })

      return filteredEvents;
    }


    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.title}>Events</Text>
            <Jumbotron
              title="Get Started"
              image="https://lasvegasnightclubs.com/wp-content/uploads/2018/06/27067569_10155555444533043_9174124228487188550_n-min-2.jpg"
              caption="View Events hosted by venues in your area and promote them within your network"/>

            <Text style={styles.subTitle}>Upcoming Events</Text>
            <Searchbar
              style={styles.searchInput}
              inputStyle={styles.inputText}
              placeholder="Search Events or Venues"
              value={query}
              iconColor="#1AA2B0"
              selectionColor="#1AA2B0"
              onChangeText={(val) => setQuery(val)}
            />
            <EventsFilterGrid price={price} setPrice={setPrice}
              category={category} setCategory={setCategory}
              date={date} setDate={setDate}
            />

            <FlatList
                style={styles.eventContainer}
                keyExtractor={event => event._id}
                data={events}
                renderItem={({ item }) => {
                  return (
                    <EventCard event={item} refreshEvents={fetchData} view="Promoter" />
                  )
                }}
            />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "white",
    },
    title: {
      marginTop: 100,
      left: 33,
      fontFamily: 'Gill Sans',
      fontSize: 36,
      fontWeight: '400',
      marginBottom: 20,
      color: '#2A2A2A',
    },
    subTitle: {
      fontSize: 24,
      fontFamily: 'Gill Sans',
      fontWeight: '400',
      color: '#2A2A2A',
      marginLeft: 33,
      marginTop: 30
    },
    eventContainer: {
      marginLeft: 35,
      marginBottom: 80
    },
    searchInput: {
      width: '84%',
      marginTop: 15,
      marginBottom: 10,
      top: 5,
      left: 33,
      elevation: 3,
      borderRadius: 25
    },
    inputText: {
      fontSize: 16
    },

})

export default PromoterEventListScreen;
