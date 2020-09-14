import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { Searchbar } from 'react-native-paper';


const RegisterGuestsModal = ({ modalVisible, setModalVisible, event }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(["Apples", "Oranges", "Bananas"])
  }, []);

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
            <Text style={styles.title}>Register Guests for {event.eventName}</Text>
            <Searchbar style={styles.promoterSearch} fontSize={15} placeholder="Promoter Name"></Searchbar>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#148995" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


    </View>
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
    marginTop: 300,
    marginLeft: 60,
    width: 300,
    height: 300,
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontFamily: 'Avenir',
    fontSize: 18
  },
  promoterSearch: {
    fontSize: 13,
    marginBottom: 20
  }


});

export default RegisterGuestsModal;
