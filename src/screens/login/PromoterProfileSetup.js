import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, FlatList, Picker, KeyboardAvoidingView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { storeData, getData } from '../../utils/localStorage';
import { TextInput, FAB } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import env from "../../utils/environment";


const PromoterProfileSetup = ({ route }) => {
  const formData = route.params.formData;
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
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
    setLoading(true);
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
              headers: {
                'Content-Type': 'application/json',
              },
              mode: 'cors',
              body: JSON.stringify(promoterData)
            }).then(response => response.json()).then(data => {
              if (data.status === "Success") {
                storeData('@promoterFormData', data.promoter);
                navigation.navigate('PromoterTab');
              }
            })
      })
    }

    const pickImage = async () => {
     if (images.length < 5) {
       let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [6, 3],
         quality: 1,
       });

       if (!result.cancelled) {
         setImages([...images, result]);
       }
     } else {
       alert("Only 5 images permitted per profile. Please remove an image before adding another");
     }
   };

   const removeImage = (uri) => {
     const tempImages = images.slice();
     for (let i = 0; i < tempImages.length; i++) {
       if (tempImages[i].uri === uri) {
         tempImages.splice(i, 1);
       }
     }
     setImages(tempImages);
   }

  return (
    <View style={styles.background}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Please wait a moment while we finish setting up your profile</Text>
                <ActivityIndicator size="large" color="#1AA2B0" style={{top: 30}}></ActivityIndicator>
              </View>
            ) : (<>
              <Text style={styles.title}>Finish setting up your profile</Text>
                    <Swiper style={styles.wrapper} loop={false} paginationStyle={{top: 480}} dot={dot} activeDot={activeDot}>
                      <View style={styles.slide}>
                        <View style={styles.formCard}>
                          <Text style={styles.sectionTitle}>Profile Info</Text>
                          <TextInput mode='outlined'
                            label='Profile Bio'
                            theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                            selectionColor="#1AA2B0"
                            style={styles.formInput} value={bio} onChangeText={(val) => setBio(val)} />

                            <Text style={[styles.sectionTitle, {fontSize: 16, left: 5, marginTop: 15, fontWeight: '100'}]}>Profile Images</Text>

                            <ScrollView>
                              <FlatList
                                keyExtractor={image => image.uri}
                                data={images}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                renderItem={({ item }) => (
                                  <View style={styles.imageHolder}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => removeImage(item.uri)}>
                                      <FontAwesome5 name="times" style={{alignSelf: 'center', top: 5, fontSize: 10, color: 'white'}} />
                                    </TouchableOpacity>
                                    <Image source={{uri: item.uri}} style={styles.profileImage} />
                                  </View>
                                )}
                              />
                            </ScrollView>

                            <FAB
                              icon="image"
                              label="Upload Images"
                              style={styles.cameraButton}
                              onPress={pickImage}
                              color="white"
                            />
                            <Text style={styles.inputDisclaimer}>Upload up to 5 images to display on your profile</Text>
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
                </>
            )}

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
  cameraButton: {
    width: '95%',
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#22C2D2'
  },
  closeButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    height: 21,
    width: 21,
    borderRadius: 10,
    backgroundColor: '#22C2D2',
    right: -7,
    top: -10,
    zIndex: 1,
  },
  imageHolder: {
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 4,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#22C2D2'
  },
  profileImage: {
    height: 320,
    width: 180,
    borderRadius: 10
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
  },
  loadingContainer: {
    marginTop: 320,
    alignSelf: 'center'
  },
  loadingText: {
    fontSize: 24,
    textAlign: 'center',
    width: 300,
    fontFamily: 'Avenir',
    fontWeight: '400'
  }
})

export default PromoterProfileSetup;
