import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

const VenuePaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  let descriptionFontSize = 13;
  if (windowWidth < 400) {
    descriptionFontSize = 12;
  }

  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={44} />
      </TouchableOpacity>
      <Text style={styles.title}>Choose a payment method</Text>

      <View style={styles.methodContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('VenuePaymentDetails', {method: 'cash', balance: route.params.balance})}>
          <View style={styles.methodCard}>
            <FontAwesome5 name="money-bill" style={[styles.methodIcon, {color: '#85bb65'}]}></FontAwesome5>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Cash</Text>
              <Text style={[styles.description, {fontSize: descriptionFontSize}]}>Pay your outstanding balance in cash. Schedule a pickup time and we'll send someone to collect your payment</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('VenuePaymentDetails', {method: 'wire transfer', balance: route.params.balance})}>
          <View style={styles.methodCard}>
            <FontAwesome5 name="university" style={[styles.methodIcon, {color: '#C4C4B1'}]}></FontAwesome5>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Wire Transfer</Text>
              <Text style={[styles.description, {fontSize: descriptionFontSize}]}>Pay via wire transfer through your bank. We accept 4 leading banking institutions</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.methodCard}>
            <FontAwesome5 name="share-alt" style={[styles.methodIcon, {color: '#FFC21A'}]}></FontAwesome5>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Wave Money</Text>
              <Text style={[styles.description, {fontSize: descriptionFontSize}]}>Pay via Wave Money mobile transfer. WavePay account required</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1
  },
  backArrow: {
    top: 50,
    left: 10,
    zIndex: 1
  },
  title: {
    marginTop: 50,
    marginLeft: 50,
    width: '80%',
    fontFamily: 'Futura',
    fontSize: 35,
    fontWeight: '400',
    marginBottom: 20,
    color: '#343434',
  },
  methodContainer: {
    width: '80%',
    marginTop: 20,
    marginLeft: 42
  },
  methodCard: {
    height: 105,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row'
  },
  cardContent: {
    marginLeft: 25,
    marginTop: 13,
    width: '74%'
  },
  methodIcon: {
    fontSize: 32,
    alignSelf: 'flex-start',
    marginTop: 35,
    marginLeft: 20
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Avenir',
  },
  description: {
    marginTop: 3,
    fontFamily: 'Avenir'
  }
})

export default VenuePaymentScreen;
