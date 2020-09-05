import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, View, TouchableOpacity, Text, Image, StyleSheet, FlatList } from 'react-native';
import BadgeModal from "./BadgeModal";

const PromoterCard = ({ promoter }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [badge, setBadge] = useState({});

  let iconName;
  let color;

  if (promoter.badgeTitle === "Followers") {
    iconName = "hashtag";
    color = "#E1306C";
  } else if (promoter.badgeTitle === "Traffic") {
    iconName = "award";
    color = "#FFAA00";
  }

  useEffect(() => {
    setBadge({
      badgeTitle: promoter.badgeTitle,
      iconName,
      color
    });
  }, [])


  return (
    <>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image style={styles.profileImg} source={{uri: promoter.images[0]}} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{promoter.firstName + ", 22"}</Text>
            <Text style={styles.role}>Student</Text>
            <TouchableOpacity style={styles.badgeBtn} onPress={() => setModalVisible(true)}>
              <FontAwesome5 style={[styles.badgeIcon, {color: badge.color}]} name={badge.iconName}></FontAwesome5>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.circularBtn, {width: 43}]} onPress={() => navigation.navigate('VenuePromoterProfile', {
                promoter: promoter,
                badge: badge
              })}>
                <Text style={styles.btnText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('VenueMessages')} style={[styles.circularBtn, {width: 56}]}>
                <Text style={styles.btnText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <BadgeModal name={promoter.firstName} badge={badge} modalVisible={modalVisible} setModalVisible={setModalVisible} />

    </>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 309,
    width: 183,
    marginRight: 8,
    flexDirection: 'column',
  },
  profileImg: {
    height: 206
  },
  imageContainer: {
    flex: 2
  },
  contentContainer: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 0.5,
    alignItems: 'flex-end'
  },
  buttonContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 5
  },
  name: {
    marginRight: 10,
    marginTop: 10,
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 17
  },
  role: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 11,
    marginRight: 9
  },
  circularBtn: {
    borderRadius: 2,
    height: 24,
    marginLeft: 5,
    backgroundColor: 'white',
    borderColor: '#4F4F4F',
    borderWidth: 0.5
  },
  btnText: {
    fontSize: 12,
    fontFamily: "Avenir",
    color: "#4F4F4F",
    fontWeight: "300",
    marginTop: 5,
    marginLeft: 5
  },
  badgeBtn: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10
  },
  badgeIcon: {
    fontSize: 22,
    marginRight: 8
  }
})

export default PromoterCard;
