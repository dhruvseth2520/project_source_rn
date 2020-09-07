import React, { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';


const VenueEventsScreen = ({ route }) => {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();
  const focused = useIsFocused();
  const formData = route.params.formData;

  console.log(formData);

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.title}>Events</Text>

      <Image style={styles.heroImage} source={{uri: 'https://images.unsplash.com/photo-1558346489-19413928158b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'}} />
      <Text style={styles.description}>Create custom events with promotions for your target market and share them with our vast network of promoters and influencers</Text>

      <Text style={styles.subTitle}>Your Events</Text>
      <View style={styles.eventContainer}>
        {events.length === 0
          ? <Text style={{fontFamily: "Avenir", fontWeight: '300'}}>You have no events to show yet. Add your first now!</Text>
          : <Text>{events[0].eventName}</Text>
        }
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('VenueEventForm')}>
          <FontAwesome5 name="plus" style={{alignSelf: 'center', fontSize: 16, marginTop: 19, color: 'white'}} color="black" />
        </TouchableOpacity>
      </View>
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
    marginTop: 8,
    marginLeft: 35
  },
  addBtn: {
    width: 54,
    height: 54,
    borderRadius: 54,
    backgroundColor: '#148995',
    marginTop: 20,
    marginLeft: 132
  }
})

export default VenueEventsScreen;
