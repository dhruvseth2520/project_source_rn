import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import Header from "../../components/Header";
import {
  LineChart
} from "react-native-chart-kit";
import { getData } from "../../utils/localStorage";
import env from "../../utils/environment";
import { useNavigation } from '@react-navigation/native';


const VenueLedgerScreen = () => {
  const [balance, setBalance] = useState(0);
  const [ledger, setLedger] = useState([]);
  const [venueName, setVenueName] = useState("");
  const [graphData, setGraphData] = useState({month: 0});
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;


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
        setVenueName(response.venueName);
        fetch(`${env.API_URL}/api/events/attendance/venue/${response._id}`)
        .then(response => response.json())
        .then(data => {
          let sum = 0;
          data.forEach(el => {
            const eventMonth = new Date(el.date).toLocaleString('default', {month: 'short'});
            const difference = (new Date() - new Date(el.date)) / (86400000);
            console.log(difference);
            if (eventMonth in dateBalance ) {
              dateBalance[eventMonth] = dateBalance[eventMonth] + el.payable;
            }
            sum += el.payable;
          })
          setGraphData(dateBalance);
          setBalance(sum);
          setLedger(data);
        })
      })
    });
    return unsubscribe;

  }, [])

  return (<ScrollView style={styles.background}>
    <Text style={styles.title}>Ledger</Text>

    <View style={styles.card}>
      <Image style={styles.cardBackground} source={require('../../assets/canva-photo-editor.png')}/>
      <Image style={styles.visaLogo} source={require('../../assets/visalogo.png')} />
      <View style={styles.cardContent}>
        <Text style={styles.label}>Amount Payable</Text>
        <Text style={[styles.label, {fontSize: 52}]}>{balance} MMK</Text>
        <Text style={[styles.label, {top: 15, fontSize: 21, fontFamily: 'Gill Sans', fontWeight: '400'}]}>{venueName}</Text>
      </View>
    </View>

    <Text style={styles.subTitle}>Monthly Breakdown</Text>
    <View>
        <LineChart
          data={{
            labels: Object.keys(graphData),
            datasets: [
              {
                data: Object.values(graphData)
              }
            ]
          }}
          width={0.93 * screenWidth}
          height={220}
          withOuterLines={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(26, 162, 176, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "#1AA2B0"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            left: 34,
            marginTop: 35
          }}
        />
    </View>


    <Text style={[styles.subTitle, {marginTop: 15}]}>Ledger Details</Text>

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
    fontFamily: 'Gill Sans',
    fontSize: 36,
    fontWeight: '400',
    marginBottom: 20,
    color: '#212121',
  },
  card: {
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 10,
    width: '84%',
    height: 220,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardBackground: {
    borderRadius: 30,
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: 220
  },
  cardContent: {
    top: 62,
    left: 35
  },
  label: {
    fontFamily: 'Avenir',
    color: 'white',
    fontWeight: '800'
  },
  visaLogo: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignSelf: 'flex-end',
    right: 15
  },
  subTitle: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 33,
    marginTop: 30
  },
})

export default VenueLedgerScreen;
