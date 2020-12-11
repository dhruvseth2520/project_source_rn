import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, FlatList, Picker, KeyboardAvoidingView, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { storeData, getData } from '../../utils/localStorage';
import { TextInput, FAB } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import env from "../../utils/environment";

const PromoterProfileSetup = ({ route }) => {
  const formData = route.params.formData;
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [images, setImages] = useState([]);
  const [bio, setBio] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [languages, setLanguages] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [drink, setDrink] = useState("");
  const [connections, setConnections] = useState(0);
  const [availability, setAvailability] = useState("");
  const [rate, setRate] = useState("");

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  let thumbnailWidth, thumbnailHeight;
  if (windowHeight < 700) {
    thumbnailWidth = windowWidth * 0.26;
    thumbnailHeight = windowHeight * 0.22;
  } else {
    thumbnailWidth = windowWidth * 0.37;
    thumbnailHeight = windowHeight * 0.30;
  }

  const dot = <View style={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6,borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />;
  const activeDot = <View style={{backgroundColor: '#007aff', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />;

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
              } else if (data.status === "Failure") {
                setLoading(false);
                setFailure(true);
              }
            })
      })
    }

    const pickImage = async () => {
     if (images.length < 5) {
       let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         base64: true,
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

   const handleFacebook = () => {

   }

  return (
    <View style={styles.background}>
            {failure ? (
              <View style={styles.loadingContainer}>
                <Image source={require('../../assets/sad_dog.jpg')} style={{width: 150, height: 150, marginBottom: 30}}></Image>
                <Text style={styles.loadingText}>There was an error creating your profile</Text>
                <FAB
                  icon="arrow-left"
                  label="Try Again"
                  style={{backgroundColor: '#22C2D2', marginTop: 30}}
                  onPress={() => navigation.navigate('PromoterInfo')}
                  color="white"
                />
              </View>
            ) : (
              <>
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <Text style={styles.loadingText}>Please wait a moment while we finish setting up your profile</Text>
                      <ActivityIndicator size="large" color="#1AA2B0" style={{top: 30}}></ActivityIndicator>
                    </View>
                  ) : (<>
                        <Text style={styles.title}>Finish setting up your profile</Text>
                              <Swiper style={styles.wrapper} loop={false} paginationStyle={{marginBottom: 50}} dot={dot} activeDot={activeDot}>
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
                                              <Image source={{uri: item.uri}} style={{borderRadius: 10, width: thumbnailWidth, height: thumbnailHeight}} />
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
                                        label='Education'
                                        theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                                        selectionColor="#1AA2B0"
                                        style={styles.formInput}
                                        placeholder="Most Recent School or University"
                                        value={education} onChangeText={(val) => setEducation(val)} />

                                      <TextInput mode='outlined'
                                        label='Occupation'
                                        theme={{colors: {primary: '#19C2BD', underlineColor: 'transparent'}}}
                                        selectionColor="#1AA2B0"
                                        style={styles.formInput}
                                        placeholder="eg. Student, Business Associate"
                                        value={occupation} onChangeText={(val) => setOccupation(val)} />

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
                                  </View>
                                </View>
                                <View style={styles.slide}>
                                  <View style={styles.formCard}>
                                      <Text style={styles.sectionTitle}>Social Media (Optional)</Text>
                                      <Text style={styles.sectionDescription}>Connect to any of your active social media accounts to show venues how wide your follower network is. This will add to your stock value on our platform and improve engagement with venues</Text>
                                      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 5, marginBottom: 15}}>
                                        <Text style={{fontSize: 54, fontWeight: '300'}}>{connections}</Text>
                                        <Text style={{fontWeight: '300', marginTop: 24, marginLeft: 8}}>Followers</Text>
                                      </View>

                                      <FAB
                                        icon="facebook"
                                        label="Connect to Facebook"
                                        style={[styles.socialButton, {backgroundColor: '#3B5998'}]}
                                        onPress={handleFacebook}
                                        color="white"
                                      />
                                      <FAB
                                        icon="instagram"
                                        label="Connect to Instagram"
                                        style={[styles.socialButton, {backgroundColor: '#E1306C'}]}
                                        color="white"
                                      />
                                      <FAB
                                        icon="twitter"
                                        label="Connect to Twitter"
                                        style={[styles.socialButton, {backgroundColor: '#1DA1F2'}]}
                                        color="white"
                                      />
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
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#22D2D1',
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
    marginTop: 20,
    left: -12,
    alignSelf: 'center',
    borderRadius: 25,
    padding: 15,
    width: 100,
    backgroundColor: '#22D2D1'
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
  sectionDescription: {
    fontFamily: 'Gill Sans',
    width: '97%',
    fontWeight: '300',
    marginVertical: 15,
    color: '#2E2E2E'
  },
  socialButton: {
    marginVertical: 10,
    width: '93%'
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
