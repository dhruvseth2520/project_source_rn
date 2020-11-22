import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'
import { getData } from "../utils/localStorage";
import { FAB } from 'react-native-paper';
import env from '../utils/environment';

const RegisterGuestsModal = ({ modalVisible, setModalVisible, event }) => {
  const [query, setQuery] = useState("");
  const [promoters, setPromoters] = useState([]);
  const [count, setCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(`${env.API_URL}/api/promoters`).then(response => response.json()).then(data => {
      setPromoters(data);
    })
  }, []);

  const handleSubmit = () => {
    setErrorMessage("");
    const difference = Math.floor((new Date(event.date) - new Date()) / 86400000);

    if (difference >= 1) {
      setErrorMessage("This event doesn't occur for another " + difference + " days");
    } else {
      for (let i = 0; i < promoters.length; i++) {
        let promoter = promoters[i];
        let promoterUser = promoter.firstName + " (" + promoter.promoterCode + ")";
        if (promoterUser.toLowerCase() === query.toLowerCase()) {
            getData('@venueFormData').then(response => {
              const attendance = {
                venueId: response._id,
                promoterId: promoter._id,
                promoterName: promoter.firstName + " (" + promoter.promoterCode + ")",
                promoterAvatar: promoter.promoterProfile.images[0],
                eventId: event._id,
                eventName: event.eventName,
                guestCount: count,
                amount: (event.serviceFees + event.promoterFees) * count
              }

              fetch(`${env.API_URL}/api/events/attendance`, {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(attendance)
              }).then(response => response.json()).then(data => {
                if (data.status === "Success") {
                  setQuery("");
                  setCount(1);
                  setModalVisible(!modalVisible);
                }
              })
            })
            return null;
        }
      }
      setErrorMessage("Promoter not found");
    }
  }

  return (
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
                setErrorMessage("");
                setQuery("");
                setCount(1);
                setModalVisible(!modalVisible);
              }}>
                <FontAwesome5 name="times" style={{fontSize: 15, color: 'gray', alignSelf: 'center', top: 7}} />
              </TouchableOpacity>
              <Text style={styles.title}>Register Guests for {event.eventName}</Text>
              <Searchbar
                onChangeText={input => {
                  setQuery(input);
                }}
                value={query}
                style={styles.promoterSearch}
                fontSize={15}
                selectionColor="#1AA2B0"
                iconColor="#1AA2B0"
                placeholder="Promoter Name">
              </Searchbar>

              {query ?  <FlatList
                           style={{maxHeight: 120}}
                           data={promoters}
                           keyExtractor={item => item.firstName}
                           extraData={query}
                           showsVerticalScrollIndicator={false}
                           renderItem={({ item }) => {
                             const display = item.firstName + " (" + item.promoterCode + ")";
                             if (display.toLowerCase().startsWith(query.toLowerCase())) {
                               return <TouchableOpacity onPress={() => setQuery(display)}>
                                 <View style={styles.listItem}>
                                   <Text style={{marginLeft: 10, top: 2}}>{display}</Text>
                                 </View>
                              </TouchableOpacity>
                             }
                           }}>
                        </FlatList>
              : <></>}

              <Text style={styles.inputLabel}>Number in party</Text>
              <NumericInput
                  value={count}
                  onChange={value => setCount(value)}
                  containerStyle={styles.numericInput}
                  totalWidth={220}
                  totalHeight={45}
                  minValue={1}
                  step={1}
                  valueType='real'
                  rounded
                  textColor='#525252'
                  iconStyle={{ color: 'white' }}
                  borderColor='white'
                  rightButtonBackgroundColor='#A4A4A4'
                  leftButtonBackgroundColor='#DBDBDB'
              />

              {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : <></>}

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
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    marginTop: 260,
    marginLeft: 60,
    width: 300,
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
  submitButton: {
    marginTop: 15,
    left: 3,
    elevation: 2,
    backgroundColor: '#22C2D2'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    marginTop: 18,
    fontFamily: 'Avenir',
    fontSize: 18
  },
  promoterSearch: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 15,
    width: '100%',
    elevation: 2,
    borderRadius: 24
  },
  listItem: {
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1,
    paddingBottom: 16,
    width: 220,
    marginTop: 10
  },
  numericInput: {
    marginTop: 52,
    marginBottom: 20
  },
  inputLabel: {
    fontFamily: 'Avenir',
    fontSize: 15,
    top: 40,
    left: 5,
    alignSelf: 'flex-start',
    marginTop: -20,
    fontWeight: '400'
  },
  error: {
    color: '#C90000',
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 12
  },
  closeButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    left: 5,
    top: 15,
    width: 40,
    height: 40,
  }
});

export default RegisterGuestsModal;
