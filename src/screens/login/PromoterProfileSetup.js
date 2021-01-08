import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, FlatList, Picker, KeyboardAvoidingView, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { storeData, getData } from '../../utils/localStorage';
import { TextInput, FAB, Chip, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import env from "../../utils/environment";
import { registerPromoter } from 'project_source_rn/src/serverSDK/api/register';

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
  const [socialMediaURLs, setSocialMediaURLs] = useState({ facebookURL: "", instagramHandle: "", twitterHandle: "", youtubeURL: "" });
  const [availability, setAvailability] = useState("");
  const [rate, setRate] = useState("");

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;


  let thumbnailWidth, thumbnailHeight, chipFontSize, isSmall, fontSize;
  if (windowHeight < 700) {
    thumbnailWidth = windowWidth * 0.26;
    thumbnailHeight = windowHeight * 0.22;
    chipFontSize = 11;
    isSmall = true;
    fontSize = 12;
  } else {
    thumbnailWidth = windowWidth * 0.37;
    thumbnailHeight = windowHeight * 0.30;
    chipFontSize = 13;
    isSmall = false;
    fontSize = 14;
  }

  const dot = <View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />;
  const activeDot = <View style={{ backgroundColor: '#007aff', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />;

  // NOTE: JWT (done)
  const handleSubmitJWT = async () => {
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
      socialMediaURLs,
      availability,
      expectedRate: rate
    }

    const accessToken = await getData('@accessToken')
    const promoterData = { ...formData, ...profileData };

    const response = await registerPromoter(accessToken, promoterData)

    if (response.error) {
      setLoading(false);
      setFailure(true);
      return
    }

    if (response.status === "Success") {
      await storeData('@promoterFormData', response.promoter);
      navigation.navigate('PromoterTab');
    }
  }

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
      socialMediaURLs,
      availability,
      expectedRate: rate
    }

    getData('@userId').then(response => {
      const promoterData = { ...formData, ...profileData, loginId: response };
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


  return (
    <View style={styles.background}>
      {failure ? (
        <View style={styles.loadingContainer}>
          <Image source={require('../../assets/sad_dog.jpg')} style={{ width: 150, height: 150, marginBottom: 30 }}></Image>
          <Text style={styles.loadingText}>There was an error creating your profile</Text>
          <FAB
            icon="arrow-left"
            label="Try Again"
            style={{ backgroundColor: '#22C2D2', marginTop: 30 }}
            onPress={() => navigation.navigate('PromoterInfo')}
            color="white"
          />
        </View>
      ) : (
          <>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Please wait a moment while we finish setting up your profile</Text>
                <ActivityIndicator size="large" color="#1AA2B0" style={{ top: 30 }}></ActivityIndicator>
              </View>
            ) : (<>
              <Text style={styles.title}>Finish setting up your profile</Text>
              <Swiper style={styles.wrapper} loop={false} paginationStyle={{ marginBottom: 50 }} dot={dot} activeDot={activeDot}>
                <View style={styles.slide}>
                  <View style={styles.formCard}>
                    <Text style={styles.sectionTitle}>Profile Info</Text>
                    <TextInput mode='outlined'
                      label='Profile Bio'
                      theme={{ colors: { primary: '#19C2BD', underlineColor: 'transparent' } }}
                      autoCapitalize="sentences"
                      autoCorrect={false}
                      selectionColor="#1AA2B0"
                      style={styles.formInput} value={bio} onChangeText={(val) => setBio(val)} />

                    <Text style={[styles.sectionTitle, { fontSize: 16, left: 5, marginTop: 15, fontWeight: '100' }]}>Profile Images</Text>

                    <ScrollView>
                      <FlatList
                        keyExtractor={image => image.uri}
                        data={images}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item }) => (
                          <View style={styles.imageHolder}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => removeImage(item.uri)}>
                              <FontAwesome5 name="times" style={{ alignSelf: 'center', top: 5, fontSize: 10, color: 'white' }} />
                            </TouchableOpacity>
                            <Image source={{ uri: item.uri }} style={{ borderRadius: 10, width: thumbnailWidth, height: thumbnailHeight }} />
                          </View>
                        )}
                      />
                    </ScrollView>

                    <FAB
                      icon="image"
                      label="Upload Images"
                      style={styles.cameraButton}
                      onPress={pickImage}
                    />
                    <Text style={styles.inputDisclaimer}>Upload up to 5 images to display on your profile</Text>
                  </View>
                </View>
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} behavior="padding" enabled keyboardVerticalOffset={150}>
                  <ScrollView>
                    <View style={styles.slide}>
                      <View style={styles.formCard}>
                        <Text style={styles.sectionTitle}>Personal Details</Text>
                        <TextInput mode='outlined'
                          label='Education'
                          theme={{ colors: { primary: '#19C2BD', underlineColor: 'transparent' } }}
                          selectionColor="#1AA2B0"
                          autoCapitalize="words"
                          autoCorrect={false}
                          style={styles.formInput}
                          placeholder="Most Recent School or University"
                          value={education} onChangeText={(val) => setEducation(val)} />

                        <TextInput mode='outlined'
                          label='Occupation'
                          theme={{ colors: { primary: '#19C2BD', underlineColor: 'transparent' } }}
                          selectionColor="#1AA2B0"
                          autoCapitalize="words"
                          autoCorrect={false}
                          style={styles.formInput}
                          placeholder="eg. Student, Business Associate"
                          value={occupation} onChangeText={(val) => setOccupation(val)} />

                        <TextInput mode='outlined'
                          label='Languages'
                          theme={{ colors: { primary: '#19C2BD', underlineColor: 'transparent' } }}
                          autoCapitalize="words"
                          autoCorrect={true}
                          selectionColor="#1AA2B0"
                          style={styles.formInput}
                          placeholder="eg. English, Burmese"
                          value={languages} onChangeText={(val) => setLanguages(val)} />

                        <TextInput mode='outlined'
                          label='Hobbies'
                          theme={{ colors: { primary: '#19C2BD', underlineColor: 'transparent' } }}
                          selectionColor="#1AA2B0"
                          autoCapitalize="words"
                          autoCorrect={false}
                          style={styles.formInput}
                          value={hobbies} onChangeText={(val) => setHobbies(val)} />

                        <TextInput mode='outlined'
                          label='Favorite Drink'
                          theme={{ colors: { primary: '#19C2BD', underlineColor: 'transparent' } }}
                          selectionColor="#1AA2B0"
                          autoCapitalize="words"
                          autoCorrect={false}
                          style={styles.formInput}
                          value={drink} onChangeText={(val) => setDrink(val)} />
                      </View>
                    </View>
                  </ScrollView>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} behavior="padding" enabled keyboardVerticalOffset={120}>
                  <ScrollView>
                    <View style={styles.slide}>
                      <View style={styles.formCard}>
                        <Text style={styles.sectionTitle}>Social Media (Optional)</Text>
                        <Text style={[styles.sectionDescription, { fontSize: fontSize }]}>All promoters on our platform are given a badge based on their level of influence when they register</Text>

                        <View style={styles.badgeContainer}>
                          <Chip selected style={styles.badge} textStyle={{ fontFamily: 'Avenir', fontSize: chipFontSize }} avatar={<Avatar.Image size={24} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbn2m0-XcAwPXkBNWZtO3-hr5vAAQqknKCxg&usqp=CAU' }} />}>Loyalist</Chip>
                          <Chip style={styles.badge} textStyle={{ fontFamily: 'Avenir', fontSize: chipFontSize }} avatar={<Avatar.Image size={24} source={{ uri: 'https://i.pinimg.com/736x/fe/43/e0/fe43e01f8b4603eada483bf7c8523de1.jpg' }} />}>Advocate</Chip>
                          <Chip style={styles.badge} textStyle={{ fontFamily: 'Avenir', fontSize: chipFontSize }} avatar={<Avatar.Image size={24} source={{ uri: 'https://image.freepik.com/free-vector/influencer-concept-illustration_114360-681.jpg' }} />}>Influencer</Chip>
                        </View>

                        <Text style={[styles.sectionDescription, { marginTop: 20, fontSize: fontSize }]}>The default badge for all promoters is the Loyalist. If you would like to be considered for another badge please provide any of your social media handles below so we can evaluate whether you are eligible</Text>

                        {isSmall ? (
                          <View style={{ flexDirection: 'row', marginTop: -20 }}>
                            <TextInput mode='outlined'
                              label='Facebook URL'
                              theme={{ colors: { primary: '#3b5998', underlineColor: 'transparent' } }}
                              autoCapitalize="none"
                              autoCorrect={false}
                              selectionColor="#3b5998"
                              style={[styles.formInput, { width: '50%', marginLeft: -5, marginRight: 5 }]}
                              value={socialMediaURLs.facebookURL} onChangeText={(val) => setSocialMediaURLs({ ...socialMediaURLs, facebookURL: val })} />
                            <TextInput mode='outlined'
                              label='Instagram Handle'
                              theme={{ colors: { primary: '#E1306C', underlineColor: 'transparent' } }}
                              selectionColor="#E1306C"
                              autoCapitalize="none"
                              autoCorrect={false}
                              style={[styles.formInput, { width: '50%', marginLeft: -5 }]}
                              value={socialMediaURLs.instagramHandle} onChangeText={(val) => setSocialMediaURLs({ ...socialMediaURLs, instagramHandle: val })} />
                          </View>
                        ) : (
                            <View style={{ marginTop: -15 }}>
                              <View style={{ flexDirection: 'row' }}>
                                <TextInput mode='outlined'
                                  label='Facebook URL'
                                  theme={{ colors: { primary: '#3b5998', underlineColor: 'transparent' } }}
                                  selectionColor="#3b5998"
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  style={[styles.formInput, { width: '49%', marginLeft: -5, marginBottom: -5 }]}
                                  value={socialMediaURLs.facebookURL} onChangeText={(val) => setSocialMediaURLs({ ...socialMediaURLs, facebookURL: val })} />
                                <TextInput mode='outlined'
                                  label='@ Instagram Handle'
                                  theme={{ colors: { primary: '#E1306C', underlineColor: 'transparent' } }}
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  selectionColor="#E1306C"
                                  style={[styles.formInput, { width: '49%', marginLeft: 0, marginBottom: -5 }]}
                                  value={socialMediaURLs.instagramHandle} onChangeText={(val) => setSocialMediaURLs({ ...socialMediaURLs, instagramHandle: val })} />
                              </View>

                              <View style={{ flexDirection: 'row' }}>
                                <TextInput mode='outlined'
                                  label='@ Twitter Handle'
                                  theme={{ colors: { primary: '#1DA1F2', underlineColor: 'transparent' } }}
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  selectionColor="#1DA1F2"
                                  style={[styles.formInput, { width: '49%', marginLeft: -5, marginBottom: -5 }]}
                                  value={socialMediaURLs.twitterHandle} onChangeText={(val) => setSocialMediaURLs({ ...socialMediaURLs, twitterHandle: val })} />
                                <TextInput mode='outlined'
                                  label='Youtube URL'
                                  theme={{ colors: { primary: '#FF0000', underlineColor: 'transparent' } }}
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  selectionColor="#FF0000"
                                  style={[styles.formInput, { width: '49%', marginLeft: 0, marginBottom: -5 }]}
                                  value={socialMediaURLs.youtubeURL} onChangeText={(val) => setSocialMediaURLs({ ...socialMediaURLs, youtubeURL: val })} />
                              </View>
                            </View>
                          )}
                        <Text style={[styles.socialDisclaimer, { fontSize: fontSize, marginTop: (isSmall ? 10 : 20) }]}>Don't fret, this part is totally optional and will not affect your standing on our platform</Text>
                      </View>
                    </View>
                  </ScrollView>
                </KeyboardAvoidingView>

                <View style={styles.slide}>
                  <View style={styles.formCard}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <TextInput mode='outlined'
                      label='Weekly Availability (hours per week)'
                      theme={{ colors: { primary: '#19C2BD', underlineColor: 'transparent' } }}
                      selectionColor="#1AA2B0"
                      keyboardType="numeric"
                      style={styles.formInput}
                      value={availability} onChangeText={(val) => setAvailability(val)} />

                    <TextInput mode='outlined'
                      label='Expected Rate (MMK per head)'
                      theme={{ colors: { primary: '#19C2BD', underlineColor: 'transparent' } }}
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
                      <Text style={{ alignSelf: 'center', fontSize: 15, color: 'white', fontFamily: 'Helvetica Neue', fontWeight: '400' }}>Finish</Text>
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
    shadowOpacity: 0.15,
    backgroundColor: '#DFDFDF',
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
    backgroundColor: '#1AB0A8'
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
    fontFamily: 'Avenir',
    width: '95%',
    fontWeight: '300',
    marginVertical: 15,
    color: '#2E2E2E'
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
  },
  badgeContainer: {
    marginTop: 5,
    flexDirection: 'row'
  },
  badge: {
    width: '31%',
    marginRight: 8
  },
  socialDisclaimer: {
    fontFamily: 'Avenir',
    color: '#2E2E2E',
    fontWeight: '300'
  }
})

export default PromoterProfileSetup;
