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
        <Entypo name="chevron-small-left" size={34} color="black" />
      </TouchableOpacity>
      <SliderBox
        sliderBoxHeight={450}
        images={promoterProfile.images}
        dotColor="white"
        inactiveDotColor="#90A4AE"
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 8,
          marginHorizontal: 10,
          marginBottom: 15,
          padding: 0,
          margin: 0
        }}
      />

      <View style={styles.profileHeader}>
            <Text style={styles.name}>{promoter.firstName + ", " + promoter.age}</Text>
            <Text style={styles.role}>{promoterProfile.occupation}</Text>
            {promoter.badge ? (
              <>
                <TouchableOpacity style={styles.badgeBtn} onPress={() => setModalVisible(true)}>
                  <FontAwesome5 style={[styles.badgeIcon, {color: promoter.badge.color}]} name={promoter.badge.iconName}></FontAwesome5>
                </TouchableOpacity>
                <BadgeModal promoter={promoter} modalVisible={modalVisible} setModalVisible={setModalVisible} />
              </>
            ) : <></>}


      </View>

      <View style={styles.profileContent}>
        <View style={styles.profileComponent}>
          <Text style={styles.profileBio}>{promoterProfile.bio}</Text>
        </View>
        <View style={styles.profileStats}>
          <View style={styles.stat}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.statNumber}>{promoter.promoterProfile.guestCount}</Text>
                <FontAwesome5 style={styles.statIcon} name="briefcase"></FontAwesome5>
            </View>
            <Text style={styles.statCaption}>Clients Sourced</Text>
          </View>

          <View style={styles.stat}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.statNumber}>11</Text>
                <FontAwesome5 style={[styles.statIcon, {left: 2}]} name="star"></FontAwesome5>
            </View>
            <Text style={styles.statCaption}>Positive Reviews</Text>
          </View>

          <View style={styles.stat}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.statNumber}>{promoterProfile.numConnections}</Text>
                <FontAwesome5 style={styles.statIcon} name="network-wired"></FontAwesome5>
            </View>
            <Text style={styles.statCaption}>Total Connections</Text>
          </View>
        </View>

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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
    zIndex: 2
  },
  backArrow: {
    marginTop: 50,
    marginLeft: 10,
    zIndex: 1,
    position: 'absolute'
  },
  profileHeader: {
    marginLeft: 18,
    marginTop: 18,
    flexDirection: 'row',
    paddingVertical: 0
  },
  profileContent: {
    marginTop: 25,
    paddingHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  profileBio: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    fontWeight: '300',
    marginTop: 5,
    marginBottom: 20
  },
  profileComponent: {
    width: 360,
    marginTop: 5,
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    paddingVertical: 0
  },
  contentCol: {
    marginTop: 15,
    marginLeft: 1,
    marginRight: 15,
    marginBottom: 30,
    width: '29%'
  },
  name: {
    fontSize: 26,
    fontFamily: 'Gill Sans',
    fontWeight: '300'
  },
  role: {
    fontSize: 13,
    marginTop: 3,
    fontFamily: 'Gill Sans',
    fontWeight: '300',
    position: 'absolute',
    top: 30,
    color: '#3B3B3B'
  },
  badgeIcon: {
    fontSize: 22,
    marginTop: 10,
    marginLeft: 7,
    alignSelf: 'center'
  },
  label: {
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: '400',
    marginBottom: 2
  },
  value: {
    fontFamily: 'Avenir',
    color: '#3B3B3B',
    marginBottom: 6,
    fontWeight: '300'
  },
  badgeBtn: {
    height: 50,
    width: 50,
    marginLeft: -10,
    marginTop: -8,
    marginBottom: -15
  },
  profileStats: {
    flexDirection: 'row',
    marginLeft: -10,
    padding: 10,
    marginTop: 5
  },
  stat: {
    marginRight: 18,
    width: '29%'
  },
  statIcon: {
    fontSize: 18,
    top: 15,
    left: 8
  },
  statNumber: {
    fontSize: 40,
    fontFamily: 'Avenir',
    fontWeight: '100'
  },
  statCaption: {
    fontSize: 13,
    fontWeight: '300',
    fontFamily: 'Avenir'
  },
  messageBtn: {
    flexDirection: 'row',
    borderColor: '#1AA2B0',
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 38,
    marginLeft: 60,
    borderRadius: 7
  }
});

export default VenuePromoterProfile;
