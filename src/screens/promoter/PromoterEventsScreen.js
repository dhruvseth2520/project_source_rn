import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, Image, ScrollView, Text } from 'react-native';
import Jumbotron from '../../components/Jumbotron';
import { Searchbar } from 'react-native-paper';
import EventCard from "../../components/EventCard";
import { getData } from '../../utils/localStorage';
import { EventsFilterGrid } from "../../components/FilterGrid";
import env from '../../utils/environment';
import { getAllEvents } from '../../serverSDK/api/event'
import { getSavedEventList } from '../../serverSDK/api'

const PromoterEventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
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
    displayValue: 30,
    filterValue: 100
  });

  const clearFilters = () => {
    setPrice({
      active: false,
      displayValue: 0,
      filterValue: 0
    });
    setCategory({
      active: false,
      displayValue: [],
      filterValue: []
    });
    setDate({
      active: false,
      displayValue: 30,
      filterValue: 100
    });
  }

  const sortByDate = (arr) => {
    return arr.sort(function (a, b) {
      var keyA = new Date(a.date);
      var keyB = new Date(b.date);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  // NOTE: JWTd (done)
  const fetchData = async () => {

    const accessToken = await getData('@accessToken')
    const allEvents = await getAllEvents(accessToken)

    const upcomingEvents = [];
    const currentDate = new Date();

    allEvents.forEach(event => {
      const difference = (currentDate - new Date(event.date)) / 86400000;
      if (difference <= 0.5) {
        upcomingEvents.push(event);
      }
    })

    const sortedEvents = sortByDate(upcomingEvents);
    setEvents(sortedEvents);
    setEventData(sortedEvents);

    const temp = [];
    const allSavedEvents = await getSavedEventList(accessToken)

    allSavedEvents.forEach(savedEvent => {
      temp.push(savedEvent._id);
    })
    setSavedEvents(temp);

  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    setEvents(handleSearch());
  }, [query, price.filterValue, category.filterValue, date.filterValue])

  const handleSearch = () => {
    const filteredEvents = [];
    eventData.forEach(event => {
      const eventNameMatch = event.eventName.toLowerCase().trim().startsWith(query.toLowerCase().trim());
      const venueNameMatch = event.venueName.toLowerCase().trim().startsWith(query.toLowerCase().trim());
      const priceMatch = event.promoterFees >= price.filterValue;

      const currentDate = new Date();
      const difference = Math.round((new Date(event.date) - currentDate) / (86400000));
      const dateMatch = difference <= date.filterValue;

      let categoryMatch = true;
      if (category.filterValue.length) {
        const categories = category.filterValue.map(el => el.value);
        categoryMatch = categories.includes(event.category);
      }

      if ((eventNameMatch || venueNameMatch) && priceMatch && categoryMatch && dateMatch) {
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
        caption="View Events hosted by venues in your area and promote them within your network" />

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
        clearFilters={clearFilters}
      />

      <FlatList
        style={styles.eventContainer}
        keyExtractor={event => event._id}
        data={events}
        renderItem={({ item }) => (
          <EventCard event={item} isSaved={savedEvents.includes(item._id)} refreshEvents={fetchData} view="Promoter" />
        )}
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
    marginLeft: 33,
    fontFamily: 'Futura',
    fontSize: 35,
    fontWeight: '400',
    marginBottom: 20,
    color: '#343434',
  },
  subTitle: {
    fontSize: 27,
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
