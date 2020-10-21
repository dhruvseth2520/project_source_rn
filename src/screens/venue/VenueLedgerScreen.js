import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, FlatList, SectionList } from 'react-native';
import { DataTable, Chip, Avatar } from 'react-native-paper';
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
  const [graphData, setGraphData] = useState({'Jan': 0});
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;

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
        setVenueName(response.venueName);
        fetch(`${env.API_URL}/api/events/attendance/venue/${response._id}`)
        .then(response => response.json())
        .then(data => {
          let sum = 0;
          let tableData = [];
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
        })
      })
    });
    return unsubscribe;

  }, [])

  return (<ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
    <Text style={styles.title}>Ledger</Text>
    <View style={styles.card}>
      <Image style={styles.cardBackground} source={require('../../assets/canva-photo-editor.png')}/>
      <Image style={styles.visaLogo} source={require('../../assets/visalogo.png')} />
      <View style={styles.cardContent}>
        <Text style={styles.label}>Amount Payable</Text>
        <Text style={[styles.label, {fontSize: 53, left: -3}]}>{balance} MMK</Text>
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
            marginTop: 30
          }}
        />
    </View>
    <Text style={[styles.subTitle, {marginTop: 15}]}>Ledger Details</Text>
    <SectionList
      sections={ledger}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item, index, section }) => {
        if (index === section.data.length - 1) {
          const countArr = section.data.map(el => el.guestCount);
          const feesArr = section.data.map(el => el.payable);
          const totalCount = countArr.reduce((acc, item) => acc + item, 0);
          const totalFees = feesArr.reduce((acc, item) => acc + item, 0);
          return <>
            <View style={styles.tableRow}>
              <Chip avatar={<Avatar.Image size={24} source={{uri: item.promoterAvatar}} />} textStyle={{fontFamily: 'Avenir', top: 1, fontSize: 13}} style={styles.promoterChip}>{item.promoterName.split(" (")[0]}</Chip>
              <Text style={styles.tableCell}>{item.guestCount}</Text>
              <Text style={styles.tableCell}>{item.payable}</Text>
            </View>
            <View style={[styles.tableRow, {borderTopWidth: 0.5, paddingVertical: 12, width: '92%', marginTop: 10}]}>
              <Text style={[styles.tableCell, {top: 0, left: 0, fontWeight: '500', width: '33%'}]}>Total</Text>
              <Text style={[styles.tableCell, {top: 0, left: 12, width: '35%', fontWeight: '500'}]}>{totalCount}</Text>
              <Text style={[styles.tableCell, {top: 0, left: 9, fontWeight: '500'}]}>{totalFees}</Text>
            </View>
          </>
        } else {
          return <View style={styles.tableRow}>
            <Chip avatar={<Avatar.Image size={24} source={{uri: item.promoterAvatar}} />} style={styles.promoterChip} textStyle={{fontFamily: 'Avenir', top: 1, fontSize: 13}}>{item.promoterName.split(" (")[0]}</Chip>
            <Text style={styles.tableCell}>{item.guestCount}</Text>
            <Text style={styles.tableCell}>{item.payable}</Text>
          </View>
        }
      }}
      renderSectionHeader={({ section: { title } }) => (<View>
          <Text style={styles.header}>{title}</Text>
          <View style={{flexDirection: 'row', padding: 5}}>
            <Text style={[styles.subheader, {left: -4}]}>Promoter</Text>
            <Text style={styles.subheader}>Guest Count</Text>
            <Text style={[styles.subheader, {width: '28%'}]}>Payable (MMK)</Text>
          </View>
        </View>
      )}
      style={styles.ledger}
    />

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
    shadowOpacity: 0.32,
    shadowRadius: 4.22,
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
    top: 58,
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
  ledger: {
    marginLeft: 33,
    marginTop: 15,
    marginBottom: 50
  },
  header: {
    fontFamily: 'Avenir',
    fontSize: 19,
    fontWeight: '300',
    marginTop: 5,
    color: '#424242'
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 3,
    marginTop: 3
  },
  subheader: {
    width: '32.5%',
    fontWeight: '300',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Avenir',
    fontWeight: '400'
  },
  tableCell: {
    left: 23,
    top: 7,
    width: '32%',
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '300'
  },
  promoterChip: {
    width: '27%',
    left: -6,
    backgroundColor: '#F3F3F3'
  }
})

export default VenueLedgerScreen;
