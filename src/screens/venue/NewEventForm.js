import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, ScrollView, Text, StyleSheet, TextInput, Picker, TouchableOpacity,
KeyboardAvoidingView } from 'react-native';

const VenueNewEventForm = ({ route }) => {
  const navigation = useNavigation();

  let action = 'Create Event';
  let event = null;

  if (route.params) {
    action = route.params.action;
    event = route.params.event;
  }

  const [eventName, setEventName] = useState(event ? event.eventName : "");
  const [imageURL, setImageURL] = useState(event ? event.imageURL : "");
  const [description, setDescription] = useState(event ? event.description : "");
  const [promotion, setPromotion] = useState(event ? event.promotion : "");
  const [fees, setFees] = useState(event ? event.fees : "");
  const [date, setDate] = useState(event ? event.date : new Date());

  const handleSubmit = () => {
      const form = {
        eventName,
        description,
        imageURL,
        promotion,
        fees,
        date
      }

      navigation.navigate('VenueEventsHome', {
        action,
        formData: form
      })
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <ScrollView style={styles.background}>
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
                autoCapitalize="words" placeholder="Eg. Wine Wednesday, Tequila Thursday, Game Day"/>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event Description</Text>
              <TextInput
                onChangeText={(val) => setDescription(val)}
                value={description}
                style={styles.input} autoCapitalize="sentences"/>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event Image</Text>
              <Text style={styles.comment}>Banner or Poster for the event</Text>

              <TextInput style={styles.input}
                onChangeText={(val) => setImageURL(val)}
                value={imageURL}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event Date</Text>
              <Text style={styles.comment}>The date and time of the event</Text>
              <DateTimePicker
                style={styles.dateSelector}
                mode="datetime"
                testID="dateTimePicker"
                value={date}
                onChange={(event, val) => setDate(val)}
                minimumDate={new Date()}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Promotion</Text>
              <Text style={styles.comment}>A promotion for customers eg. Free shot on entry, Buy 1 bottle get 1 bottle free.
                This helps attract customers
              </Text>
              <TextInput
                onChangeText={(val) => setPromotion(val)}
                value={promotion}
                style={styles.input} autoCapitalize="sentences" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Promoter Fees</Text>
              <Text style={styles.comment}>The per head fee promoters will get for promoting this event. This incentivizes promoters to share your event with their network</Text>
              <View style={{flexDirection: 'row'}}>
                  <TextInput
                    onChangeText={(val) => setFees(val)}
                    value={fees}
                    style={[styles.input, { width: '60%'}]} autoCapitalize="none" keyboardType="numeric" />
                  <TextInput style={[styles.input, { width: '25%', marginLeft: 18}]} autoCapitalize="none" value="MMK" editable={false}/>
              </View>
            </View>

          </View>

          <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: '#DA0000', borderColor: '#DA0000' }]}
                title="Cancel"
                onPress={() => navigation.navigate('VenueEventsHome')}>
                 <Text style={styles.buttonText}>
                   Cancel
                 </Text>
                 <FontAwesome5 name="times" style={[styles.check, { marginLeft: 45}]}/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton} title="Submit" onPress={handleSubmit}>
                 <Text style={styles.buttonText}>
                   {action}
                 </Text>
                 <FontAwesome5 name="plus" style={styles.check}/>
              </TouchableOpacity>
          </View>

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
    marginLeft: 4,
    marginTop: 10,
    marginBottom: -5,
    width: '90%'
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
    margin: 8
  },
  selectInput: {
    width: 300,
    height: 200,
    marginTop: -45,
    marginLeft: 15
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
    marginTop: 10,
    marginBottom: 50
  },
  submitButton: {
    height: 50,
    width: 160,
    backgroundColor: '#148995',
    borderColor: '#148995',
    borderWidth: 1,
    borderRadius: 4,
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
  check: {
    color: 'white',
    alignSelf: 'center',
    marginTop: -18,
    marginLeft: 90,
    fontSize: 15
  }
})

export default VenueNewEventForm;
