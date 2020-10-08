import React, { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, SafeAreaView, Image, View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventCard from "../../components/EventCard";
import Header from "../../components/Header";
import env from "../../utils/environment";
import { getData } from "../../utils/localStorage";
import { FAB } from 'react-native-paper';


/*
<TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('VenueEventForm')}>
  <FontAwesome5 name="plus" style={{alignSelf: 'center', fontSize: 16, marginTop: 19, color: 'white'}} color="black" />
</TouchableOpacity>

*/


const VenueEventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const [isUpcoming, setUpcoming] = useState(true);
  const [isPast, setPast] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUpcoming(true);
      setPast(false);
      fetchData();
    });

    return unsubscribe;
  }, [])

  const fetchData = () => {
    getData('@venueFormData').then(response => {
      fetch(`${env.API_URL}/api/events/${response.venueId}`).then(response => response.json()).then(data => {
        const currentDate = new Date();
        let upcomingArr = [];
        let pastArr = [];
        data.forEach(event => {
          const difference = new Date(event.date).getDate() - currentDate.getDate();
          if (difference >= 0) {
            upcomingArr.push(event);
          } else {
            pastArr.push(event);
          }
        })
        setUpcoming(true);
        setPast(false);
        setUpcomingEvents(upcomingArr);

        setEvents(upcomingArr);
        setPastEvents(pastArr);
      })

    })


  }

  const handlePress = (btn) => {
    if (btn === 'Upcoming') {
      if (!isUpcoming) {
        setUpcoming(true);
        setPast(false);
        setEvents(upcomingEvents);
      }
    } else if (btn === 'Past') {
      if (!isPast) {
        setUpcoming(false);
        setPast(true);
        setEvents(pastEvents);
      }
    }

  }



  return (
    <ScrollView style={styles.background} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
      <Header title="Events" dashboard={upcomingEvents.length + " events happening soon"}/>
      <Image style={styles.heroImage} source={{uri: 'https://images.unsplash.com/photo-1558346489-19413928158b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'}} />
      <Text style={styles.description}>Create custom events with promotions for your target market and share them with our vast network of promoters and influencers</Text>
      <Text style={styles.subTitle}>Your Events</Text>

      <ScrollView style={styles.eventContainer}>

        {upcomingEvents.length === 0
          ? <Text style={{fontFamily: "Avenir", fontWeight: '300', marginTop: 5}}>You have no events to show yet. Add your first now!</Text>
          :
          <>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePress('Upcoming')}>
                  <Text style={isUpcoming ? styles.active : styles.btnText}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePress('Past')}>
                  <Text style={isPast ? styles.active : styles.btnText}>Past</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                  showsVerticalScrollIndicator={false}
                  data={events}
                  keyExtractor={event => event.eventName}
                  renderItem={({ item }) => {
                    // Only render events that are occuring today or in the future here
                    return <EventCard event={item} refreshEvents={fetchData} />
                  }}
                ></FlatList>
          </>
        }




      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Pressed')}
      />

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
    marginTop: 7,
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
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  btnText: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 15
  },
  tabButton: {
    marginRight: 10
  },
  active: {
    color: '#1AA2B0',
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 15
  },
  fab: {
    backgroundColor: '#1AA2B0',
    width: 56,
    height: 56,
    marginTop: 25,
    marginBottom: 60,
    right: 5,
    alignSelf: 'center'

  }


})

export default VenueEventsScreen;
