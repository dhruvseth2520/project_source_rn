import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const VenueRegisterScreen = () => {
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const handleSubmit = () => {
    const form = {
      'venueName': venueName,
      'address': venueAddress,
      'contactName': contactName,
      'email': contactEmail,
      'phone': contactPhone
    };



  }


  return <View style={styles.background}>
    <Text style={styles.title}>Add your info</Text>


    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Venue Name</Text>
        <TextInput style={styles.input} value={venueName} onChange={(val) => setVenueName(val)} autoCapitalize="none" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Branch Address</Text>
        <Text style={styles.disclaimer}>Street address of this branch</Text>
        <TextInput style={styles.input} value={venueAddress} onChange={(val) => setVenueAddress(val)} autoCapitalize="none" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Primary Contact Name</Text>
        <Text style={styles.disclaimer}>The primary point of contact for your venue, either your General Manager or a Business representative</Text>
        <TextInput style={styles.input} value={contactName} onChange={(val) => setContactName(val)} autoCapitalize="none" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Email</Text>
        <TextInput style={styles.input} value={contactEmail} onChange={(val) => setContactEmail(val)} autoCapitalize="none" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput style={styles.input} value={contactPhone} onChange={(val) => setContactPhone(val)} autoCapitalize="none" />
      </View>




    </View>
    <TouchableOpacity style={styles.submitButton} title="Submit" onPress={handleSubmit}>
      <Text style={{alignSelf: 'center', 'marginTop': 11}}>Submit</Text>

    </TouchableOpacity>

  </View>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 30,
    marginTop: 50
  },
  label: {
    fontSize: 17,
    fontFamily: 'Gill Sans',
    color: '#424242',
    fontWeight: '400',
    marginBottom: 5
  },
  disclaimer: {
    marginTop: 6,
    fontSize: 12,
    color: '#424242',
  },

  background: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'gray',
    paddingLeft: 6,
    borderBottomWidth: 0.3,
    borderRadius: 3,
    height: 40,
    width: '90%'
  },
  submitButton: {
    height: 40,
    width: 140,
    borderColor: '#4D0C78',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 50,
    alignSelf: 'center'
  },
  form: {
    marginTop: 30,
    marginLeft: 30
  },
  inputContainer: {
    margin: 8
  }
})

export default VenueRegisterScreen;
