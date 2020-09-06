import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity } from 'react-native';

const VenueNewEventForm = () => {
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.title}>New Event</Text>
        <FontAwesome5 name="calendar-alt" style={styles.headerIcon} size={24} />

      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event Name</Text>
          <TextInput style={styles.input} autoCapitalize="words" placeholder="Eg. Wine Wednesday, Tequila Thursday, Game Day"/>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event Description</Text>
          <TextInput style={[styles.input, { marginTop: 10 }]} multiline={true} autoCapitalize="none"/>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Promotion</Text>
          <Text style={styles.comment}>A promotion for customers eg. Free shot on entry, Buy 1 bottle get 1 bottle free.
            This helps attract customers
          </Text>
          <TextInput style={styles.input} autoCapitalize="none" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Promoter Fees</Text>
          <Text style={styles.comment}>The per head fee promoters will get for promoting this event. This incentivizes promoters to share your event with their network</Text>
          <TextInput style={styles.input} autoCapitalize="words" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Email</Text>
          <TextInput style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput style={styles.input} keyboardType="phone-pad" autoCapitalize="none" />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} title="Submit">
         <Text style={styles.buttonText}>
           Agree & Continue
         </Text>
         <FontAwesome5 name="check" style={styles.check}/>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1
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
    marginBottom: 5
  },
  comment: {
    marginTop: 6,
    paddingRight: 30,
    fontSize: 12,
    color: '#424242',
  },
  headerIcon: {
    marginLeft: 10,
    marginTop: 28
  },
  submitButton: {
    height: 50,
    width: 340,
    backgroundColor: '#148995',
    borderColor: '#148995',
    borderWidth: 1,
    borderRadius: 1,
    marginTop: 15,
    alignSelf: 'center'
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
    marginTop: -19,
    marginLeft: 124,
    fontSize: 15
  }
})

export default VenueNewEventForm;
