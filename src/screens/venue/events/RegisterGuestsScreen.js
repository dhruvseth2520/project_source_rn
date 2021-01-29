import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'
import { getData } from "../../../utils/localStorage";
import { FAB, Chip, Avatar } from 'react-native-paper';
import env from '../../../utils/environment';
import { registerAttendance } from '../../../serverSDK/api/event';


const RegisterGuestsScreen = ({ route }) => {
  const event = route.params.event;
  const promoters = route.params.promoters;
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    setErrorMessage("");

    for (let i = 0; i < promoters.length; i++) {
      let promoter = promoters[i];
      let promoterName = promoter.firstName + " " + promoter.lastName[0] + ". (" + promoter.promoterCode + ")";
      if (promoterName.toLowerCase() === query.toLowerCase()) {
        getData('@venueFormData').then(response => {
          const attendance = {
            venueId: response._id,
            venueName: response.venueName,
            promoterId: promoter._id,
            promoterName,
            promoterAvatar: promoter.promoterProfile.images[0],
            eventId: event._id,
            eventName: event.eventName,
            eventDate: event.date,
            guestCount: count,
            amount: (event.serviceFees + event.promoterFees) * count
          }

          getData('@accessToken').then((response) => {
            registerAttendance(response, attendance).then(data => {
              if (data.status === "Success") {
                setCount(1);
                setQuery("");
              }
            })
          })
        })
        return null;
      }
    }
    setErrorMessage("Promoter " + `"${query}"` + " not found");

  }

  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={44} />
      </TouchableOpacity>
      <Text style={styles.title}>Register Guests for {event.eventName}</Text>
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Promoter Name</Text>
        <Text style={styles.inputCaption}>Ask guests for the name or code of the promoter that sourced them</Text>

        <Searchbar
          onChangeText={input => {
            setQuery(input);
          }}
          value={query}
          style={styles.promoterSearch}
          fontSize={14}
          selectionColor="#1AB0A8"
          iconColor="#1AB0A8"
          placeholder="Search Promoters">
        </Searchbar>

        {query ?
          <FlatList
              style={{ maxHeight: 120, marginTop: 5 }}
              data={promoters}
              keyExtractor={item => item.firstName}
              extraData={query}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const display = item.firstName + " " + item.lastName[0] + ". (" + item.promoterCode + ")";
                if (display.toLowerCase().startsWith(query.toLowerCase())) {
                  return (
                    <TouchableOpacity onPress={() => setQuery(display)} style={styles.listItem}>
                      <Chip avatar={<Avatar.Image size={24} source={{uri: item.promoterProfile.images[0]}} />} style={styles.promoterChip} textStyle={{fontFamily: 'Avenir', top: 1, fontSize: 14}}>{display}</Chip>
                    </TouchableOpacity>
                  )
                }
              }}>
          </FlatList>
          : <></>}

          <Text style={[styles.inputLabel, {marginTop: 15}]}>Party Size</Text>

          <NumericInput
            value={count}
            onChange={value => setCount(value)}
            containerStyle={styles.numericInput}
            totalWidth={310}
            totalHeight={50}
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

          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : <></>}


          <FAB
            style={styles.submitButton}
            label="Submit"
            color="white"
            icon="check"
            onPress={handleSubmit}
          />
        </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white'
  },
  backArrow: {
    top: 50,
    left: 10,
    zIndex: 1
  },
  title: {
    marginTop: 55,
    marginLeft: 40,
    width: '80%',
    fontFamily: 'Gill Sans',
    fontSize: 35,
    fontWeight: '400',
    color: '#343434',
  },
  formContainer: {
    width: '80%',
    marginLeft: 45,
    marginTop: 25
  },
  inputLabel: {
    fontFamily: 'Avenir',
    fontSize: 16
  },
  promoterSearch: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    elevation: 2,
    borderRadius: 24
  },
  inputCaption: {
    fontFamily: 'Avenir',
    marginTop: 10,
    color: 'gray'
  },
  listItem: {
    width: '100%',
    height: 45,
    marginBottom: 15,
    backgroundColor: '#F3F3F3',
    borderRadius: 30
  },
  promoterChip: {
    top: 6,
    width: '80%',
    left: 10,
    backgroundColor: '#F3F3F3'
  },
  numericInput: {
    marginTop: 15,
    width: '100%'
  },
  submitButton: {
    backgroundColor: '#1AB0A8',
    marginTop: 40,
    shadowOpacity: 0.1
  },
  error: {
    marginTop: 30,
    marginBottom: -20,
    fontFamily: "Avenir",
    color: '#DB0B0B'
  }
});


export default RegisterGuestsScreen;
