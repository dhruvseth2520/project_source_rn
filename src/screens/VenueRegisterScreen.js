import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Picker, TouchableOpacity, ScrollView } from 'react-native';

const VenueRegisterScreen = ({ navigation }) => {
  const [venueName, setVenueName] = useState("");
  const [category, setCategory] = useState("bar");
  const [venueAddress, setVenueAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const handleSubmit = () => {
    const formData = {
        venueName,
        category,
        venueAddress,
        contactName,
        contactEmail,
        contactPhone
    };

    
    console.log(formData);
  }

  return (
          <ScrollView style={styles.background}>
              <Text style={styles.title}>Venue Details</Text>
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Branch Name</Text>
                  <TextInput style={styles.input} value={venueName} onChangeText={(val) => setVenueName(val)} autoCapitalize="none" />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Category</Text>
                  <Text style={styles.comment}>Type of establishment</Text>
                  <Picker
                    selectedValue={category}
                    mode="dialog"
                    onValueChange={(val) => setCategory(val)}
                    style={styles.selectInput}>
                    <Picker.Item label="Bar" value="bar" />
                    <Picker.Item label="Restaurant" value="restaurant" />
                    <Picker.Item label="Club" value="club" />
                  </Picker>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Branch Address</Text>
                  <Text style={styles.comment}>Street address of this branch</Text>
                  <TextInput style={styles.input} value={venueAddress} onChangeText={(val) => setVenueAddress(val)} autoCapitalize="none" />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Primary Contact Name</Text>
                  <Text style={styles.comment}>The primary point of contact for your venue, either your General Manager or a Business representative</Text>
                  <TextInput style={styles.input} value={contactName} onChangeText={(val) => setContactName(val)} autoCapitalize="none" />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Contact Email</Text>
                  <TextInput style={styles.input} value={contactEmail} onChangeText={(val) => setContactEmail(val)} autoCapitalize="none" />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Contact Number</Text>
                  <TextInput style={styles.input} value={contactPhone} onChangeText={(val) => setContactPhone(val)} autoCapitalize="none" />
                </View>
              </View>
              <Text style={styles.disclaimer}>By pressing Continue, you agree to our Terms of Service, Privacy Policy and Payment Policy</Text>
              <TouchableOpacity style={styles.submitButton} title="Submit" onPress={handleSubmit}>
                <Text style={{fontSize: 15, alignSelf: 'center', 'marginTop': 15, color: 'white', fontWeight: '500'}}>Agree & Continue</Text>
              </TouchableOpacity>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 30,
    marginTop: 100
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
    fontSize: 12,
    color: '#424242',
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
    borderBottomWidth: 0.3,
    borderRadius: 3,
    height: 40,
    width: '90%'
  },
  disclaimer: {
    alignSelf: 'center',
    paddingHorizontal: 22,
    marginTop: 30,
    fontSize: 12,
    color: '#424242'
  },
  submitButton: {
    height: 50,
    width: 340,
    borderColor: '#30154F',
    backgroundColor: '#30154F',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 20,
    marginBottom: 100,
    alignSelf: 'center'
  }
})

export default VenueRegisterScreen;
