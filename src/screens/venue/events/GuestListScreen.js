import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Chip, Avatar } from 'react-native-paper';
import { getData } from "../../../utils/localStorage";
import env from '../../../utils/environment';
import { getAttendanceFromEventId } from "../../../serverSDK/api/event";
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GuestListScreen = ({ route }) => {
  const navigation = useNavigation();
  const event = route.params.event;
  const [guests, setGuests] = useState([]);

  const fetchData = async () => {
      let temp = [];
      const accessToken = await getData('@accessToken');
      const data = await getAttendanceFromEventId(accessToken, event._id);
      data.forEach(rec => {
        if (new Date(rec.eventDate).getTime() === new Date(event.date).getTime()) {
          temp.push(rec);
        }
      })
      setGuests(temp);
  }

  const navigateProfile = (promoterId) => {
    fetch(`${env.API_URL}/api/promoter/detail/${promoterId}`).then(response => response.json()).then(data => {
      navigation.navigate('PromoterProfile', {
        promoter: data
      })
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={44} />
      </TouchableOpacity>
      <Text style={styles.title}>Guest List for {event.eventName}</Text>
      <Text style={styles.label}>{new Date(event.date).toDateString()}</Text>

      <View style={styles.eventCard}>

        <View>
          {guests.length !== 0 ? (
            <>
              <View style={{flexDirection: 'row', marginTop: 0}}>
                <Text style={[styles.subheader, {width: '28%', left: 5}]}>Promoter</Text>
                <Text style={[styles.subheader, {width: '33%', left: 22}]}>Guest Count</Text>
                <Text style={[styles.subheader, {width: '33%', left: 16}]}>Payable (MMK)</Text>
              </View>
              {guests.map(record => (
                <View key={record._id} style={[styles.tableRow, {backgroundColor: '#f3f3f3'}]}>
                  <Chip onPress={() => navigateProfile(record.promoterId)} avatar={<Avatar.Image size={24} source={{uri: record.promoterAvatar}} />} style={styles.promoterIcon} textStyle={{fontFamily: 'Avenir', top: 1, fontSize: 13}}>{record.promoterName.split(" ")[0]}</Chip>
                  <Text style={styles.tableCell}>{record.guestCount}</Text>
                  <Text style={styles.tableCell}>{record.recievable}</Text>
                </View>
              ))}
              <View style={[styles.tableRow, {paddingVertical: 11}]}>
                <Text style={[styles.tableCell, {top: 0, left: 0, marginLeft: 10, fontWeight: '500', width: '33%'}]}>Total</Text>
                <Text style={[styles.tableCell, {top: 0, left: 1, width: '33%', fontWeight: '500'}]}>{guests.reduce((acc, curr) => acc + curr.guestCount, 0)}</Text>
                <Text style={[styles.tableCell, {top: 0, fontWeight: '500'}]}>{guests.reduce((acc, curr) => acc + curr.recievable, 0)}</Text>
              </View>

            </>
          ) : (
            <>
              <Text style={{fontFamily: 'Avenir', fontWeight: '300'}}>No guests registered yet for {event.eventName}</Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: 'white'
  },
  backArrow: {
    top: 50,
    left: 10,
    zIndex: 1
  },
  title: {
    marginTop: 55,
    marginLeft: 40,
    width: '80%',
    fontFamily: 'Gill Sans',
    fontSize: 35,
    fontWeight: '400',
    color: '#343434',
  },
  eventCard: {
    width: '80%',
    marginLeft: 45,
    marginBottom: 90,
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 18,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.5,
    elevation: 5,
  },
  subheader: {
    fontFamily: 'Avenir',
    fontWeight: '400'
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderRadius: 18,
    paddingVertical: 3,
    width: '98%',
    marginTop: 10,
    padding: 5,
    marginBottom: 3,
  },
  tableCell: {
    width: '33%',
    top: 9,
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '300'
  },
  promoterIcon: {
    width: '33%',
    marginLeft: 10,
    left: -10,
    backgroundColor: '#F3F3F3'
  },
  label: {
    fontFamily: 'Avenir',
    marginLeft: 45,
    color: 'gray',
    marginTop: 15
  }
})

export default GuestListScreen;
