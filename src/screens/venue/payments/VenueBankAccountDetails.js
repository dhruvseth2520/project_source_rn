import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const VenueBankAccountDetails = ({ route }) => {
  const bank = route.params.bank;
  const balance = route.params.balance;
  const navigation = useNavigation();

  return (
      <ScrollView style={styles.background}>
        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <Entypo name="chevron-small-left" size={44} />
        </TouchableOpacity>
        <Text style={styles.title}>Wire Transfer Details</Text>
        <View style={styles.detailContainer}>
          <Text style={[styles.text, {fontSize: 18}]}>{bank} Bank</Text>
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
      marginTop: 55,
      marginLeft: 45,
      width: '80%',
      fontFamily: 'Gill Sans',
      fontSize: 35,
      fontWeight: '400',
      marginBottom: 15,
      color: '#343434',
    },
    disclaimer: {
      fontFamily: 'Avenir',
      marginLeft: 48,
      fontWeight: '100',
      width: '90%'
    },
    detailContainer: {
      borderRadius: 15,
      width: '72%',
      marginTop: 10,
      marginLeft: 48,
      padding: 15,
      backgroundColor: 'white',
      shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    text: {
      fontFamily: 'Avenir'
    }
})

export default VenueBankAccountDetails;
