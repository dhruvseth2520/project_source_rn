import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Picker, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { storeData, getData } from '../../utils/localStorage';
import { TextInput } from 'react-native-paper';
import env from "../../utils/environment";


const PromoterProfileSetup = ({ route }) => {
  const formData = route.params.formData;
  const navigation = useNavigation();
  const [images, setImages] = useState("");
  const [bio, setBio] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [languages, setLanguages] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [drink, setDrink] = useState("");
  const [connections, setConnections] = useState("");
  const [availability, setAvailability] = useState("");
  const [rate, setRate] = useState("");

  const dot = <View style={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6,borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />;
  const activeDot = <View style={{backgroundColor: '#007aff', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />;

  const handleSubmit = () => {
    const profileData = {
      images,
      bio,
      occupation,
      education,
      languages,
      hobbies,
      favoriteDrink: drink,
      numConnections: connections,
      availability,
      expectedRate: rate
    }

    getData('@userId').then(response => {
        const promoterData = {...formData, ...profileData, loginId: response};
        fetch(`${env.API_URL}/api/register/promoter`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(promoterData)
            }).then(response => response.json()).then(data => {
              if (data.status === "Success") {
                storeData('@promoterFormData', data.promoter);
                navigation.navigate('PromoterTab');
              }
        })    
    })
  }

  return (
    <View style={styles.background}>
            <Text style={styles.title}>Finish setting up your profile</Text>
                  <Swiper style={styles.wrapper} loop={false} paginationStyle={{top: 420}} dot={dot} activeDot={activeDot}>
                    <View style={styles.slide}>
                      <View style={styles.formCard}>
                        <Text style={styles.sectionTitle}>Profile Info</Text>

                        <TextInput mode='outlined'
                          label='Images'
                          theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                          selectionColor="#1AA2B0"
                          style={styles.formInput} value={images} onChangeText={(val) => setImages(val)} />
                        <Text style={styles.inputDisclaimer}>Upload any images you would like to display on your profile</Text>

                        <TextInput mode='outlined'
                          label='Profile Bio'
                          theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                          selectionColor="#1AA2B0"
                          style={styles.formInput} value={bio} onChangeText={(val) => setBio(val)} />
                      </View>
                    </View>
                    <View style={styles.slide}>
                      <View style={styles.formCard}>
                        <Text style={styles.sectionTitle}>Personal Details</Text>

                        <TextInput mode='outlined'
                          label='Occupation'
                          theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                          selectionColor="#1AA2B0"
                          style={styles.formInput}
                          placeholder="eg. Student, Business Associate"
                          value={occupation} onChangeText={(val) => setOccupation(val)} />


                          <TextInput mode='outlined'
                            label='Education'
                            theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                            selectionColor="#1AA2B0"
                            style={styles.formInput}
                            placeholder="Most Recent School or University"
                            value={education} onChangeText={(val) => setEducation(val)} />

                          <TextInput mode='outlined'
                            label='Languages'
                            theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                            selectionColor="#1AA2B0"
                            style={styles.formInput}
                            placeholder="eg. English, Burmese"
                            value={languages} onChangeText={(val) => setLanguages(val)} />

                          <TextInput mode='outlined'
                            label='Hobbies'
                            theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                            selectionColor="#1AA2B0"
                            style={styles.formInput}
                            value={hobbies} onChangeText={(val) => setHobbies(val)} />

                          <TextInput mode='outlined'
                            label='Favorite Drink'
                            theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                            selectionColor="#1AA2B0"
                            style={styles.formInput}
                            value={drink} onChangeText={(val) => setDrink(val)} />

                          <TextInput mode='outlined'
                            label='# of social media connections'
                            theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                            selectionColor="#1AA2B0"
                            keyboardType="numeric"
                            style={styles.formInput}
                            value={connections} onChangeText={(val) => setConnections(val)} />
                          <Text style={styles.inputDisclaimer}>Enter the approximate number of connections you have across all social media platforms. Be honest, we will verify your response</Text>
                      </View>
                    </View>
                    <View style={styles.slide}>
                      <View style={styles.formCard}>
                        <Text style={styles.sectionTitle}>Preferences</Text>

                        <TextInput mode='outlined'
                          label='Weekly Availability (hours per week)'
                          theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                          selectionColor="#1AA2B0"
                          keyboardType="numeric"
                          style={styles.formInput}
                          value={availability} onChangeText={(val) => setAvailability(val)} />

                        <TextInput mode='outlined'
                          label='Expected Rate (MMK per head)'
                          theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                          selectionColor="#1AA2B0"
                          keyboardType="numeric"
                          style={styles.formInput}
                          value={rate} onChangeText={(val) => setRate(val)} />
                      </View>
                    </View>
                    <View style={styles.slide}>
                        <View style={styles.formCard}>
                          <Text style={styles.sectionTitle}>Almost there!</Text>
                          <Text style={styles.disclaimer}>
                            By tapping Finish below, you confirm that all the information provided is accurate and allow Source to share your profile with Venues in your area.
                          </Text>
                          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                            <Text style={{alignSelf: 'center', fontSize: 15, color: 'white', fontFamily: 'Helvetica Neue', fontWeight: '300'}}>Finish</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                  </Swiper>
      </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 90,
    marginLeft: 30,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 27,
    marginBottom: 25
  },
  formCard: {
    width: '85%',
    marginLeft: 20,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontFamily: 'Gill Sans',
    fontWeight: '300',
  },
  formInput: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 13,
    marginTop: 10,
    height: 50,
    padding: 4,
    width: '95%'
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    top: 20,
    left: -12,
    alignSelf: 'center',
    borderRadius: 25,
    padding: 15,
    width: 100,
    backgroundColor: '#1AA2B0'
  },
  disclaimer: {
    marginHorizontal: 10,
    fontFamily: 'PingFang HK',
    fontWeight: '300',
    fontSize: 13,
    marginTop: 20
  },
  inputDisclaimer: {
    fontSize: 12,
    color: 'gray',
    width: '95%',
    left: 5,
    marginTop: 6,
  }
})

export default PromoterProfileSetup;
