import React from 'react'
import { Text, View, Image, TouchableOpacity, Button } from 'react-native'
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';


export default () => {
  const navigation = useNavigation();
  const toRegister = () => {
    navigation.navigate('PromoterRegister');
  }

  return (<Swiper style={styles.wrapper}
     showsButtons={false}
     loop={false}
     activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
    <View style={styles.slide1}>
      <Image style={styles.image} source={require('../../assets/promotersCartoon.png')} />
      <Text style={styles.text}>As a promoter, you can</Text>
      <TouchableOpacity style={styles.skipButton} onPress={toRegister}>
        <Text style={styles.btnText}>Skip</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.slide2}>
      <Image style={styles.image} source={require('../../assets/eventsCartoon.png')} />
      <Text style={styles.text}>View upcoming promotional events hosted by venues in your area</Text>
      <TouchableOpacity style={styles.skipButton} onPress={toRegister}>
        <Text style={styles.btnText}>Skip</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.slide3}>
      <Image style={{width: 260, height: 260, marginBottom: 50}} source={{uri: 'https://795364.smushcdn.com/1538781/wp-content/uploads/10-Social-Media-Marketing.png?lossy=1&strip=1&webp=1'}} />

      <Text style={styles.text}>Share these events with your friends, family and social network</Text>
      <TouchableOpacity style={styles.skipButton} onPress={toRegister}>
        <Text style={styles.btnText}>Skip</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.slide4}>
      <Image style={styles.image} source={require('../../assets/payment.png')} />
      <Text style={styles.text}>Get paid for every guest you bring in</Text>
      <TouchableOpacity style={styles.skipButton} onPress={toRegister}>
        <Text style={styles.btnText}>Done</Text>
      </TouchableOpacity>
    </View>

  </Swiper>)

}

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DAFEB'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B29DEB'
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D99DEB'
  },
  slide5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EB9DD6'
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Futura',
    fontWeight: '700',
    width: '80%'
  },
  image: {
    width: 360,
    height: 200,
    marginBottom: 50
  },
  skipButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 55,
    left: 40
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  }
}
