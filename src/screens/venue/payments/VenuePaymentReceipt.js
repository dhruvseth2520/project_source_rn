import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const VenuePaymentReceipt = ({ route }) => {
  const navigation = useNavigation();
  const title = route.params.title;
  const detail = route.params.detail;
  return (
    <ScrollView style={styles.background}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{detail}. A confirmation email with details has been sent to your business account</Text>

      <Text style={[styles.title, {fontSize: 24, marginTop: 20}]}>Invoice</Text>
      <View style={styles.receipt}>
        {route.params.receipt.map(payment => {
          return (
            <View style={{flexDirection: 'row', marginBottom: 20, borderColor: 'gray', borderTopWidth: (payment.label === "Total" ? 0.5 : 0)}}>
              <Text style={payment.label === "Total" ? [styles.label, {marginTop: 15}] : styles.label}>{payment.label}</Text>
              <Text style={payment.label === "Total" ? [styles.amount, {marginTop: 15}] : styles.amount}>{payment.amount}</Text>
            </View>
          )
        })}
      </View>

      <Text style={styles.disclaimer}>Please have your cash payment ready ahead of your scheduled pickup slot</Text>

      <FAB
        label="Finish"
        icon="briefcase-check"
        style={{backgroundColor: '#22D2C9', width: '77%', marginLeft: 39, marginTop: 25, marginBottom: 50}}
        color="white"
        onPress={() => navigation.navigate('VenueLedger')}
      />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    marginTop: 100,
    marginLeft: 45,
    width: '80%',
    fontFamily: 'Avenir',
    fontSize: 35,
    fontWeight: '400',
    marginBottom: 15,
    color: '#343434',
  },
  text: {
    fontFamily: 'Avenir',
    fontSize: 15,
    marginLeft: 45,
    width: '75%',
    marginTop: 10
  },
  receipt: {
    marginLeft: 46,
    width: '74%'
  },
  label: {
    width: '35%',
    fontSize: 15,
    fontFamily: 'Avenir',
    fontWeight: '500'
  },
  amount: {
    fontFamily: 'Avenir'
  },
  disclaimer: {
    fontFamily: 'Avenir',
    width: '75%',
    fontSize: 13,
    fontWeight: '300',
    marginLeft: 46
  }

})

export default VenuePaymentReceipt;
