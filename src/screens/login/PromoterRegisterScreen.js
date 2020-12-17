import React, { useState, useEffect } from 'react';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { View, Text, Image, StyleSheet, TextInput, Picker, TouchableOpacity, ScrollView,
KeyboardAvoidingView } from 'react-native';
import { storeData, getData } from '../../utils/localStorage';

const LoginPromoterRegisterScreen = ({ navigation }) => {
    const handleSubmit = () => {
      const formData = {
        firstName,
        lastName,
        age,
        contactEmail,
        contactPhone,
      }

      navigation.navigate('PromoterProfileSetup', {
        formData
      });
    }

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    return (
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
              <ScrollView style={styles.background}>
                  <TouchableOpacity onPress={() => navigation.navigate('VoP')}>
                    <Entypo style={styles.backButton} name="chevron-small-left" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={styles.header}>
                    <Text style={styles.title}>Personal Details</Text>
                    <FontAwesome5 style={styles.icon} size={30} name="id-card" />
                  </View>

                  <View style={styles.form}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>First Name</Text>
                      <TextInput style={styles.input} value={firstName} autoCapitalize="words" onChangeText={(val) => setFirstName(val)} />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Last Name</Text>
                      <Text style={styles.comment}>This should match the name on your government id</Text>
                      <TextInput style={styles.input} value={lastName} autoCapitalize="words" onChangeText={(val) => setLastName(val)} />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Age</Text>
                      <Text style={styles.comment}>Promoters must be 18+ to register</Text>
                      <TextInput style={styles.input} value={age} keyboardType="numeric" autoCapitalize="words" onChangeText={(val) => setAge(val)} />
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
    );
}

export default LoginPromoterRegisterScreen;

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
  icon: {
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
    paddingRight: 10
  },
  form: {
    marginTop: 30,
    marginLeft: 30
  },
  inputContainer: {
    margin: 8
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
    marginTop: 20,
    marginLeft: 5,
    width: '91%',
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
    backgroundColor: '#1AB0A8',
    borderColor: '#1AB0A8',
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
    marginBottom: 30,
    marginLeft: 17,
    fontSize: 13,
    color: '#DB0B0B'
  }
})
