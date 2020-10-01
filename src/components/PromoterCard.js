import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ScrollView, View, TouchableOpacity, Text, Image, StyleSheet, FlatList } from 'react-native';
import BadgeModal from "./BadgeModal";

const PromoterCard = ({ promoter }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
        <TouchableOpacity onPress={() => navigation.navigate('VenuePromoterProfile', {
          promoter: promoter
        })}>
            <View style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image style={styles.profileImg} source={{uri: promoter.promoterProfile.images[0]}} />
                  </View>
                  <View style={styles.contentContainer}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.name}>{promoter.firstName + ", " + promoter.age}</Text>
                          {promoter.badge ? (
                            <>
                                <TouchableOpacity style={styles.badgeBtn} onPress={() => setModalVisible(true)}>
                                  <FontAwesome5 style={[styles.badgeIcon, {color: promoter.badge.color}]} name={promoter.badge.iconName}></FontAwesome5>
                                </TouchableOpacity>

                                <BadgeModal promoter={promoter} modalVisible={modalVisible} setModalVisible={setModalVisible} />
                            </>
                          ) : <></>}

                        </View>
                        <Text style={styles.role}>{promoter.promoterProfile.occupation}</Text>
                </View>
            </View>
        </TouchableOpacity>


    </>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 320,
    width: 190,
    marginRight: 8,
    flexDirection: 'column',
  },
  profileImg: {
    height: 320,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 2
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 100
  },
  name: {
    marginLeft: 12,
    marginTop: 10,
    fontFamily: 'Avenir',
    fontWeight: '700',
    fontSize: 17,
    color: 'white'
  },
  role: {
    fontFamily: 'Avenir',
    fontWeight: '500',
    color: 'white',
    fontSize: 11,
    marginLeft: 12
  },
  icon: {
    fontSize: 13,
    marginLeft: 8,
    marginTop: 7,
    color: '#1AA2B0',
    fontWeight: 'bold'
  },
  circularBtn: {
    borderRadius: 15,
    height: 32,
    width: 32,
    marginLeft: 5,
    borderColor: '#148995',
    borderWidth: 2,
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
