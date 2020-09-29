import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';


const PromoterProfileSetup = ({ route }) => {
  const formData = route.params.formData;

  const dot = <View style={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6,borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />;
  const activeDot = <View style={{backgroundColor: '#007aff', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />;

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
                      <TextInput style={styles.formInput} placeholder="Upload any images you would like to display on your profile" />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Profile Bio</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="sentences" style={styles.formInput}/>
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
                      <TextInput autoCapitalize="words" style={styles.formInput}/>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Education</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" style={styles.formInput} placeholder="School / University"/>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Languages</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" placeholder="eg. English, Burmese" style={styles.formInput}/>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Hobbies</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" style={styles.formInput}/>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Favorite Drink</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" style={styles.formInput}/>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={[styles.inputLabel, {width: '80%'}]}># of social media connections</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="words" style={[styles.formInput, {top: 35}]}/>
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
                      <TextInput style={[styles.formInput, {top: 13}]} placeholder="eg. 12 hrs / week" />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.inputLabel}>Expected Rate</Text>
                    </View>
                    <View style={styles.column}>
                      <TextInput autoCapitalize="sentences" style={styles.formInput}/>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.slide}>
                  <View style={styles.formCard}>
                    <Text style={styles.sectionTitle}>Almost there!</Text>

                    <Text style={styles.disclaimer}>
                      By hitting on Finish below, you agree to our Terms of Service, Privacy Policy and Promoter Agreement.
                    </Text>
                    <TouchableOpacity style={styles.submit}>
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
  }
})

export default PromoterProfileSetup;
