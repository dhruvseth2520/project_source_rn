import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { FontAwesome5 } from '@expo/vector-icons';


const DatePicker = ({ date, setDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  return (
      <>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <TouchableOpacity style={[styles.button, {paddingHorizontal: 23}]} onPress={() => setDatePickerVisibility(true)}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="calendar-alt" style={styles.btnIcon} />
              <Text style={styles.btnText}>{new Date(date).toDateString()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {marginLeft: 10}]} onPress={() => setTimePickerVisibility(true)}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="clock" style={[styles.btnIcon, {top: 1}]} />
              <Text style={styles.btnText}>{new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <DatePickerModal
            mode="single"
            visible={isDatePickerVisible}
            onDismiss={() => setDatePickerVisibility(false)}
            date={date}
            onConfirm={(val) => {
              const eventDate = val.date;
              eventDate.setHours(new Date(date).getHours());
              eventDate.setMinutes(new Date(date).getMinutes());
              setDate(eventDate);
              setDatePickerVisibility(false);
            }}
            saveLabel="Save" // optional
            label="Select date" // optional
            animationType="fade" // optional, default is 'slide' on ios/android and 'none' on web
            locale={'us'}
          />
          <TimePickerModal
              visible={isTimePickerVisible}
              onDismiss={() => setTimePickerVisibility(false)}
              hours={date.getHours()} // default: current hours
              minutes={date.getMinutes()} // default: current minutes
              label="Event Time"
              cancelLabel="Cancel" // optional, default: 'Cancel'
              confirmLabel="Ok" // optional, default: 'Ok'
              animationType="fade" // optional, default is 'none'
              onConfirm={({ hours, minutes }) => {
                const eventDate = new Date(date);
                eventDate.setHours(hours);
                eventDate.setMinutes(minutes);
                setDate(eventDate);
                setTimePickerVisibility(false);
              }}
              locale={'en'} // optional, default is automically detected by your system
            />
        </>
    )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ECECEC',
    borderRadius: 25,
    padding: 14
  },
  btnIcon: {
    fontSize: 15,
    color: '#4D4D4D'
  },
  btnText: {
    fontFamily: 'Avenir',
    marginLeft: 10,
    fontWeight: '500',
    color: '#4D4D4D'
  }
})

export default DatePicker;
