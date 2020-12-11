import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCocktail, faCheck } from '@fortawesome/free-solid-svg-icons'
import { View, Text, Image, StyleSheet, TextInput, Picker, TouchableOpacity, ScrollView,
KeyboardAvoidingView } from 'react-native';
import { storeData, getData } from '../../utils/localStorage';
import env from "../../utils/environment";

const LoginVenueRegisterScreen = ({ navigation }) => {
  const [venueName, setVenueName] = useState("");
  const [category, setCategory] = useState("bar");
  const [venueAddress, setVenueAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    const formData = {
        venueName,
        venueCategory: category,
        venueAddress,
        venueContactName: contactName,
        venueContactEmail: contactEmail,
        venueContactPhone: contactPhone
    };

    for (let key in formData) {
      if (!formData[key]) {
        setErrorMessage("Please fill in all fields");
        return;
      }
    }

    if (!contactEmail.includes('@') || !contactEmail.includes('.')) {
      setErrorMessage("Please input a valid email");
      return;
    }

    if (contactPhone.length < 8) {
      setErrorMessage("Please input a valid phone number");
      return;
    }

    getData('@userId').then(response => {
      const venueData = {...formData, venueId: response};
      fetch(`${env.API_URL}/api/register/venue`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(venueData)
      }).then(response => response.json()).then(data => {
        if (data.status === "Success") {
          setErrorMessage("");
          storeData('@venueFormData', data.venue).then(() => {
            navigation.navigate('VenueTab');
          });
        }
      })
    });


  }

  return (
              <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
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
                          <TextInput style={styles.input} value={venueName} autoCapitalize="words" onChangeText={(val) => setVenueName(val)} />
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
                          <Text style={styles.comment}>Street address of branch</Text>
                          <TextInput style={styles.input} value={venueAddress} onChangeText={(val) => setVenueAddress(val)} autoCapitalize="none" />
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Primary Contact Name</Text>
                          <Text style={styles.comment}>The primary point of contact for your venue, either your General Manager or a Business representative</Text>
                          <TextInput style={styles.input} value={contactName} onChangeText={(val) => setContactName(val)} autoCapitalize="words" />
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Contact Email</Text>
                          <TextInput style={styles.input} keyboardType="email-address" value={contactEmail} onChangeText={(val) => setContactEmail(val)} autoCapitalize="none" />
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Contact Number</Text>
                          <TextInput style={styles.input} value={contactPhone} keyboardType="phone-pad" onChangeText={(val) => setContactPhone(val)} autoCapitalize="none" />
                        </View>
                      </View>

                      <Text style={styles.disclaimer}>By pressing Continue, you agree to our Terms of Service, Privacy Policy and Payment Policy</Text>
                      <TouchableOpacity style={styles.submitButton} title="Submit" onPress={handleSubmit}>
                         <Text style={styles.buttonText}>
                           Agree & Continue
                         </Text>
                         <FontAwesomeIcon icon={ faCheck } style={styles.check}/>
                      </TouchableOpacity>
                      <Text style={styles.error}>{errorMessage}</Text>
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
    width: '80%',
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
  disclaimer: {
    alignSelf: 'center',
    paddingHorizontal: 22,
    width: '91%',
    marginTop: 25,
    marginLeft: 5,
    fontSize: 12,
    color: '#424242'
  },
  backButton: {
    marginTop: 50,
    marginLeft: 10
  },
  submitButton: {
    height: 50,
    width: '80%',
    backgroundColor: '#22D2D1',
    borderColor: '#22D2D1',
    borderWidth: 1,
    borderRadius: 1,
    marginTop: 20,
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
    marginLeft: 140
  },
  error: {
    paddingHorizontal: 22,
    marginTop: 15,
    fontWeight: '400',
    marginBottom: 50,
    marginLeft: 17,
    fontSize: 13,
    color: '#DB0B0B'
  }
})

export default LoginVenueRegisterScreen;
