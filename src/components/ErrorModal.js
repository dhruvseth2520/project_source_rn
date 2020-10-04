import React from "react";
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
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';


const ErrorModal = ({ modalVisible, setModalVisible, errorMessage }) => {
    const navigation = useNavigation();

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
              <TouchableOpacity style={styles.close} onPress={() => setModalVisible(!modalVisible)}>
                <FontAwesome5 name="times" style={{color: 'gray', alignSelf: 'center', fontSize: 15, top: 8}} />
              </TouchableOpacity>
              <Text style={styles.title}>We're Sorry</Text>
              <Text style={styles.message}>{errorMessage}</Text>
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
    marginTop: 20,
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
    width: 240
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontFamily: 'Avenir',
    fontSize: 18
  },
  close: {
    position: 'absolute',
    alignSelf: 'flex-start',
    top: 10,
    left: 10,
    width: 35,
    height: 35
  },
  message: {
    fontFamily: 'Avenir',
    fontWeight: '300'
  }
});

export default ErrorModal;
