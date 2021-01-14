import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import PromoterCard from "../../../components/PromoterCard";
import Header from "../../../components/Header";
import { useNavigation } from '@react-navigation/native';
import Jumbotron from "../../../components/Jumbotron";

import { getData } from "../../../utils/localStorage";
import { FontAwesome5 } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { Button } from 'react-native-paper';
import env from "../../../utils/environment";
import { PromotersFilterGrid } from "../../../components/FilterGrid";
import { getPromoters } from '../../../serverSDK/api'


const VenuePromotersHome = () => {
  const [promoters, setPromoters] = useState([]);
  const [promoterData, setPromoterData] = useState([]);
  const [query, setQuery] = useState("");
  const [venue, setVenue] = useState({});
  const [price, setPrice] = useState({
    active: false,
    displayValue: 5000,
    filterValue: 5000
  });
  const [availability, setAvailability] = useState({
    active: false,
    displayValue: 3,
    filterValue: 3
  });
  const [influenceBadge, setInfluenceBadge] = useState({
    active: false,
    displayValue: [],
    filterValue: []
  });
  const [languages, setLanguages] = useState({
    active: false,
    displayValue: [],
    filterValue: []
  });
  const [clients, setClients] = useState({
    active: false,
    displayValue: 0,
    filterValue: 0
  });

  const navigation = useNavigation();

  const clearFilters = () => {
    setPrice({
      active: false,
      displayValue: 5000,
      filterValue: 5000
    });
    setAvailability({
      active: false,
      displayValue: 3,
      filterValue: 3
    });
    setInfluenceBadge({
      active: false,
      displayValue: [],
      filterValue: []
    });
    setLanguages({
      active: false,
      displayValue: [],
      filterValue: []
    });
    setClients({
      active: false,
      displayValue: 0,
      filterValue: 0
    });
  }

  // NOTE: JWTd (done)
  useEffect(() => {
    getData('@accessToken').then(accessToken => {
      getPromoters(accessToken).then(data => {
        setPromoterData(data);
        setPromoters(data);
      })
    })
  }, [])

  useEffect(() => {
    getData('@venueFormData').then(data => setVenue(data));
  }, [])

  useEffect(() => {
    setPromoters(handleSearch());
  }, [query, price.filterValue, availability.filterValue, influenceBadge.filterValue, languages.filterValue, clients.filterValue])

  const handleSearch = () => {
    let filteredPromoters = [];
    promoterData.forEach(promoter => {
      const nameMatch = (promoter.firstName.toLowerCase() + " " + promoter.lastName[0].toLowerCase()).trim().startsWith(query.toLowerCase().trim());
      const priceMatch = promoter.promoterProfile.expectedRate <= price.filterValue;
      const availabilityMatch = promoter.promoterProfile.availability >= availability.filterValue;
      const clientsMatch = promoter.promoterProfile.guestCount >= clients.filterValue;

      let languagesMatch = true;
      const filteredLanguages = languages.filterValue.map(lang => lang.value);
      filteredLanguages.forEach(lang => {
        if (!promoter.promoterProfile.languages.includes(lang)) {
          languagesMatch = false;
        }
      })

      const filteredBadges = influenceBadge.filterValue.map(badge => badge.value);
      let badgeMatch = filteredBadges.length === 0 || filteredBadges.includes(promoter.promoterProfile.influence);

      if (nameMatch && priceMatch && clientsMatch && availabilityMatch && languagesMatch && badgeMatch) {
        filteredPromoters.push(promoter);
      }
    })
    return filteredPromoters;
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Promoters</Text>
        <Jumbotron
          title="Find the best fit"
          caption={`Our promoters use their social media influence and network to get you the traffic you seek`}
          image="https://media.istockphoto.com/photos/young-woman-with-mask-at-mardi-gras-night-club-party-picture-id972174058?k=6&m=972174058&s=170667a&w=0&h=y4tA36T_srRh2qSrkMK2P9HtBjQUtAjYwiZcdQzmDqU="
        />

        <Text style={styles.subTitle}>Top Promoters in the area</Text>
        <Searchbar
          style={styles.searchInput}
          inputStyle={styles.inputText}
          placeholder="Search Promoters"
          value={query}
          iconColor="#1AB0A8"
          selectionColor="#1AB0A8"
          onChangeText={(val) => setQuery(val)}
        />

        <PromotersFilterGrid
          price={price} setPrice={setPrice}
          availability={availability} setAvailability={setAvailability}
          influenceBadge={influenceBadge} setInfluenceBadge={setInfluenceBadge}
          languages={languages} setLanguages={setLanguages}
          clients={clients} setClients={setClients}
          clearFilters={clearFilters}
        />

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
  title: {
    marginTop: 100,
    marginLeft: 33,
    fontFamily: 'Futura',
    fontSize: 35,
    fontWeight: '400',
    marginBottom: 20,
    color: '#343434',
  },
  subTitle: {
    fontSize: 27,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#2A2A2A',
    marginLeft: 33,
    marginTop: 30
  },
  promoterList: {
    marginLeft: 32,
    marginTop: 10,
    marginBottom: 35
  },
  searchInput: {
    width: '84%',
    marginTop: 15,
    marginBottom: 10,
    top: 5,
    left: 33,
    elevation: 3,
    borderRadius: 25
  },
  inputText: {
    fontSize: 16
  }
})

export default VenuePromotersHome;
