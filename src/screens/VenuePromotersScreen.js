import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';


const VenuePromotersScreen = ({ route }) => {
  return (
    <ScrollView style={styles.background}>
      <Text style={styles.title}>Promoters</Text>

      <Image style={styles.heroImage} source={{uri: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'}} />
      <Text style={styles.description}>Our network of young promoters will use their social media influence and personal network to get your {route.params.formData.category} the traffic you seek</Text>

      <Text style={styles.subTitle}>Promoters in your area</Text>
      <Text style={styles.comment}>Showing promoters near {route.params.formData.venueAddress}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 33,
    marginTop: 70
  },
  subTitle: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 33,
    marginTop: 30
  },
  description: {
    fontFamily: 'Gill Sans',
    fontWeight: '300',
    color: '#424242',
    marginLeft: 32,
    marginTop: 15,
    paddingRight: 25,
    fontSize: 15
  },
  heroImage: {
    width: 350,
    height: 200,
    marginTop: 20,
    marginLeft: 32
  },
  comment: {
    marginTop: 8,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    marginLeft: 33,
    fontSize: 13,
    color: '#424242',
  }
})

export default VenuePromotersScreen;
