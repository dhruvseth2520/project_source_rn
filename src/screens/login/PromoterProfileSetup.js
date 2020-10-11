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
  const [connections, setConnections] = useState(0);
  const [availability, setAvailability] = useState(10);
  const [rate, setRate] = useState(1200);

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
        const promoterData = {...formData, ...profileData, promoterId: response};
        storeData('@promoterFormData', promoterData).then(() => {
                fetch(`${env.API_URL}/api/register/promoter`, {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(promoterData)
                }).then(response => response.json()).then(data => {
                  if (data.status === "Success") {
                    navigation.navigate('PromoterTab');
                  }
                })
            });
    })
  }

  return (
    <View style={styles.background}>
            <Text style={styles.title}>Finish setting up your profile</Text>

            <Swiper style={styles.wrapper} loop={false} paginationStyle={{top: 0}} dot={dot} activeDot={activeDot}>
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

                    <Text style={styles.label}>Furthest level of Education</Text>
                    <Picker style={styles.formSelector}>
                      <Picker.Item label="High School" value="high school" />
                      <Picker.Item label="Bachelors" value="bachelors" />
                      <Picker.Item label="Masters" value="masters" />
                    </Picker>

                    <TextInput mode='outlined'
                      label='Furthest Level of Education'
                      theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                      selectionColor="#1AA2B0"
                      style={styles.formInput}
                      placeholder="High School, Bachelor's or Master's"
                      value={occupation} onChangeText={(val) => setOccupation(val)} />


                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Education</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" style={styles.formInput} value={education} onChangeText={(val) => setEducation(val)} placeholder="School / University"/>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Languages</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" placeholder="eg. English, Burmese" value={languages} onChangeText={(val) => setLanguages(val)} style={styles.formInput}/>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Hobbies</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" style={styles.formInput} value={hobbies} onChangeText={(val) => setHobbies(val)}/>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Favorite Drink</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" style={styles.formInput} value={drink} onChangeText={(val) => setDrink(val)}/>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={[styles.inputLabel, {width: '80%'}]}># of social media connections</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" keyboardType="numeric" value={connections} onChangeText={(val) => setConnections(val)} style={[styles.formInput, {top: 35}]}/>
                      <Text style={styles.inputDisclaimer}>Enter the approximate number of connections you have across all social media platforms. Be honest, we will verify your response</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.slide}>
                <View style={styles.formCard}>
                  <Text style={styles.sectionTitle}>Preferences</Text>
                  <View style={[styles.row, {marginTop: 15}]}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Weekly Availability</Text>
                    </View>
                    <View style={styles.column}>
                      <View style={{flexDirection: 'row', width: 190}}>
                        <TextInput style={[styles.formInput, {top: 13, width: '30%'}]} value={availability} onChangeText={(val) => setAvailability(val)} keyboardType="numeric" />
                        <TextInput style={[styles.formInput, {top: 13, width: '70%', marginLeft: 10}]} placeholder="hours per week" editable={false} />
                      </View>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Expected Rate</Text>
                    </View>
                    <View style={styles.column}>
                      <View style={{flexDirection: 'row', width: 190}}>
                        <TextInput style={[styles.formInput, {width: '30%'}]} keyboardType="numeric" value={rate} onChangeText={(val) => setRate(val)} />
                        <TextInput style={[styles.formInput, {width: '70%', marginLeft: 10}]} placeholder="MMK per head" editable={false} />
                      </View>
                    </View>
                  </View>
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
