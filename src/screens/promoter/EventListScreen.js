import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView, Text } from 'react-native';

const PromoterEventListScreen = ({ navigation }) => {

    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.title}>Events</Text>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "white",
    },
    title: {
      marginTop: 100,
      left: 33,
      fontFamily: 'Gill Sans',
      fontSize: 36,
      fontWeight: '400',
      marginBottom: 20,
      color: '#212121',
    },

})

export default PromoterEventListScreen;
