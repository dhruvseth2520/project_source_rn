import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PromoterSavedEvents = () => {
  return (
      <ScrollView style={styles.screen}>
          <Text style={styles.title}>Saved</Text>

      </ScrollView>
  )
};

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
      color: '#2A2A2A',
    }
}); 

export default PromoterSavedEvents;
