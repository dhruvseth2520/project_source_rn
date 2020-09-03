import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const PromoterCard = ({ name, image }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image style={styles.profileImg} source={{uri: image}} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{name + ", 22"}</Text>
        <Text style={styles.role}>Student</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.circularBtn, {backgroundColor: '#148995'}]}>
            <Ionicons style={styles.btnIcon} name="ios-person"></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('VenueMessages')} style={[styles.circularBtn, {backgroundColor: '#4F4F4F'}]}>
            <Ionicons style={styles.btnIcon} name="ios-chatbubbles"></Ionicons>
          </TouchableOpacity>


        </View>

      </View>



    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 288,
    width: 183,
    marginRight: 8,
    flexDirection: 'column'
  },
  profileImg: {
    height: 192
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
    marginTop: 15,
    marginLeft: 5
  },
  name: {
    marginRight: 10,
    marginTop: 10,
    fontFamily: 'Avenir',
    fontWeight: '400',
    fontSize: 17
  },
  role: {
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 12,
    marginRight: 9
  },
  circularBtn: {
    borderRadius: 20,
    width: 24,
    height: 24,
    marginLeft: 5
  },
  btnIcon: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'white',
    marginTop: 3

  }
})

export default PromoterCard;
