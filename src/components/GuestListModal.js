import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  View
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';



const GuestListModal = ({ modalVisible, setModalVisible, guests, event }) => {

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
              <Text style={styles.title}>Guest List for {event.eventName}</Text>

                <View style={styles.tableHeader}>
                  <View style={{width: '50%'}}>
                    <Text style={styles.tableHeaderText}>Promoter</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={styles.tableHeaderText}>Guest Count</Text>
                  </View>
                </View>

                <View style={styles.tableContent}>
                  <FlatList
                    data={Object.keys(guests)}
                    keyExtractor={guest => guest}
                    renderItem={({ item }) => (
                        <>
                          <View style={styles.row}>
                            <View style={styles.col}>
                              <Text style={styles.tableData}>{item}</Text>
                            </View>
                            <View style={styles.col}>
                              <Text style={styles.tableData}>{guests[item]}</Text>
                            </View>
                          </View>
                        </>

                    )}
                    >
                  </FlatList>

                </View>





              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>


      </View>
    );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop: 60,
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
    elevation: 5,
    width: 300
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
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    marginTop: 4,
    fontFamily: 'Avenir',
    fontSize: 18
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    marginTop: 5,
    marginBottom: 5,
    padding: 10
  },
  tableContent: {
    height: 140
  },
  tableHeaderText: {
    fontSize: 15,
    fontFamily: 'Avenir',
    fontWeight: '500'
  },
  col: {
    width: '50%'
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    marginTop: 5
  },
  tableData: {
    fontFamily: 'Avenir',
    fontWeight: '300'
  }
});

export default GuestListModal;
