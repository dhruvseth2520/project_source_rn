import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FAB, TextInput } from 'react-native-paper';
import { getData } from '../../../utils/localStorage';
import env from "../../../utils/environment";

const VenuePaymentDetailsScreen = ({ route }) => {
  const paymentMethod = route.params.method;

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={44} />
      </TouchableOpacity>
      {paymentMethod === "cash" ? (
        <VenueCashPickup balance={route.params.balance} />
      ) : (<></>)}
    </ScrollView>
  )
}


const VenueCashPickup = ({ balance }) => {
  const earliestPickupDate = new Date();
  earliestPickupDate.setDate(earliestPickupDate.getDate() + 1);
  earliestPickupDate.setHours(10);

  const [venue, setVenue] = useState({});
  const [pickupDate, setPickupDate] = useState(earliestPickupDate);
  const [pickupCode, setPickupCode] = useState(0);
  const [pickupAmount, setPickupAmount] = useState(balance);
  const [errorDate, setErrorDate] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);


  const handleSubmit = () => {
    if (pickupAmount < 10000) {
      setErrorAmount(true);
    } else {
      setErrorAmount(false);
      if (pickupDate.getHours() < 10 || pickupDate.getHours() > 21) {
        setErrorDate(true);
      } else {
        setErrorDate(false);
        const pickupDetails = {
          id: venue._id,
          name: venue.venueName,
          address: venue.venueAddress,
          email: venue.venueContactEmail,
          amount: pickupAmount,
          balance: balance,
          pickupDate,
          pickupCode
        }
        fetch(`${env.API_URL}/api/payments/cash/scheduled`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: JSON.stringify(pickupDetails)
        })
      }
    }
  }

  useEffect(() => {
    getData('@venueFormData').then(response => setVenue(response));
    setPickupCode(Math.floor(Math.random() * 10000));
  }, [])

  return (<>
    <Text style={styles.title}>Prefer to pay your bill in cash?</Text>
    <Text style={[styles.disclaimer, {fontSize: 22}]}>No problem. We've got you covered</Text>
    <Text style={[styles.disclaimer, {marginTop: 20}]}>Select a pickup slot and we'll send someone to collect your payment. We charge a flat 5000 MMK fee for all pickups</Text>
    <View style={[styles.container, {marginTop: 10}]}>
      <Text style={styles.label}>Pickup Address</Text>
      <View style={styles.addressContainer}>
        <Text style={{fontFamily: 'Avenir', fontWeight: '200'}}>{venue.venueAddress}</Text>
      </View>
    </View>


    <View style={styles.container}>
      <Text style={styles.label}>Pickup Slot</Text>
      {errorDate ?
        (<Text style={[styles.detail, {color: 'red'}]}>Please select a pickup slot between 11 am and 10 pm</Text>) :
        <></>
      }
      <DateTimePicker
        style={styles.dateSelector}
        mode="datetime"
        testID="dateTimePicker"
        minuteInterval={30}
        value={pickupDate}
        onChange={(event, val) => setPickupDate(val)}
        minimumDate={earliestPickupDate}
      />
    </View>

    <View style={styles.container}>
      <Text style={styles.label}>Pickup Amount</Text>
      {errorAmount ?
        (<Text style={[styles.detail, {color: 'red'}]}>A minimum pickup amount of 10000 MMK is required</Text>) :
        <Text style={styles.detail}>The amount of your pending balance you want collected</Text>
      }
      <View style={{flexDirection: 'row'}}>
        <TextInput mode="flat" keyboardType="numeric" onChangeText={(val) => setPickupAmount(val)} style={{backgroundColor: 'white', width: '30%'}} underlineColor="#19C2BD" value={pickupAmount + ""} theme={{colors: {primary: '#19C2BD'}}}></TextInput>
        <Text style={{fontFamily: 'Avenir', fontSize: 15, marginTop: 23, marginLeft: 10}}>MMK of {balance} MMK balance</Text>
      </View>
    </View>

    <View style={styles.container}>
      <Text style={styles.label}>Pickup Code</Text>
      <Text style={styles.detail}>Use this code to confirm that the representative picking up your payment is with Source. Please don't pay anyone with an incorrect code</Text>
      <Text style={styles.code}>{pickupCode}</Text>
    </View>

    <View style={[styles.container, {marginBottom: 60}]}>
      <FAB
        icon="check"
        label="Confirm"
        color="white"
        style={{backgroundColor: '#22C2D2'}}
        onPress={handleSubmit}
      />
    </View>
  </>)
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1
  },
  backArrow: {
    top: 50,
    left: 10,
    zIndex: 1
  },
  title: {
    marginTop: 50,
    marginLeft: 45,
    width: '80%',
    fontFamily: 'Futura',
    fontSize: 35,
    fontWeight: '400',
    marginBottom: 15,
    color: '#343434',
  },
  disclaimer: {
    fontFamily: 'Avenir',
    marginLeft: 48,
    fontWeight: '100',
    width: '75%'
  },
  container: {
    marginLeft: 40,
    padding: 10,
    marginBottom: 5,
    width: '81%'
  },
  label: {
    fontFamily: 'Gill Sans',
    fontSize: 18
  },
  detail: {
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: '100',
    marginTop: 7
  },
  addressContainer: {
    borderWidth: 1.2,
    marginTop: 15,
    borderRadius: 4,
    borderColor: '#22C2D2',
    padding: 15
  },
  dateSelector: {
    width: '100%',
    marginTop: 10
  },
  code: {
    alignSelf: 'center',
    fontFamily: 'Avenir',
    fontWeight: '400',
    marginTop: 20,
    marginLeft: 15,
    fontSize: 36
  }

})

export default VenuePaymentDetailsScreen;
