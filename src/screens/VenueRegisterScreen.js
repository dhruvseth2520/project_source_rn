import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCocktail, faCheck } from '@fortawesome/free-solid-svg-icons'
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

    navigation.navigate('VenueHome');
  }

  return (
              <ScrollView style={styles.background}>
                  <TouchableOpacity onPress={() => navigation.navigate('VoP')}>
                    <Entypo style={styles.backButton} name="chevron-small-left" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={styles.header}>
                    <Text style={styles.title}>Venue Details</Text>
                    <FontAwesomeIcon style={styles.cocktailIcon} size={30} icon={ faCocktail } />
                  </View>
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
                    <Text style={styles.buttonText}>
                       Agree & Continue
                     </Text>
                     <FontAwesomeIcon icon={ faCheck } style={styles.check}/>
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
  header: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 33,
    marginTop: 20,

  },
  cocktailIcon: {
    marginLeft: 8,
    marginTop: 14
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
  backButton: {
    marginTop: 50,
    marginLeft: 10
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
    marginLeft: 125
  }
})

export default VenueRegisterScreen;
