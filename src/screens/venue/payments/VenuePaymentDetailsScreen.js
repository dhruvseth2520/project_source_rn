import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Image, ScrollView, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { FAB, TextInput } from 'react-native-paper';
import { getData } from '../../../utils/localStorage';
import env from "../../../utils/environment";

const VenuePaymentDetailsScreen = ({ route }) => {
  const paymentMethod = route.params.method;
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  return (
    <ScrollView style={styles.background}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Please wait a moment while we finish scheduling your pickup</Text>
          <ActivityIndicator size="large" color="#1AA2B0" style={{top: 30}}></ActivityIndicator>
        </View>) : (
          <>
            <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
              <Entypo name="chevron-small-left" size={44} />
            </TouchableOpacity>
            {paymentMethod === "cash" ? (
              <VenueCashPickup balance={route.params.balance} isLoading={isLoading} setLoading={setLoading} />
            ) : (<>
              {paymentMethod === "wire transfer" ? (
                <VenueWireTransfer balance={route.params.balance} isLoading={isLoading} setLoading={setLoading} />
              ) : (
                <></>
              )}
            </>)}
          </>
      )}
    </ScrollView>
  )
}

const VenueWireTransfer = ({ balance, isLoading, setLoading }) => {
  const navigation = useNavigation();
  const initialState = {"KBZ": false, "AYA": false, "CB": false, "Yoma": false};
  const bankDetails = {
                        "KBZ": {"name": "KBZ Bank", "image": "https://www.fintechfutures.com/files/2018/12/kbz-bank-Cropped.png", "bankAccountNumber": "0084-1001-0000-6588", "branch": "Ahlone"},
                        "CB": {"name": "CB Bank", "image": "https://yt3.ggpht.com/a/AATXAJxM0r4YPsMbnVk7iNNWmZFvSgCCtgJE9uMsWTmsSw=s900-c-k-c0x00ffffff-no-rj", "bankAccountNumber": "0084-1001-0000-6588", "branch": "Ahlone"},
                        "Yoma": {"name": "Yoma Bank", "image": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Yoma_Bank_Logo.svg/1200px-Yoma_Bank_Logo.svg.png", "bankAccountNumber": "0084-1001-0000-6588", "branch": "Ahlone"},
                        "AYA": {"name": "AYA Bank", "image": "https://pbs.twimg.com/profile_images/1763695111/mlogo_400x400.jpg", "bankAccountNumber": "0084-1001-0000-6588", "branch": "Ahlone"}
                      };
  const [activeButtons, setActiveButtons] = useState(initialState);

  return (<ScrollView>
    <Text style={[styles.title, {fontFamily: 'Avenir', fontSize: 22, marginLeft: 49}]}>Select your bank to proceed</Text>
    <View style={styles.grid}>
      <View style={{flexDirection: 'row', marginBottom: 25}}>
          <TouchableOpacity style={activeButtons["KBZ"] ? [styles.tile, styles.active] : styles.tile} onPress={() => setActiveButtons({...initialState, "KBZ": !activeButtons["KBZ"]})}>
              <Image source={{uri: bankDetails["KBZ"].image}} style={styles.icon} />
              <Text style={styles.tileLabel}>KBZ Bank</Text>
          </TouchableOpacity>
          <TouchableOpacity style={activeButtons["CB"] ? [styles.tile, styles.active] : styles.tile} onPress={() => setActiveButtons({...initialState, "CB": !activeButtons["CB"]})}>
              <Image source={{uri: bankDetails["CB"].image}} style={styles.icon} />
              <Text style={styles.tileLabel}>CB Bank</Text>
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
          <TouchableOpacity style={activeButtons["Yoma"] ? [styles.tile, styles.active] : styles.tile} onPress={() => setActiveButtons({...initialState, "Yoma": !activeButtons["Yoma"]})}>
              <Image source={{uri: bankDetails["Yoma"].image}} style={styles.icon} />
              <Text style={styles.tileLabel}>Yoma Bank</Text>
          </TouchableOpacity>
          <TouchableOpacity style={activeButtons["AYA"] ? [styles.tile, styles.active] : styles.tile} onPress={() => setActiveButtons({...initialState, "AYA": !activeButtons["AYA"]})}>
              <Image source={{uri: bankDetails["AYA"].image}} style={styles.icon} />
              <Text style={styles.tileLabel}>AYA Bank</Text>
          </TouchableOpacity>
      </View>
    </View>

    {Object.values(activeButtons).every(el => el === false) ? (
      <></>
    ) : (
      <FAB
        label="Proceed"
        icon="arrow-right"
        onPress={() => navigation.navigate("VenueBankAccountDetails", {balance: balance, bank: bankDetails[Object.keys(activeButtons).find(btn => activeButtons[btn] === true)]})}
        style={styles.proceedButton}
        color="white"
      />
    )}

  </ScrollView>)
}

/*
<DateTimePicker
  style={styles.dateSelector}
  mode="datetime"
  display="spinner"
  minuteInterval={30}
  value={pickupDate}
  onChange={(event, val) => setPickupDate(val)}
  minimumDate={earliestPickupDate}
/> 

*/


const VenueCashPickup = ({ balance, isLoading, setLoading }) => {
  const navigation = useNavigation();

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
        setLoading(true);
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
        }).then(response => response.json()).then(data => {
          if (data.status === "Success") {
            setLoading(false);
            navigation.navigate("VenuePaymentReceipt", {
              title: "Thank you, your pickup is confirmed",
              detail: `Your payment will be collected from ${venue.venueName} on ${pickupDate.toLocaleDateString()} at ${pickupDate.toLocaleTimeString()}`,
              receipt: [{label: "Amount", amount: pickupAmount + " MMK"}, {label: "Pickup fee", amount: "1500 MMK"}, {label: "Total", amount: `${parseInt(pickupAmount) + 1500} MMK`}]
            });
          }
        })
      }
    }
  }

  useEffect(() => {
    getData('@venueFormData').then(response => setVenue(response));
    setPickupCode(Math.floor(Math.random() * 10000));
  }, [])

  return (
            <>
                <Text style={styles.title}>Prefer to pay your bill in cash?</Text>
                <Text style={[styles.disclaimer, {fontSize: 20}]}>No problem. We've got you covered</Text>
                <Text style={[styles.disclaimer, {marginTop: 20, width: '80%'}]}>Select a pickup slot and we'll send someone to collect your payment. We charge a flat 1500 MMK fee for all pickups</Text>

                <View style={[styles.container, {marginTop: 15}]}>
                  <Text style={styles.label}>Pickup Slot</Text>
                  {errorDate ?
                    (<Text style={[styles.detail, {color: 'red'}]}>Please select a pickup slot between 11 am and 10 pm</Text>) :
                    <></>
                  }

                </View>

                <View style={styles.container}>
                  <Text style={styles.label}>Pickup Amount</Text>
                  {errorAmount ?
                    <Text style={[styles.detail, {color: 'red'}]}>A minimum pickup amount of 10000 MMK is required</Text> :
                    <Text style={styles.detail}>The amount of your pending balance you want collected</Text>
                  }
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <TextInput mode="outlined" keyboardType="numeric" onChangeText={(val) => setPickupAmount(val)} style={{backgroundColor: 'white', width: '25%', height: 45}} underlineColor="#19C2BD" value={pickupAmount + ""} theme={{colors: {primary: '#19C2BD', placeholder: '#E2E2E2'}}}></TextInput>
                    <Text style={{fontFamily: 'Avenir', fontSize: 15, marginTop: 21, marginLeft: 15}}>MMK of {balance} MMK balance</Text>
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
                    style={{backgroundColor: '#22D2C9'}}
                    onPress={handleSubmit}
                  />
                </View>
            </>
      )
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
    marginTop: 55,
    marginLeft: 45,
    width: '80%',
    fontFamily: 'Gill Sans',
    fontSize: 35,
    fontWeight: '400',
    marginBottom: 15,
    color: '#343434',
  },
  disclaimer: {
    fontFamily: 'Avenir',
    marginLeft: 48,
    fontWeight: '100',
    width: '90%'
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
    borderColor: '#22D2C9',
    padding: 15
  },
  dateSelector: {
    width: '100%',
    marginTop: 15,
    height: 50
  },
  code: {
    alignSelf: 'center',
    fontFamily: 'Avenir',
    fontWeight: '400',
    marginTop: 20,
    marginLeft: 15,
    fontSize: 36
  },
  loadingContainer: {
    marginTop: 320,
    alignSelf: 'center'
  },
  loadingText: {
    fontSize: 24,
    textAlign: 'center',
    width: 300,
    fontFamily: 'Avenir',
    fontWeight: '400'
  },
  grid: {
    marginLeft: 49,
    marginTop: 10,
    width: '78%'
  },
  tile: {
    width: '47%',
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 13,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 36,
    height: 36
  },
  tileLabel: {
    fontFamily: 'Avenir',
    fontSize: 17,
    marginTop: 8,
    marginLeft: 10
  },
  active: {
    borderWidth: 1,
    borderColor: "#25D3A1"
  },
  proceedButton: {
    width: '80%',
    backgroundColor: "#22D2C9",
    marginTop: 20,
    marginLeft: 45,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
    	width: 0,
    	height: 4,
    },
  }

})

export default VenuePaymentDetailsScreen;
