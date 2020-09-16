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
import { Searchbar } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'
import { getPromoters } from "../api/Promoters";

const RegisterGuestsModal = ({ modalVisible, setModalVisible, event }) => {
  const [query, setQuery] = useState("");
  const [promoters, setPromoters] = useState([]);

  useEffect(() => {
    const fetchedData = getPromoters();
    setPromoters(fetchedData);
  }, []);

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

              {query ?
                       <FlatList
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
              : <>

              </>}
              <Text style={styles.inputLabel}>Number in party</Text>
              <NumericInput
                  /* value={this.state.value}
                  onChange={value => this.setState({value})}
                  onLimitReached={(isMax,msg) => console.log(isMax,msg)} */
                  containerStyle={styles.numericInput}
                  totalWidth={220}
                  totalHeight={40}
                  iconSize={25}
                  minValue={1}
                  initValue={1}
                  step={1}
                  valueType='real'
                  rounded
                  textColor='#525252'
                  iconStyle={{ color: 'white' }}
                  borderColor='white'
                  rightButtonBackgroundColor='#126C75'
                  leftButtonBackgroundColor='#5ACBD6'
              />

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#1E9BA8" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
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
    marginTop: 240,
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 5
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
    marginTop: -10,
    fontWeight: '400'
  }


});

export default RegisterGuestsModal;
