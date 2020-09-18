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
import { getPromoters } from "../api/Promoters";


const RegisterGuestsModal = ({ modalVisible, setModalVisible, event, guests, setGuests }) => {
  const [query, setQuery] = useState("");
  const [promoters, setPromoters] = useState([]);
  const [count, setCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const fetchedData = getPromoters();
    setPromoters(fetchedData);
  }, []);


  const handleSubmit = () => {
    setErrorMessage("");
    const currentDate = new Date();

    if (currentDate.getDate() < event.date.getDate()) {
      const difference = event.date.getDate() - currentDate.getDate();
      setErrorMessage("This event doesn't occur for another " + difference + " days");
    } else {
      for (let i = 0; i < promoters.length; i++) {
        let promoter = promoters[i];
        let promoterName = promoter.firstName;
        if (promoterName.toLowerCase() === query.toLowerCase()) {
            let guestsCopy = {...guests};
            if (promoterName in guestsCopy) {
              const newCount = guestsCopy[promoterName] + count;
              guestsCopy[promoterName] = newCount;
            } else {
              guestsCopy[promoterName] = count;
            }
            setGuests(guestsCopy);
            setQuery("");
            setCount(1);
            setModalVisible(!modalVisible);
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
                placeholder="Promoter Name">
              </Searchbar>


              {query ?  <FlatList
                           data={promoters}
                           keyExtractor={item => item.firstName}
                           extraData={query}
                           showsVerticalScrollIndicator={false}
                           renderItem={({ item }) => {
                             if (item.firstName.toLowerCase().startsWith(query.toLowerCase())) {
                               return <TouchableOpacity onPress={() => setQuery(item.firstName)}>
                                 <View style={styles.listItem}>
                                   <Text style={{marginLeft: 10}}>{item.firstName}</Text>
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
                  totalHeight={402}
                  iconSize={25}
                  minValue={1}
                  initValue={1}
                  step={1}
                  valueType='real'
                  rounded
                  textColor='#525252'
                  iconStyle={{ color: 'white' }}
                  borderColor='white'
                  rightButtonBackgroundColor='#5AACD6'
                  leftButtonBackgroundColor='#5ACBD6'
              />

              {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : <></>}

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#1AA2B0" }}
                onPress={handleSubmit}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableHighlight>
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
  openButton: {

    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    marginLeft: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    marginTop: 12,
    fontFamily: 'Avenir',
    fontSize: 18
  },
  promoterSearch: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 15
  },
  listItem: {
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1,
    paddingBottom: 12,
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
