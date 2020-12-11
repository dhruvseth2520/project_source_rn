import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, YellowBox, Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import BadgeModal from "../../../components/BadgeModal";
import ImageView from 'react-native-image-view';
import { List } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';


const VenuePromoterProfile = ({ route }) => {
  const { promoter } = route.params;
  const promoterProfile = promoter.promoterProfile;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);

  const windowWidth = Dimensions.get('window').width;

  console.disableYellowBox = true;

  let images = [];
  promoterProfile.images.forEach(image => {
    images.push({
        source: {
            uri: image,
        },
        width: 806,
        height: 720,
    })
  });

  return (
    <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={44} />
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <Image style={{width: windowWidth, height: 420, position: 'absolute', top: -150}} source={require('../../../assets/profile-gradient.png')}></Image>
        <Image style={styles.profileImage} source={{uri: promoterProfile.images[0]}} />
        <Text style={styles.title}>{promoter.firstName + ", " + promoter.age}</Text>
        <Text style={[styles.title, {fontSize: 18, top: 30}]}>{promoterProfile.occupation}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.statValue}>{promoterProfile.guestCount}</Text>
          <Text style={styles.statLabel}>Clients Sourced</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statValue}>11</Text>
          <Text style={styles.statLabel}>Positive Reviews</Text>
        </View>
        <View style={[styles.statsBox, {borderRightWidth: 0}]}>
          <Text style={styles.statValue}>{promoterProfile.numConnections}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => setProfileVisible(true)}><Text style={profileVisible ? styles.active : styles.btnText}>
            Profile
          </Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setProfileVisible(false)} style={{marginLeft: 15}}><Text style={!profileVisible ? styles.active : styles.btnText}>
            Gallery
          </Text></TouchableOpacity>
        </View>

        {profileVisible ? (
          <View style={styles.profileDetails}>
            <View style={styles.col}>
              <List.Item
                title="Active Since"
                description={promoterProfile.activeSinceDate}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#4F4F4F" icon="calendar" />}
              />
              <List.Item
                title="Availability"
                description={promoterProfile.availability + " hours/week"}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#4F4F4F" icon="clock" />}
              />
              <List.Item
                title="Expected Rate"
                description={promoterProfile.expectedRate + " MMK/head"}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#4F4F4F" icon="coin" />}
              />
              <List.Item
                title="Languages"
                description={promoterProfile.languages}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#4F4F4F" icon="microphone" />}
              />
            </View>
            <View style={styles.col}>
              <List.Item
                title="Education"
                description={promoterProfile.education}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#4F4F4F" icon="school" />}
              />
              <List.Item
                title="Hobbies"
                description={promoterProfile.hobbies}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#4F4F4F" icon="run" />}
              />
              <List.Item
                title="Favorite Drink"
                description={promoterProfile.favoriteDrink}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} icon="beer" color="#4F4F4F" />}
              />
            </View>
          </View>
        ) : (
          <View style={styles.imageContainer}>
            {images.map((photo, index) => (
              <TouchableOpacity onPress={() => {
                setImageIndex(index);
                setImageModalVisible(true);
              }}>
                <Image source={{uri: photo.source.uri}} style={[styles.thumbnail, {width: windowWidth * 0.27}]}></Image>
              </TouchableOpacity>
            ))}
            <ImageView
                images={images}
                imageIndex={imageIndex}
                isVisible={imageModalVisible}
                isSwipeCloseEnabled={false}
                onClose={() => setImageModalVisible(false)}
            />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white'
  },
  backArrow: {
    top: 50,
    left: 10,
    zIndex: 1
  },
  profileHeader: {
    marginTop: 60,
    alignItems: 'center'
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Gill Sans',
    fontWeight: '300',
    top: 22,
    alignSelf: 'center'
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 65,
    width: '90%'
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    borderRightWidth: 0.5
  },
  statValue: {
    fontSize: 22,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300'
  },
  statLabel: {
    fontFamily: 'Avenir',
    color: "#52575d",
    top: 3
  },
  bodyContainer: {
    marginTop: 35,
    left: 37
  },
  btnText: {
    fontFamily: 'Avenir',
    fontSize: 16
  },
  active: {
    fontFamily: 'Avenir',
    fontSize: 16,
    color: '#1AA2B0',
  },
  profileDetails: {
    marginLeft: -15,
    marginTop: 10,
    marginBottom: 50,
    flexDirection: 'row'
  },
  col: {
    width: '43%'
  },
  listTitle: {
    marginLeft: -15,
    fontFamily: 'Avenir',
    fontSize: 16
  },
  listDescription: {
    marginLeft: -15,
    fontFamily: 'Avenir',
    top: 2,
    fontSize: 15
  },
  imageContainer: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 50
  },
  thumbnail: {
    height: 180,
    width: 110,
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 10
  }
});

export default VenuePromoterProfile;
