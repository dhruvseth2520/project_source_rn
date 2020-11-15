import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import BadgeModal from "../../components/BadgeModal";
import { Entypo } from '@expo/vector-icons';


const VenuePromoterProfile = ({ route }) => {
  const { promoter } = route.params;
  const promoterProfile = promoter.promoterProfile;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.navigate('VenuePromotersHome')}>
        <Entypo name="chevron-small-left" size={44} color="white" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Image style={styles.headerBackground} source={require('../../assets/canva-photo-editor.png')}></Image>
        <Image style={styles.profileImage} source={{uri: promoterProfile.images[0]}} />
        <Text style={styles.headerTitle}>{promoter.firstName + ", " + promoter.age}</Text>
        <Text style={styles.headerSubtitle}>{promoterProfile.occupation}</Text>
        <View style={styles.headerCard}>
          <View>
            <Text style={styles.headerValue}>{promoterProfile.guestCount}</Text>
            <Text style={styles.headerLabel}>Clients Sourced</Text>
          </View>
          <View style={{marginLeft: 27}}>
            <Text style={styles.headerValue}>11</Text>
            <Text style={styles.headerLabel}>Positive Reviews</Text>
          </View>
          <View style={{marginLeft: 27}}>
            <Text style={styles.headerValue}>{promoterProfile.numConnections}</Text>
            <Text style={styles.headerLabel}>Total Connections</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileContent}>
        <Text style={styles.subTitle}>Bio</Text>
        <Text style={styles.bio}>{promoterProfile.bio}</Text>
        <Text style={styles.subTitle}>Profile Details</Text>
        <View style={{flexDirection: 'row', marginTop: -15}}>
          <View style={styles.contentCol}>
            <Text style={styles.label}>Active Since</Text>
            <Text style={styles.value}>{promoterProfile.activeSinceDate}</Text>
            <Text style={styles.label}>Availability</Text>
            <Text style={styles.value}>{promoterProfile.availability} hours/week</Text>
            <Text style={styles.label}>Expected rate</Text>
            <Text style={styles.value}>{promoterProfile.expectedRate} MMK per head</Text>
          </View>

          <View style={styles.contentCol}>
            <Text style={styles.label}>Languages</Text>
            <Text style={styles.value}>{promoterProfile.languages}</Text>
            <Text style={styles.label}>Education</Text>
            <Text style={styles.value}>{promoterProfile.education}</Text>
          </View>

          <View style={styles.contentCol}>
            <Text style={styles.label}>Hobbies</Text>
            <Text style={styles.value}>{promoterProfile.hobbies}</Text>
            <Text style={styles.label}>Favorite Drink</Text>
            <Text style={styles.value}>{promoterProfile.favoriteDrink}</Text>
          </View>
        </View>
        <Text style={styles.subTitle}>Gallery</Text>
        <View style={styles.imageContainer}>
          <Image source={{uri: promoterProfile.images[0]}} style={styles.galleryImage} />
          <Image source={{uri: promoterProfile.images[1]}} style={styles.galleryImage} />
          <Image source={{uri: promoterProfile.images[2]}} style={styles.galleryImage} />
        </View>
        <View style={[styles.imageContainer, {marginTop: 50, marginBottom: 50}]}>
          <Image source={{uri: promoterProfile.images[3]}} style={styles.galleryImage} />
          <Image source={{uri: promoterProfile.images[4]}} style={styles.galleryImage} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
    zIndex: 2
  },
  headerContainer: {
    height: 420,
  },
  headerBackground: {
    height: 420,
    left: -220,
    position: 'absolute',
    opacity: 1
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    top: 100
  },
  headerTitle: {
    fontFamily: 'Futura',
    fontWeight: '400',
    fontSize: 35,
    color: 'white',
    alignSelf: 'center',
    top: 120
  },
  subTitle: {
    fontSize: 22,
    fontFamily: 'Avenir',
    fontWeight: '500',
    color: '#2A2A2A',
    marginTop: 5
  },
  headerSubtitle: {
    fontSize: 17,
    top: 130,
    fontFamily: 'Avenir',
    color: 'white',
    alignSelf: 'center',
  },
  backArrow: {
    marginTop: 50,
    marginLeft: 10,
    zIndex: 1,
    position: 'absolute'
  },
  headerValue: {
    fontSize: 30,
    fontFamily: 'Avenir',
    fontWeight: '500',
    color: '#474747',
    alignSelf: 'center'
  },
  headerLabel: {
    fontFamily: 'Avenir',
    top: 3,
    color: '#474747'
  },
  headerCard: {
    flexDirection: 'row',
    width: '90%',
    padding: 13,
    top: 164,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  profileContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 55,
    marginBottom: 60,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 8,
  },
  bio: {
    fontFamily: 'Avenir',
    marginTop: 10,
    marginBottom: 10
  },
  contentCol: {
    marginTop: 25,
    marginLeft: 0,
    width: '33%'
  },
  badgeIcon: {
    fontSize: 22,
    marginTop: 10,
    marginLeft: 7,
    alignSelf: 'center'
  },
  label: {
    fontSize: 17,
    fontFamily: 'Avenir',
    fontWeight: '400',
    marginBottom: 2
  },
  value: {
    fontFamily: 'Avenir',
    fontSize: 13,
    color: '#3B3B3B',
    marginBottom: 6,
    marginTop: 3,
    fontWeight: '300'
  },
  badgeBtn: {
    height: 50,
    width: 50,
    marginLeft: -10,
    marginTop: -8,
    marginBottom: -15
  },
  imageContainer: {
    flexDirection: 'row',
    height: 140,
    marginTop: 15
  },
  galleryImage: {
    height: 180,
    width: 108,
    borderRadius: 6,
    marginRight: 4
  }
});

export default VenuePromoterProfile;
