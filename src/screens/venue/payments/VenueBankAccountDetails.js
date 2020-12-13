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

        <Text style={styles.title}>Account Details</Text>
        <Text style={styles.disclaimer}>Wire your pending balance, {balance} MMK, to the bank account detailed below</Text>
        <View style={styles.detailContainer}>
          <View style={{flexDirection: 'row'}}>
            <Image source={{uri: bankDetails["image"]}} style={styles.logo}></Image>
            <Text style={[styles.text, {fontSize: 18, marginTop: 3}]}>{bankDetails["name"]}</Text>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.label}>Account Number</Text>
              <Text style={styles.value}>{bankDetails.bankAccountNumber}</Text>
              <TouchableOpacity style={styles.copyBtn} onPress={() => copyText(bankDetails.bankAccountNumber, "Account number")}>
                <FontAwesome5 name="copy" color="#1AB0A8" style={{fontSize: 10, alignSelf: 'center', left: 1}}></FontAwesome5>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Account Branch</Text>
              <Text style={styles.value}>{bankDetails.branch}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Beneficiary Email</Text>
              <Text style={styles.value}>projectsourcemm@gmail.com</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Reference</Text>
              <Text style={styles.value}>{reference}</Text>
              <TouchableOpacity style={styles.copyBtn} onPress={() => copyText(reference, "Reference code")}>
                <FontAwesome5 name="copy" color="#1AB0A8" style={{fontSize: 10, alignSelf: 'center', left: 1}}></FontAwesome5>
              </TouchableOpacity>
            </View>
            <Text style={styles.comment}>Please include this reference code in the user reference or comment field with your transaction</Text>
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
      marginBottom: 15,
      color: '#343434',
    },
    invoice: {
      marginTop: 5,
      width: '80%',
      marginLeft: 47
    },
    invoiceLabel: {
      fontSize: 15,
      width: '18%',
      fontFamily: 'Avenir',
      fontWeight: '500'
    },
    invoiceValue: {
      fontFamily: 'Avenir',
      marginLeft: 30
    },
    disclaimer: {
      fontFamily: 'Avenir',
      marginLeft: 47,
      fontWeight: '100',
      width: '80%'
    },
    detailContainer: {
      borderRadius: 5,
      width: '79%',
      marginTop: 20,
      marginLeft: 48,
      padding: 15,
      backgroundColor: 'white',
      shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    text: {
      fontFamily: 'Avenir'
    },
    logo: {
      height: 30,
      width: 30,
      marginRight: 8
    },
    table: {
      marginTop: 15,
      marginBottom: 5
    },
    row: {
      flexDirection: 'row',
      marginLeft: 4,
      marginBottom: 15
    },
    label: {
      fontFamily: 'Avenir',
      width: '41%'
    },
    value: {
      fontFamily: 'Avenir',
      color: '#5F5F5F'
    },
    comment: {
      fontFamily: 'Avenir',
      fontSize: 13,
      marginLeft: 5,
      color: '#737373'
    },
    copyBtn: {
      borderRadius: 14,
      width: 25,
      height: 25,
      borderColor: '#1AB0A8',
      borderWidth: 1,
      backgroundColor: 'white',
      marginLeft: 7,
      padding: 6,
      marginTop: -4
    }
})

export default VenueBankAccountDetails;
