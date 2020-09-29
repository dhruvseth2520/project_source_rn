import React, { useState, useEffect } from "react";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const BadgeModal = ({ promoter, modalVisible, setModalVisible }) => {
  const badge = promoter.badge;
  const description = badge.description;

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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Ionicons name="ios-close" style={{"fontSize": 24, "color": "gray", "alignSelf": "center"}}></Ionicons>
            </TouchableOpacity>


            <FontAwesome5 name={badge.iconName} style={{color: badge.color, fontSize: 30, marginTop: -35, marginBottom: 10}} />
            <Text style={styles.modalText}>{badge.description}</Text>

            {badge.badgeTitle === "Followers" ? (
              <View style={styles.iconRow}>
                <FontAwesome5 style={[styles.modalIcon, {color: '#3b5998'}]} name="facebook-f"></FontAwesome5>
                <FontAwesome5 style={[styles.modalIcon, {color: '#1DA1F2'}]} name="twitter"></FontAwesome5>
                <FontAwesome5 style={[styles.modalIcon, {color: '#FF0000'}]} name="youtube"></FontAwesome5>

              </View>
            ) : (
              <View style={styles.iconRow}>
                <FontAwesome5 style={[styles.modalIcon, {color: '#3B3B3B'}]} name="broadcast-tower"></FontAwesome5>
                <FontAwesome5 style={[styles.modalIcon, {color: '#aa835c'}]} name="glass-cheers"></FontAwesome5>
              </View>
          )}

          </View>
        </View>
      </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: 250,
    height: 160,
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
  modalText: {
    textAlign: "center",
    fontFamily: 'Avenir',
    fontWeight: '300',
    marginTop: 5
  },
  closeButton: {
    alignSelf: 'flex-start',
    width: 50,
    height: 30,
    bottom: 22,
    marginLeft: -36
  },
  iconRow: {
    marginTop: 10,
    flexDirection: 'row'
  },
  modalIcon: {
    fontSize: 18,
    marginRight: 10
  }
});

export default BadgeModal;
