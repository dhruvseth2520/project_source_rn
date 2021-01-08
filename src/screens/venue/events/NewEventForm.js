import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PulseIndicator, UIActivityIndicator } from 'react-native-indicators';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  View, Image, ScrollView, Text, StyleSheet, TextInput, Picker, TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import { getData } from '../../../utils/localStorage';
import * as ImagePicker from 'expo-image-picker';

import { FAB } from 'react-native-paper';
import { TextInput as Input } from 'react-native-paper';
import env from '../../../utils/environment';

import { createEvent, updateEvent } from '../../../serverSDK/api/event';

const VenueNewEventForm = ({ route }) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  let action = 'Create Event';
  let event = null;

  if (route.params) {
    action = route.params.action;
    event = route.params.event;
  }

  const [eventName, setEventName] = useState(event ? event.eventName : "");
  const [category, setCategory] = useState(event ? event.category : "Themed Event");
  const [image, setImage] = useState(event ? { uri: event.imageURL } : null);
  const [description, setDescription] = useState(event ? event.description : "");
  const [promotion, setPromotion] = useState(event ? event.promotion : "");
  const [condition, setCondition] = useState(event ? event.promotionCondition.condition : "None");
  const [conditionAmount, setConditionAmount] = useState(event ? event.promotionCondition.amount : "None");
  const [fees, setFees] = useState(event ? (event.promoterFees + event.serviceFees).toString() : "");
  const [date, setDate] = useState(event ? event.date : new Date());

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [6, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  // NOTE: JWTx (done)
  const handleSubmitX = async () => {
    setLoading(true);
    const venueData = await getData('@venueFormData')
    const eventForm = {
      venueId: venueData._id,
      venueName: venueData.venueName,
      eventName: eventName.trim(),
      category,
      description,
      promotionCondition: {
        condition,
        amount: conditionAmount
      },
      image,
      promotion,
      fees,
      date
    }

    const accessToken = await getData('@accessToken')
    var response = {}
    if (action === 'Create Event') {
      response = await createEvent(accessToken, eventForm)
    } else if (action === 'Update Event') {
      eventForm['eventId'] = event._id;
      response = await updateEvent(accessToken, eventForm)
    }

    if (response.status === "Success") {
      navigation.navigate('VenueEventsHome');
    }
  }

  // NOTE: deprecation JWTy
  const handleSubmit = () => {
    setLoading(true);
    getData('@venueFormData').then(response => {
      const eventForm = {
        venueId: response._id,
        venueName: response.venueName,
        eventName: eventName.trim(),
        category,
        description,
        promotionCondition: {
          condition,
          amount: conditionAmount
        },
        image,
        promotion,
        fees,
        date
      }

      let method = "";
      if (action === 'Create Event') {
        method = "POST";
      } else if (action === 'Update Event') {
        method = "PUT";
        eventForm['eventId'] = event._id;
      }

      fetch(`${env.API_URL}/api/events`, {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventForm)
      }).then(response => response.json()).then(data => {
        if (data.status === "Success") {
          navigation.navigate('VenueEventsHome');
        }
      })
    })
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.background}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{action === "Create Event" ? 'Please wait a moment while we finish publishing your event' : 'Please wait a moment while we finish updating your event'}</Text>
            <PulseIndicator size={36} color="#1AB0A8" style={{ top: 30 }}></PulseIndicator>
          </View>
        ) : (<>
          <View style={styles.header}>
            <Text style={styles.title}>New Event</Text>
            <FontAwesome5 name="calendar-alt" style={styles.headerIcon} size={24} />
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event Name</Text>

              <TextInput style={styles.input}
                onChangeText={(val) => setEventName(val)}
                value={eventName}
                autoCapitalize="words" placeholder="Eg. Wine Wednesday, Tequila Thursday, Game Day"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event Type</Text>
              <Picker
                selectedValue={category}
                mode="dropdown"
                onValueChange={(val) => setCategory(val)}
                style={styles.selectInput}>
                <Picker.Item label="Live Show" value="Live Show" />
                <Picker.Item label="Night Out" value="Night Out" />
                <Picker.Item label="Themed Event" value="Themed Event" />
                <Picker.Item label="Game Day" value="Game Day" />
                <Picker.Item label="Ladies Night" value="Ladies Night" />
                <Picker.Item label="Couples Event" value="Couples Event" />
                <Picker.Item label="Holiday Special" value="Holiday Special" />
              </Picker>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event Description</Text>
              <TextInput
                onChangeText={(val) => setDescription(val)}
                value={description}
                style={styles.input} autoCapitalize="sentences" />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event Date</Text>
              <Text style={styles.comment}>The date and time of the event</Text>
              <DateTimePicker
                style={styles.dateSelector}
                mode="datetime"
                value={new Date(date)}
                onChange={(event, val) => setDate(val)}
                minimumDate={new Date()}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event Image</Text>
              <Text style={styles.comment}>Banner or Poster for the event</Text>

              {image ? (
                <Image
                  source={{ uri: image.uri }}
                  style={styles.eventImage}
                />
              ) : (<></>)}

              <FAB
                icon="image"
                label="Upload Image"

                style={styles.cameraButton}
                onPress={pickImage}
              />
            </View>


            <View style={styles.inputContainer}>
              <Text style={styles.label}>Promotion (Optional)</Text>
              <Text style={styles.comment}>A promotion to attract customers eg. Free shot on entry, Buy 1 bottle get 1 bottle free</Text>
              <TextInput
                onChangeText={(val) => setPromotion(val)}
                value={promotion}
                style={styles.input} autoCapitalize="sentences" />
            </View>

            {promotion ? (<View style={styles.inputContainer}>
              <Text style={styles.label}>Promotion Condition</Text>
              <Text style={styles.comment}>Promotion only applies if this condition is met</Text>

              <View style={{ flexDirection: 'row' }}>
                <Picker
                  selectedValue={condition}
                  mode="dropdown"
                  onValueChange={(val) => {
                    setCondition(val);
                    setConditionAmount("");
                  }}
                  itemStyle={{ fontSize: 18 }}
                  style={[styles.selectInput, { marginTop: condition === 'None' ? -70 : -40, marginBottom: -30, width: condition === 'None' ? '95%' : '50%' }]}>
                  <Picker.Item label="None" value="None" />
                  <Picker.Item label="Amount Spent" value="Amount Spent" />
                  <Picker.Item label="Party Size" value="Party Size" />
                </Picker>
                {condition !== 'None' ? (
                  <>
                    <Text style={{ fontFamily: 'Avenir', fontSize: 15, marginTop: 49, width: '9%', marginLeft: 5 }}>is at least</Text>

                    <View style={{ width: condition === 'Amount Spent' ? '18%' : '11%', marginTop: 41, marginLeft: 12 }}>
                      <Input
                        theme={{ colors: { primary: '#19C2BD', underlineColor: 'transparent' } }}
                        placeholder={condition === "Amount Spent" ? "5000" : "4"}
                        value={conditionAmount}
                        onChangeText={(val) => setConditionAmount(val)}
                        keyboardType="numeric"
                        mode="outlined" style={styles.conditionInput}></Input>
                    </View>

                    <Text style={{ fontFamily: 'Avenir', fontSize: 15, marginTop: 60, marginLeft: 10 }}>{condition === "Amount Spent" ? "MMK" : "guests"}</Text>
                  </>
                ) : <></>}
              </View>

            </View>) : <></>}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Promoter Fees</Text>
              <Text style={styles.comment}>The per head fee promoters will get for bringing guests to your event. This incentivizes promoters to share your event with their network</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  onChangeText={(val) => setFees(val)}
                  value={fees}
                  style={[styles.input, { width: '60%', color: (action === 'Create Event' ? 'black' : '#727272') }]} autoCapitalize="none" keyboardType="numeric"
                  editable={action === 'Create Event' ? true : false}
                />
                <TextInput style={[styles.input, { width: '25%', marginLeft: 18 }]} autoCapitalize="none" value="MMK" editable={false} />
              </View>
              <Text style={[styles.comment, { marginTop: 15, color: 'gray' }]}>10% of this fee is a fixed charge for our services. The remaining 90% goes to the promoter</Text>
            </View>

          </View>

          <View style={styles.buttonContainer}>
            <FAB
              style={[styles.submitButton, { backgroundColor: '#DFDFDF', borderColor: '#DFDFDF' }]}
              label="Cancel"
              icon="cancel"
              onPress={() => navigation.navigate('VenueEventsHome')}
            />

            <FAB
              style={styles.submitButton}
              label="Submit"
              icon="check"
              color="white"
              onPress={handleSubmit}
            />
          </View>
        </>)}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1
  },
  dateSelector: {
    marginTop: 15,
    marginBottom: 5,
    width: '90%',
    height: 50
  },
  cameraButton: {
    width: '92%',
    marginTop: 20,
    marginBottom: 0,
    backgroundColor: '#DFDFDF',
    shadowOpacity: 0.06,
  },
  eventImage: {
    width: '90%',
    height: 200,
    left: 3,
    marginTop: 15,
    borderRadius: 5
  },
  header: {
    flexDirection: 'row',
    marginTop: 50
  },
  title: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 33,
    marginTop: 30,
  },
  form: {
    marginTop: 30,
    marginLeft: 30
  },
  inputContainer: {
    margin: 8,
    marginBottom: 20
  },
  selectInput: {
    width: '95%',
    height: 200,
    marginLeft: -10,
    marginTop: -30,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'gray',
    paddingLeft: 6,
    paddingTop: 8,
    borderBottomWidth: 0.3,
    height: 40,
    fontFamily: 'Avenir',
    fontWeight: '300',
    width: '90%'
  },
  longInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderBottomWidth: 0.3,
    height: 40,
    fontFamily: 'Avenir',
    fontWeight: '300',
    width: '90%',
    paddingLeft: 6,
    marginTop: 25
  },
  label: {
    fontSize: 17,
    fontFamily: 'Gill Sans',
    color: '#424242',
    fontWeight: '400',
    marginBottom: 4
  },
  comment: {
    marginTop: 4,
    paddingRight: 30,
    fontSize: 12,
    color: '#424242',
  },
  headerIcon: {
    marginLeft: 10,
    marginTop: 29
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 40,
    marginTop: 0,
    marginBottom: 50,
    width: '90%'
  },
  submitButton: {
    height: 50,
    width: '44%',
    shadowOpacity: 0.11,
    backgroundColor: '#1AB0A8',
    borderColor: '#1AB0A8',
    shadowOpacity: 0.1,
    borderWidth: 1,
    marginTop: 15,
    alignSelf: 'center',
    marginRight: 10
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 14,
    marginLeft: -20,
    color: 'white',
    fontWeight: '500'
  },
  conditionInput: {
    height: 40,
    backgroundColor: 'white'
  },
  check: {
    color: 'white',
    alignSelf: 'center',
    marginTop: -18,
    marginLeft: 90,
    fontSize: 15
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
  }
})

export default VenueNewEventForm;
