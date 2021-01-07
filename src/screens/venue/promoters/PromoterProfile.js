import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, Image, ImageBackground, StyleSheet, Modal, FlatList, TouchableOpacity, YellowBox, Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import ImageView from 'react-native-image-view';
import { List } from 'react-native-paper';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

const Detail = ({ label, value, icon, maxLines }) => {
  return (
    <View style={{width: '33.3%'}}>
      <View style={{backgroundColor: '#F0F1F3', height: 50, width: 50, borderRadius: 25, marginLeft: 26, alignItems: "center"}}>
        <FontAwesome5 name={icon} style={{fontSize: 18, top: 14, color: '#13958E'}}/>
      </View>
      <Text style={{fontFamily: 'Avenir', marginTop: 12, fontWeight: '500', fontSize: 15, marginLeft: 15, color: '#1AB0A8'}}>{label}</Text>
      <Text numberOfLines={maxLines ? maxLines : 2} style={{fontFamily: 'Avenir', marginLeft: 16, fontSize: 13, marginTop: 5, color: '#4D4D4D', width: '50%'}}>{value}</Text>
    </View>
  )
}

const VenuePromoterProfile = ({ route }) => {
  const { promoter } = route.params;
  const promoterProfile = promoter.promoterProfile;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  let imageURL, content, imageWidth, imageHeight;
  switch (promoterProfile.influence) {
    case "Loyalist":
      imageURL = 'https://image.freepik.com/free-vector/best-friends-toasting-together_23-2148394378.jpg';
      content = "The Loyalist might not have the largest social media presence but they have a tight inner network and will be a committed affiliate to your venue. The Loyalist will not only promote your events within their circle but also be at your venue with their friends every night you have an event";
      imageWidth = 160; imageHeight = 150;
      break;
    case "Advocate":
      imageURL = 'https://weebdigital.com/images/aff3.png';
      content = "The Advocate has a growing social media presence and influence in multiple different social groups in the city. They will ensure you get the footfall you are looking for by sharing your events with their network via social media and word of mouth";
      imageWidth = 180; imageHeight = 140;
      break;
    case "Influencer":
      imageURL = 'https://digitalprworld.com/wp-content/uploads/2017/11/influencer-marketing-package.jpg';
      content = "The Influencer has an established and an avid following on social media. They have the reach and influence to get hoards of people excited about your events and through your front door";
      imageWidth = 200; imageHeight = 100;
      break;
  }

  const windowWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" style={{color: 'white'}} size={44} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Image source={{uri: promoterProfile.images[0]}} style={styles.profileImage} />
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>{promoter.firstName + " " + promoter.lastName[0] + "."}</Text>
              <Text style={styles.age}>{promoter.age}</Text>
            </View>

            <Text style={styles.bio}>"{promoterProfile.bio}"</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statsBox, {width: '29%'}]}>
            <Text style={styles.statValue}>
              {promoterProfile.guestCount}
            </Text>
            <Text style={styles.statLabel}>
              Clients Sourced
            </Text>
          </View>
          <View style={[styles.statsBox, {width: '33%'}]}>
            <Text style={styles.statValue}>
              {promoterProfile.expectedRate}
            </Text>
            <Text style={styles.statLabel}>
              Expected Rate (MMK)
            </Text>
          </View>
          <View style={[styles.statsBox, {width: '33%'}]}>
            <Text style={styles.statValue}>
              {promoterProfile.availability} hrs
            </Text>
            <Text style={[styles.statLabel, {left: 4}]}>
               Weekly Availability
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.badgeContainer}>
        <Text style={{fontFamily: 'Avenir', fontSize: 15, color: 'white', marginTop: -5}}>Influence Badge</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.badgeTitle}>{promoterProfile.influence}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{height: 20, width: 20, marginTop: 7, marginLeft: 7}}>
            <FontAwesome5 name="info-circle" style={{color: 'white', alignSelf: 'center', fontSize: 19, top: 3}}></FontAwesome5>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.bodyContainer}>
        <View style={{flexDirection: 'row', marginLeft: 30}}>
          <Detail label="Active Since" value={promoterProfile.activeSinceDate} icon="calendar-alt" />
          <Detail label="Occupation" value={promoterProfile.occupation} icon="briefcase" />
          <Detail label="Education" value={promoterProfile.education} icon="university" />
        </View>
        <View style={{flexDirection: 'row', marginLeft: 30, marginTop: 35}}>
          <Detail label="Languages" value={promoterProfile.languages} icon="language" />
          <Detail label="Hobbies" value={promoterProfile.hobbies} icon="skiing" maxLines={3} />
          <Detail label="Favorite Drink" value={promoterProfile.favoriteDrink} icon="glass-cheers" />
        </View>
      </View>

      <View style={styles.galleryContainer}>
        <Text style={styles.title}>{promoter.firstName}'s Photos</Text>
        <View style={styles.photoContainer}>
          <FlatList
            keyExtractor={photo => photo}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={promoterProfile.images}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{uri: item}} style={styles.image}></Image>
              </View>
            )}
          />
        </View>
      </View>

        <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                    <FontAwesome5 name="times" style={{fontSize: 15, color: 'gray', alignSelf: 'center', top: 7}} />
                  </TouchableOpacity>

                  <View style={styles.modalContent}>
                    <Image source={{uri: imageURL}} style={[styles.badgeIcon, {width: imageWidth, height: imageHeight}]} />
                    <Text style={styles.modalTitle}>The {promoterProfile.influence}</Text>
                    <Text style={styles.modalText}>{content}</Text>
                  </View>
                </View>
              </View>
            </Modal>
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
    zIndex: 1,
    position: 'absolute'
  },
  headerContainer: {
    paddingVertical: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#A9E1DE'
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: 110,
    marginLeft: 50
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white'
  },
  name: {
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    maxWidth: '75%',
    marginTop: 10,
    marginLeft: 22,
    fontSize: 30,
    color: 'white'
  },
  age: {
    fontFamily: 'Gill Sans',
    fontSize: 20,
    marginLeft: 15,
    marginTop: 18,
    color: 'white',
    fontWeight: '400'
  },
  bio: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    marginTop: 5,
    marginLeft: 22,
    fontWeight: '400',
    color: 'white'
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 40,
    marginTop: 15,
    marginBottom: 60,
    width: '86%',
  },
  statsBox: {
    padding: 10,
  },
  statValue: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 22,
    color: 'white'
  },
  statLabel: {
    fontFamily: 'Avenir',
    color: 'white',
    marginTop: 4,
    fontWeight: '500'
  },
  badgeContainer: {
    paddingHorizontal: 25,
    paddingVertical: 22,
    backgroundColor: '#8DD7D3',
    alignSelf: 'flex-end',
    width: '70%',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: -45
  },
  badgeTitle: {
    fontFamily: 'Futura',
    color: 'white',
    marginTop: 3,
    fontSize: 25
  },
  bodyContainer: {
    marginTop: 40,
    width: '95%'
  },
  galleryContainer: {
    marginTop: 35,
    marginLeft: 30,
    width: '85%',
    marginBottom: 50,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Gill Sans',
    fontWeight: '300',
    color: '#464646',
    fontSize: 24
  },
  photoContainer: {
    marginTop: 20
  },
  imageContainer: {
    height: 241,
    marginRight: 15,
    borderRadius: 5,
    width: 151,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 7,
    },
    shadowOpacity: 0.31,
    shadowRadius: 3,
    elevation: 14,
  },
  image: {
    height: 240,
    width: 150,
    borderRadius: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: '65%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    left: 5,
    top: 15,
    width: 40,
    height: 40,
  },
  modalContent: {
    marginTop: 10
  },
  modalTitle: {
    fontFamily: 'Gill Sans',
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 25
  },
  badgeIcon: {
    alignSelf: 'center',
    borderRadius: 8,
  },
  modalText: {
    marginTop: 15,
    color: '#454545',
    textAlign: 'center',
    fontFamily: 'Avenir'
  }

});

export default VenuePromoterProfile;
