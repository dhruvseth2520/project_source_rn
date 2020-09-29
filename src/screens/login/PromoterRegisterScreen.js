import React, { useState, useEffect } from 'react';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { View, Text, Image, StyleSheet, TextInput, Picker, TouchableOpacity, ScrollView,
KeyboardAvoidingView } from 'react-native';
import { storeData, getData } from '../../utils/localStorage';

const LoginPromoterRegisterScreen = ({ navigation }) => {


    /* const handlerRegister = () => {
        navigation.reset({
            routes: [{ name: 'PromoterTab' }]
        })
    } */

    const handleSubmit = () => {
      const formData = {
        firstName,
        lastName,
        age,
        contactEmail,
        contactPhone,
      }

      /* getData('@userId').then(response => {
        fetch(`http://192.168.1.202:3000/api/register/promoter/${response}`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
      }) */

      storeData('@promoterFormData', formData).then(() => {
        navigation.navigate('PromoterProfileSetup', {
          formData
        });
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
                      <TextInput style={styles.input} value={lastName} autoCapitalize="words" onChangeText={(val) => setLastName(val)} />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Age</Text>
                      <Text style={styles.comment}>Please upload a picture of a identification card or official government document so we can verify your age. All promoters must be 18+</Text>
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
  disclaimer: {
    alignSelf: 'center',
    paddingHorizontal: 22,
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
    width: 340,
    backgroundColor: '#1AA2B0',
    borderColor: '#1AA2B0',
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
    marginLeft: 125
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
