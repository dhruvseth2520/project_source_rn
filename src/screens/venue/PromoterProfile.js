import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, YellowBox } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import BadgeModal from "../../components/BadgeModal";
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
        <Image style={styles.headerImage} source={{uri: 'https://lh3.googleusercontent.com/proxy/GhCS9Pjba_X_yfUvXf137orze2vAzoAgRZjBSApnFnXWfV2x5P2-uNp-gRRNZrdGzUJXMjdBD4yfJ8KYijzCRW7A17InLqc-m8Pb11YF7F4J0ZFDqV7HBnzLiJTfLY9PC4VA3pPK8NMNnfykDs3xXdunt1i9cB3lqN__ynZGD-svOCqjAkqOF3aNYJtr'}}></Image>
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
                left={props => <List.Icon {...props} color="#606060" icon="calendar" />}
              />
              <List.Item
                title="Availability"
                description={promoterProfile.availability + " hours/week"}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#606060" icon="clock" />}
              />
              <List.Item
                title="Expected Rate"
                description={promoterProfile.expectedRate + " MMK/head"}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#606060" icon="coin" />}
              />
              <List.Item
                title="Languages"
                description={promoterProfile.languages}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#606060" icon="bullhorn" />}
              />
            </View>
            <View style={styles.col}>
              <List.Item
                title="Education"
                description={promoterProfile.education}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#606060" icon="school" />}
              />
              <List.Item
                title="Hobbies"
                description={promoterProfile.hobbies}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} color="#606060" icon="run" />}
              />
              <List.Item
                title="Favorite Drink"
                description={promoterProfile.favoriteDrink}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                left={props => <List.Icon {...props} icon="beer" color="#606060" />}
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
                <Image source={{uri: photo.source.uri}} style={styles.thumbnail}></Image>

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
  headerImage: {
    height: 420,
    width: '100%',
    left: -107,
    top: -165,
    position: 'absolute'
  },
  profileHeader: {
    marginTop: 60,
    alignSelf: 'center'
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
    width: 116,
    height: 180,
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 10
  }
});

export default VenuePromoterProfile;
