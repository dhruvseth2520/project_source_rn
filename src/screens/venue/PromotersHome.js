import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PromoterCard from "../../components/PromoterCard";
import Header from "../../components/Header";
import { getData } from "../../utils/localStorage";
import env from "../../utils/environment";


const VenuePromotersHome = () => {
  const [promoters, setPromoters] = useState({});
  const [venue, setVenue] = useState({});

  useEffect(() => {
    fetch(`${env.API_URL}/api/promoters`).then(response => response.json()).then(data => {
      setPromoters(data);
    })
  }, [])

  useEffect(() => {
    getData('@venueFormData').then(data => setVenue(data));
  }, [])

  return (
          <ScrollView style={styles.background}>
                  <Header title="Promoters" />
                  <Image style={styles.heroImage} source={{uri: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'}} />
                  <Text style={styles.description}>Our network of young promoters will use their social media influence and personal network to get your {venue.venueCategory} the traffic you seek</Text>

                  <Text style={styles.subTitle}>Top Promoters in the area</Text>
                  <Text style={styles.comment}>Showing promoters near {venue.venueName}</Text>

                  <FlatList horizontal
                    style={styles.promoterList}
                    showsHorizontalScrollIndicator={false}
                    data={promoters}
                    keyExtractor={promoter => promoter._id}
                    renderItem={({ item }) => {
                      return <PromoterCard promoter={item}></PromoterCard>
                    }}
                  />
          </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1
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
  },
  promoterList: {
    marginLeft: 32,
    marginTop: 15,
    marginBottom: 35
  }

})

export default VenuePromotersHome;
