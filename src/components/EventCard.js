import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


const EventCard = ({ event }) => {

  return (
    <View style={styles.card}>
      <Image style={styles.eventImage} source={{uri: event.imageURL}}></Image>
      <View style={styles.cardContent}>
          <View style={styles.leftCol}>
            <Text style={styles.eventName}>{event.eventName}</Text>
            <Text style={styles.eventDate}>{event.date.toDateString() + " " + event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>

            <View style={styles.btnContainer}>
                <TouchableOpacity>
                  <View style={[styles.circularBtn, {borderColor: '#148995'}]}>
                    <FontAwesome5 name="pen" style={{alignSelf: 'center', marginTop: 11, color: '#148995'}}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={[styles.circularBtn, {borderColor: '#DA0000'}]}>
                    <FontAwesome5 name="trash" style={{alignSelf: 'center', marginTop: 11, color: '#DA0000'}}/>
                  </View>
                </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.eventPromotion}>{event.promotion}</Text>
            <Text style={styles.eventFees}>{event.fees + " MMK / promoter"}</Text>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    width: 350,
    marginBottom: 20
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  leftCol: {
    marginTop: 8
  },
  rightCol: {
    marginTop: 12
  },
  eventImage: {
    width: 350,
    height: 190
  },
  eventName: {
    fontFamily: 'Avenir',
    fontSize: 19,
    fontWeight: '300',
    alignSelf: 'flex-start'
  },
  eventDate: {
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '300',
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  eventFees: {
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: '300',
    alignSelf: 'flex-end',
  },
  eventPromotion: {
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: '300',
  },
  btnContainer: {
    flexDirection: 'row',
    marginBottom: 13
  },
  circularBtn: {
    borderWidth: 0.5,
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 10
  }
})

export default EventCard;
