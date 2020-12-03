import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';


const VenuePaymentScreen = ({ payment }) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  let descriptionFontSize = 13;
  if (windowWidth < 400) {
    descriptionFontSize = 12;
  }


  return (
    <View style={styles.background}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={44} />
      </TouchableOpacity>
      <Text style={styles.title}>Choose a payment method</Text>

      <View style={styles.methodContainer}>
        <TouchableOpacity>
          <View style={styles.methodCard}>
            <FontAwesome5 name="money-bill" style={[styles.methodIcon, {color: '#85bb65'}]}></FontAwesome5>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Cash</Text>
              <Text style={[styles.description, {fontSize: descriptionFontSize}]}>Pay your outstanding balance in cash. Schedule a pickup time and we'll send someone to collect your payment</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.methodCard}>
            <FontAwesome5 name="credit-card" style={[styles.methodIcon, {color: '#B83D23'}]}></FontAwesome5>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Debit or Credit Card</Text>
              <Text style={[styles.description, {fontSize: descriptionFontSize}]}>Pay through a debit or credit card. All transactions are processed through Stripe and incur a 2% fee</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.methodCard}>
            <FontAwesome5 name="university" style={[styles.methodIcon, {color: '#C4C4B1'}]}></FontAwesome5>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Wire Transfer</Text>
              <Text style={[styles.description, {fontSize: descriptionFontSize}]}>Pay via wire transfer through your bank. We accept 7+ leading banking institutions</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    marginLeft: 45,
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
