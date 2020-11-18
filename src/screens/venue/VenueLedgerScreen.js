import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView, Dimensions, FlatList, SectionList } from 'react-native';
import { Chip, Avatar } from 'react-native-paper';
import { getData } from "../../utils/localStorage";
import env from "../../utils/environment";
import { useNavigation } from '@react-navigation/native';
import Ledger from '../../components/Ledger';

const VenueLedgerScreen = () => {
  const [balance, setBalance] = useState(0);
  const [ledger, setLedger] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState({'Jan': 0});
  const navigation = useNavigation();

  const eventIndex = (data, eventName) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title === eventName) {
        return i;
      }
    }
    return -1;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currDate = new Date();
      let month; let date; let dateBalance = {};
      for (let i = 0; i < 6; i++) {
        date = new Date(currDate.getYear(), currDate.getMonth() - i, 1);
        month = monthArray[date.getMonth()];
        dateBalance[month] = 0;
      }

      getData('@venueFormData').then(response => {
        fetch(`${env.API_URL}/api/events/attendance/venue/${response._id}`)
        .then(response => response.json())
        .then(data => {
          let sum = 0;
          let tableData = {};
          data.forEach(el => {
            const eventName = el.eventName + '';
            const index = eventIndex(tableData, eventName);

            if (index === -1) {
              tableData.push({title: eventName, type: "Text", data: [{promoterName: el.promoterName, promoterAvatar: el.promoterAvatar, guestCount: el.guestCount, payable: el.recievable}]})
            } else {
              tableData[index].data.push({promoterName: el.promoterName, promoterAvatar: el.promoterAvatar, guestCount: el.guestCount, payable: el.recievable});
            }

            const eventMonth = new Date(el.date).toLocaleString('default', {month: 'short'});
            const difference = (new Date() - new Date(el.date)) / (86400000);
            if (eventMonth in dateBalance && difference <= 180) {
              dateBalance[eventMonth] = dateBalance[eventMonth] + el.recievable;
            }
            sum += el.recievable;
          })
          setGraphData(dateBalance);
          setBalance(sum);
          setLedger(tableData);
          setLoading(false);
        })
      })
    });
    return unsubscribe;
  }, [])

  return (<ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
    <Text style={styles.title}>Ledger</Text>
    {isLoading ? (<ActivityIndicator size="large" style={{alignSelf: 'center', marginTop: 30}}></ActivityIndicator>) : (
      <Ledger balance={balance} ledger={ledger} graphData={graphData} />
    )}
  </ScrollView>)
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    marginTop: 100,
    left: 33,
    fontFamily: 'Futura',
    fontSize: 35,
    fontWeight: '400',
    marginBottom: 20,
    color: '#343434',
  },
})

export default VenueLedgerScreen;
