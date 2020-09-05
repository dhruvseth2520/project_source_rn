import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import BadgeModal from "../components/BadgeModal";


const VenuePromoterProfile = ({ route }) => {
  const { promoter, badge } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.background}>
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
        <Text style={styles.name}>{promoter.firstName + ", 22"}</Text>
        <Text style={styles.role}>Student</Text>

        <TouchableOpacity style={styles.badgeBtn} onPress={() => setModalVisible(true)}>
          <FontAwesome5 style={[styles.badgeIcon, {color: badge.color}]} name={badge.iconName}></FontAwesome5>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContent}>
        <Text style={styles.profileBio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>

        <View style={styles.contentCol}>
          <Text>Col 1</Text>
        </View>

        <View style={styles.contentCol}>
          <Text>Col 2</Text>
        </View>
      </View>

      <BadgeModal name={promoter.firstName} badge={badge} modalVisible={modalVisible} setModalVisible={setModalVisible} />

    </View>


  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1
  },
  profileHeader: {
    marginLeft: 18,
    marginTop: 18,
    flexDirection: 'row'
  },
  profileContent: {
    marginTop: 30,
    paddingHorizontal: 19,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  profileBio: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    fontWeight: '300'
  },
  contentCol: {
    marginTop: 15,
    width: '50%'
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
    marginTop: 2,
    marginLeft: 7
  }
});

export default VenuePromoterProfile;
