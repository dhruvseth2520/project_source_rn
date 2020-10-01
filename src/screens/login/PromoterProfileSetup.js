import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { storeData, getData } from '../../utils/localStorage';
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

            <Swiper style={styles.wrapper} loop={false} paginationStyle={{top: 100}} dot={dot} activeDot={activeDot}>
              <View style={styles.slide}>
                <View style={styles.formCard}>
                  <Text style={styles.sectionTitle}>Profile Info</Text>
                  <View style={[styles.row, {marginTop: 15}]}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Images</Text>

                    </View>
                    <View style={styles.column}>
                      <TextInput style={styles.formInput} value={images} onChangeText={(val) => setImages(val)} />
                      <Text style={[styles.inputDisclaimer, {top: 12, marginBottom: 10}]}>Upload any images you would like to display on your profile</Text>

                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Profile Bio</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="sentences" style={styles.formInput} value={bio} onChangeText={(val) => setBio(val)} />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.slide}>
                <View style={styles.formCard}>
                  <Text style={styles.sectionTitle}>Personal Details</Text>

                  <View style={[styles.row, {marginTop: 15}]}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Occupation</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" style={styles.formInput} value={occupation} onChangeText={(val) => setOccupation(val)} placeholder="eg. Student, Business Associate"/>
                    </View>
                  </View>
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
    fontWeight: '300'
  },
  column: {
    width: '33%'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12
  },
  inputLabel: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    top: 10,
    marginLeft: 10
  },
  formInput: {
    width: 200,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    padding: 5,
    top: 1
  },
  wrapper: {
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
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
    width: 230,
    top: 50
  }
})

export default PromoterProfileSetup;
