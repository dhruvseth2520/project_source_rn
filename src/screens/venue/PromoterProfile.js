import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import BadgeModal from "../../components/BadgeModal";
import { Entypo } from '@expo/vector-icons';


const VenuePromoterProfile = ({ route }) => {
  const { promoter, badge } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.navigate('VenuePromotersHome')}>
        <Entypo name="chevron-small-left" size={34} color="black" />
      </TouchableOpacity>
      <SliderBox
        sliderBoxHeight={450}
        images={promoter.images}
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
        <View style={{flexDirection: 'row', width: '50%'}}>
            <Text style={styles.name}>{promoter.firstName + ", 22"}</Text>
            <Text style={styles.role}>Student</Text>
            <TouchableOpacity style={styles.badgeBtn} onPress={() => setModalVisible(true)}>
              <FontAwesome5 style={[styles.badgeIcon, {color: badge.color}]} name={badge.iconName}></FontAwesome5>
            </TouchableOpacity>
        </View>

        <View style={{width: '40%'}}>
          <TouchableOpacity style={styles.messageBtn} onPress={() => navigation.navigate('VenueMessages')}>
            <Text style={{fontFamily: 'Avenir', color: '#1AA2B0'}}>Message</Text>
            <FontAwesome5 name="comment" style={{color: '#1AA2B0', marginLeft: 5, marginTop: -1, fontSize: 16}}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileContent}>
        <View style={styles.profileComponent}>
          <Text style={styles.profileBio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
        </View>
        <View style={styles.profileStats}>
          <View style={styles.stat}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.statNumber}>44</Text>
                <FontAwesome5 style={styles.statIcon} name="briefcase"></FontAwesome5>
            </View>
            <Text style={styles.statCaption}>Total Jobs</Text>
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
                <Text style={styles.statNumber}>2750</Text>
                <FontAwesome5 style={styles.statIcon} name="network-wired"></FontAwesome5>
            </View>
            <Text style={styles.statCaption}>Connections</Text>
          </View>
        </View>

        <View style={styles.contentCol}>
          <Text style={styles.label}>Active Since</Text>
          <Text style={styles.value}>07/23/2020</Text>
          <Text style={styles.label}>Availability</Text>
          <Text style={styles.value}>20 hours/week</Text>
          <Text style={styles.label}>Expected rate</Text>
          <Text style={styles.value}>1500 MMK per head</Text>
        </View>

        <View style={styles.contentCol}>
          <Text style={styles.label}>Languages</Text>
          <Text style={styles.value}>English, Burmese</Text>
          <Text style={styles.label}>Education</Text>
          <Text style={styles.value}>ESSEC Business School</Text>
        </View>

        <View style={styles.contentCol}>
          <Text style={styles.label}>Hobbies</Text>
          <Text style={styles.value}>Reading, Rock Climbing</Text>
          <Text style={styles.label}>Favorite Drink</Text>
          <Text style={styles.value}>Long-Island Iced Tea</Text>
        </View>
      </View>

      <BadgeModal name={promoter.firstName} badge={badge} modalVisible={modalVisible} setModalVisible={setModalVisible} />

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
    flexDirection: 'row'
  },
  profileContent: {
    marginTop: 15,
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
    marginTop: 5,
    borderColor: 'gray',
    borderBottomWidth: 0.5
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
    marginTop: -8
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
