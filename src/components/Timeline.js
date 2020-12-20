import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Timeline = ({ data }) => {
  return (<View style={styles.container}>
    {data.map((item, index) => {
      const month = item.time.split(" ")[0];
      const day = item.time.split(" ")[1];
      const year = item.time.split(" ")[2];
      const isFinalElement = index === data.length - 1;
      return <View style={styles.element}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeMonth}>{month}</Text>
          <Text style={styles.timeDay}>{day}</Text>
          <Text style={styles.timeYear}>{year}</Text>
        </View>
        <View style={styles.markerContainer}>
          <FontAwesome name="circle-o" size={15} color={item.circleColor} style={styles.marker} />
          <View style={[styles.line, {borderColor: isFinalElement ? 'white' : 'gray'}]}></View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    })}
  </View>)
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginLeft: 20,
    marginBottom: 50
  },
  element: {
    padding: 15,
    flexDirection: 'row'
  },
  timeContainer: {
    width: '15%',
    alignItems: 'center',
    marginTop: 10,
  },
  timeMonth: {
    fontSize: 20,
    fontFamily: 'Avenir',
    fontWeight: '500',
    color: '#1AB0A8'
  },
  timeDay: {
    fontFamily: 'Avenir',
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center'
  },
  timeYear: {
    marginTop: 7,
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 12,
    color: 'gray',
    textAlign: 'center'
  },
  detailContainer: {
    padding: 15,
    marginLeft: 40,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.13,
    shadowRadius: 4.65,
    elevation: 6,
    width: '80%',
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontFamily: 'Avenir',
    fontWeight: '400',
    marginTop: 8
  },
  markerContainer: {
    marginTop: 15,
    left: 14,
    backgroundColor: 'white',
  },
  marker: {
    zIndex: 2
  },
  line: {
    borderWidth: 0.5,
    borderStyle: 'dotted',
    position: 'absolute',
    top: 11,
    width: 1,
    alignSelf: 'center',
    height: '200%'
  }
})
export default Timeline;
