import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VenuePromoterProfile = ({ route }) => {
  const { name, imageUrl } = route.params;
  return (
    <View>
      <Text style={{"marginTop": 50}}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default VenuePromoterProfile;
