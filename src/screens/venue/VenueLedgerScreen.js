import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView, Dimensions, FlatList, SectionList } from 'react-native';
import { Chip, Avatar } from 'react-native-paper';
import { getData } from "../../utils/localStorage";
import env from "../../utils/environment";
import { useNavigation } from '@react-navigation/native';
import Ledger from '../../components/Ledger';

const MONTH_ARRAY = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const VenueLedgerScreen = () => {
  const [balance, setBalance] = useState(0);
  const [ledger, setLedger] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState({'Jan': 0});
  const [timelineData, setTimelineData] = useState([]);
  const navigation = useNavigation();

  const generateTimelineData = (timeline) => {
    const temp = [];
    for (let date in timeline) {
      const previousMonth = new Date();
      previousMonth.setMonth(new Date(date).getMonth() - 1);

      const time = date;
      const title = `Payment Due ${time.split(" ")[0]} ${time.split(" ")[1]}`;
      const description = `${timeline[date]} MMK due for month of ${previousMonth.toLocaleString('default', { month: 'long' })}`;
      temp.push({time: time, title: title, description: description, circleColor: '#CA3467'});
    }
    setTimelineData(temp);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const currDate = new Date();
      let month; let date; let dateBalance = {};
      for (let i = 0; i < 6; i++) {
        date = new Date(currDate.getYear(), currDate.getMonth() - i, 1);
        month = MONTH_ARRAY[date.getMonth()];
        dateBalance[month] = 0;
      }

      getData('@venueFormData').then(response => {
        fetch(`${env.API_URL}/api/events/attendance/venue/${response._id}`)
        .then(response => response.json())
        .then(data => {
          let sum = 0;
          let tableData = {};
          let timeline = {};
          data.forEach(el => {
            const eventName = el.eventName;

            if (eventName in tableData) {
              tableData[eventName].push({promoterName: el.promoterName, promoterAvatar: el.promoterAvatar, guestCount: el.guestCount, payable: el.recievable});
            } else {
              tableData[eventName] = [{promoterName: el.promoterName, promoterAvatar: el.promoterAvatar, guestCount: el.guestCount, payable: el.recievable}];
            }

            const eventMonth = new Date(el.date).toLocaleString('default', {month: 'short'});
            const difference = (new Date() - new Date(el.date)) / (86400000);
            if (eventMonth in dateBalance && difference <= 180) {
              dateBalance[eventMonth] = dateBalance[eventMonth] + el.recievable;
            }

            const dueDateMonth = MONTH_ARRAY[(new Date(el.date).getMonth() + 1) % 12];
            const dueDate = `${dueDateMonth} 5 ${new Date(el.date).getFullYear()}`;

            if (dueDate in timeline) {
              timeline[dueDate] = timeline[dueDate] + el.recievable;
            } else {
              timeline[dueDate] = el.recievable;
            }

            sum += el.recievable;
          })
          generateTimelineData(timeline);
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
      <Ledger balance={balance} ledger={ledger} graphData={graphData} timelineData={timelineData} />
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
