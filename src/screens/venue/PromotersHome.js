import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import PromoterCard from "../../components/PromoterCard";
import Header from "../../components/Header";
import { getData } from "../../utils/localStorage";
import { FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import env from "../../utils/environment";
import FilterGrid from "../../components/FilterGrid";

// On press of hide advanced search all filters should be reset

const VenuePromotersHome = () => {
  const [promoters, setPromoters] = useState([]);
  const [promoterData, setPromoterData] = useState([]);
  const [query, setQuery] = useState("");
  const [venue, setVenue] = useState({});
  const [visible, setVisible] = useState(false);
  const [price, setPrice] = useState({
    active: false,
    displayValue: 5000,
    filterValue: 5000
  });
  const [availability, setAvailability] = useState({
    active: false,
    displayValue: 3,
    filterValue: 3
  })
  const [connections, setConnections] = useState({
    active: false,
    displayValue: 100,
    filterValue: 100
  })

  useEffect(() => {
    fetch(`${env.API_URL}/api/promoters`).then(response => response.json()).then(data => {
      setPromoterData(data);
      setPromoters(data);
    })
  }, [])


  // Try doing query and filters together, filter promoters by query name and any active filters all in one function instead of using 2 different functions for handleSearch and filters
  useEffect(() => {
    setPromoters(handleSearch());
  }, [query, price, availability, connections])

  useEffect(() => {
    getData('@venueFormData').then(data => setVenue(data));
  }, [])

  const handleSearch = () => {
      let filteredPromoters = [];
      promoterData.forEach(promoter => {
        const nameMatch = promoter.firstName.toLowerCase().trim().startsWith(query.toLowerCase().trim());
        const priceMatch = promoter.promoterProfile.expectedRate <= price.filterValue;
        const availabilityMatch = promoter.promoterProfile.availability >= availability.filterValue;
        const connectionsMatch = promoter.promoterProfile.numConnections >= connections.filterValue;

        if (nameMatch && priceMatch && availabilityMatch && connectionsMatch) {
          filteredPromoters.push(promoter);
        }
      })
      return filteredPromoters;

  }

  return (
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
                  <Header title="Promoters" />
                  <Image style={styles.heroImage} source={{uri: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'}} />
                  <Text style={styles.description}>Our network of young promoters will use their social media influence and personal network to get your {venue.venueCategory} the traffic you seek</Text>

                  <Text style={styles.subTitle}>Top Promoters in the area</Text>
                  <View style={styles.searchBar}>
                    <Image source={require('../../assets/searchIcon.png')} style={styles.searchIcon}/>

                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search Promoters"
                      autoCorrect={false}
                      value={query}
                      onChangeText={(val) => setQuery(val)}>
                    </TextInput>
                  </View>

                  {visible ? <FilterGrid
                    price={price} setPrice={setPrice}
                    availability={availability} setAvailability={setAvailability}
                    connections={connections} setConnections={setConnections}
                  />
                   : <></>}


                  <Button icon="account-search" compact={true}
                    color="#26A5B2"
                    style={{alignSelf: 'flex-start', left: 25}}
                    labelStyle={{fontFamily: 'Futura', fontSize: 11}}
                    onPress={() => setVisible(!visible)}>
                    {visible ? "Hide Advanced Search" :
                    "Advanced Search"}
                  </Button>


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
          </KeyboardAvoidingView>
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
  promoterList: {
    marginLeft: 32,
    marginTop: 5,
    marginBottom: 35
  },
  searchBar: {
    width: 345,
    height: 45,
    left: 33,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    flexDirection: 'row'
  },
  searchInput: {
    left: 14,
    top: 8,
    width: '80%',
    height: 30,
    fontSize: 16,
    fontFamily: 'Avenir',
    padding: 5,
    fontWeight: '300'
  },
  searchIcon: {
    top: 10,
    left: 9,
    width: 25,
    height: 25
  }
})

export default VenuePromotersHome;
