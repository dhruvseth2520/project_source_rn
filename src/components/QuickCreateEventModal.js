import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FAB } from 'react-native-paper';
import env from '../utils/environment';



const QuickCreateEventModal = ({ modalVisible, setModalVisible, event, refreshEvents }) => {
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    fetch(`${env.API_URL}/api/events`, {
      method: "PUT",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({venueId: event.venueId, eventId: event._id, date: date})
    }).then(response => response.json()).then(data => {
      if (data.status === "Success") {
        setModalVisible(false);
        refreshEvents();
      }
    })
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {
              setModalVisible(!modalVisible);
            }}>
              <FontAwesome5 name="times" style={{fontSize: 15, color: 'gray', alignSelf: 'center', top: 7}} />
            </TouchableOpacity>
            <Text style={styles.title}>Quick Create {event.eventName}</Text>
            <Text style={styles.modalText}>Loved {event.eventName}? So did everyone else. Select the date and time you would like to host {event.eventName} next</Text>

            <View style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 0, width: '100%'}}>
              <DateTimePicker
                style={styles.dateSelector}
                mode="datetime"
                value={date}
                onChange={(event, val) => setDate(val)}
                minimumDate={new Date()}
              />
            </View>

            <FAB
              style={styles.submitButton}
              label="Submit"
              color="white"
              icon="check"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </Modal>


    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: '70%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    left: 5,
    top: 15,
    width: 40,
    height: 40,
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    marginTop: 15,
    fontFamily: 'Avenir',
    fontSize: 18
  },
  modalText: {
    fontFamily: 'Avenir',
    marginTop: 5,
    alignSelf: 'flex-start',
    fontWeight: '300',
    color: '#2E2E2E'
  },
  submitButton: {
    marginTop: 25,
    left: 3,
    elevation: 2,
    backgroundColor: '#1AB0A8'
  },
  label: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    marginTop: 20,
    fontSize: 13
  },
  dateSelector: {
    height: 50,
    marginTop: 10
  }
})

export default QuickCreateEventModal;
