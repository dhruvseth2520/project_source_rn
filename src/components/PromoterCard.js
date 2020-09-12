import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
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
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>{promoter.firstName + ", 22"}</Text>
              <TouchableOpacity style={styles.badgeBtn} onPress={() => setModalVisible(true)}>
                <FontAwesome5 style={[styles.badgeIcon, {color: badge.color}]} name={badge.iconName}></FontAwesome5>
              </TouchableOpacity>
            </View>

            <Text style={styles.role}>Student</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.circularBtn} onPress={() => navigation.navigate('VenuePromoterProfile', {
                promoter: promoter,
                badge: badge
              })}>
                <FontAwesome5 style={styles.icon} name="user"></FontAwesome5>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('VenueMessages')} style={styles.circularBtn}>
                <FontAwesome5 style={styles.icon} name="comment"></FontAwesome5>
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
    flexDirection: 'column'
  },
  profileImg: {
    height: 206,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  imageContainer: {
    flex: 2
  },
  contentContainer: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
    alignItems: 'flex-start'
  },
  buttonContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 5
  },
  name: {
    marginLeft: 12,
    marginTop: 10,
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 17
  },
  role: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 11,
    marginLeft: 12
  },
  icon: {
    fontSize: 13,
    marginLeft: 9,
    marginTop: 8,
    color: '#148995'
  },
  circularBtn: {
    borderRadius: 17,
    height: 32,
    width: 32,
    marginLeft: 5,
    backgroundColor: 'white',
    borderColor: '#10737C',
    borderWidth: 1
  },
  badgeBtn: {
    marginTop: 9,
    marginLeft: 6
  },
  badgeIcon: {
    fontSize: 22,
    marginRight: 8
  }
})

export default PromoterCard;
