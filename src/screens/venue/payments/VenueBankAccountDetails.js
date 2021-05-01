import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Clipboard, Alert } from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getData } from "../../../utils/localStorage";
import { FAB } from "react-native-paper";


const VenueBankAccountDetails = ({ route }) => {
  const bankDetails = route.params.bank;
  const balance = route.params.balance;
  const [reference, setReference] = useState("");
  const navigation = useNavigation();

  let cardBGPath;
  switch (bankDetails.name) {
    case "KBZ Bank":
      cardBGPath = require('../../../assets/KBZ.jpg');
      break;
    case "Yoma Bank":
      cardBGPath = require('../../../assets/Yoma.jpg');
      break;
    case "CB Bank":
      cardBGPath = require('../../../assets/CB.jpg');
      break;
    case "AYA Bank":
      cardBGPath = require('../../../assets/AYA.jpg');
      break;
  }

  useEffect(() => {
    getData('@venueFormData').then(response => {
      const venueId = response._id;
      setReference(response.venueName.replace(" ", "-") + "-" + venueId.substring(venueId.length - 5, venueId.length));
    })
  }, [])

  const copyText = (text, item) => {
    Clipboard.setString(text);
    Alert.alert(item + " copied to clipboard");
  }

  return (
      <ScrollView style={styles.background}>
        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <Entypo name="chevron-small-left" size={44} />
        </TouchableOpacity>

        <Text style={styles.title}>Payment Details</Text>

        <View style={styles.creditCard}>
          <Image source={cardBGPath} style={styles.cardBG} />
          <View style={styles.cardContent}>
            <Image source={require('../../../assets/creditcardchip.png')} style={{width: 40, height: 40, left: -8, top: -5, position: 'absolute'}} />

            <Text style={styles.bankLabel}>{bankDetails.name}</Text>
            <View style={{marginTop: 20}}>
              <Text style={{color: 'white', fontFamily: 'Avenir'}}>Account Number</Text>
              <Text selectable style={{color: 'white', fontFamily: 'Gill Sans', top: 5, fontSize: 25}}>{bankDetails.bankAccountNumber}</Text>
            </View>

            <View style={{flexDirection: 'row', top: 25}}>
              <View style={{width: '30%'}}>
                <Text style={{color: 'white', fontFamily: 'Avenir'}}>Branch</Text>
                <Text style={{color: 'white', fontFamily: 'Gill Sans', top: 3, fontSize: 16}}>{bankDetails.branch}</Text>
              </View>
              <View style={{width: '70%'}}>
                <Text style={{color: 'white', fontFamily: 'Avenir'}}>Beneficiary Email</Text>
                <Text selectable style={{color: 'white', fontFamily: 'Gill Sans', top: 3, fontSize: 16}}>projectsourcemm@gmail.com</Text>
              </View>

            </View>
          </View>
        </View>

        <View style={styles.tile}>
          <View style={styles.cardContent}>
            <View style={{marginTop: 15}}>
              <Text style={{color: '#5E5E5E', fontFamily: 'Avenir'}}>Pending Balance</Text>
              <Text style={{color: '#5E5E5E', fontFamily: 'Gill Sans', fontSize: 24, top: 3}}>{balance} MMK</Text>
            </View>

            <View style={{marginTop: 15}}>
              <Text style={{color: '#5E5E5E', fontFamily: 'Avenir'}}>Reference</Text>
              <Text selectable style={{color: '#5E5E5E', fontFamily: 'Gill Sans', fontSize: 24, top: 3}}>{reference}</Text>
            </View>

            <Text style={{color: '#5E5E5E', fontFamily: 'Avenir', fontSize: 12, top: 15}}>Please include this reference code with your transaction</Text>
          </View>
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
      marginBottom: 10,
      color: '#343434',
    },
    tile: {
      width: '80%',
      left: 5,
      marginTop: 20,
      height: 215,
      borderRadius: 20,
      backgroundColor: '#EDEDED',
      alignSelf: 'center'
    },
    disclaimer: {
      fontFamily: 'Avenir',
      marginLeft: 47,
      fontWeight: '100',
      width: '80%'
    },
    creditCard: {
      borderRadius: 20,
      marginTop: 10,
      marginLeft: 5,
      height: 215,
      alignSelf: 'center',
      width: '80%'
    },
    cardBG: {
      height: 215,
      width: '100%',
      position: 'absolute',
      borderRadius: 20
    },
    cardContent: {
      marginTop: 20,
      left: -5,
      marginBottom: 30,
      width: '80%',
      alignSelf: 'center'
    },
    bankLabel: {
      alignSelf: 'flex-end',
      fontSize: 24,
      marginTop: 2,
      fontFamily: 'Gill Sans',
      color: 'white'
    }
})

export default VenueBankAccountDetails;
