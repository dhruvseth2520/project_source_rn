import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ScrollView, View, TouchableOpacity, Text, Image, StyleSheet, FlatList } from 'react-native';

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
                      <View style={styles.nameContainer}>
                        <Text style={styles.name}>{promoter.firstName + " " + promoter.lastName[0] + "."}</Text>
                        <Text style={styles.role}>{promoter.promoterProfile.influence}</Text>
                      </View>

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
    marginRight: 5,
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
  },
  nameContainer: {
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 10,
    backgroundColor: '#9EDBD8',
    marginLeft: 0,
    marginTop: 35,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  name: {
    fontFamily: 'Avenir',
    fontWeight: '700',
    fontSize: 21,
    left: -5,
    color: 'white'
  },
  role: {
    fontFamily: 'Futura',
    fontWeight: '600',
    color: 'white',
    left: -5,
    fontSize: 12,
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
