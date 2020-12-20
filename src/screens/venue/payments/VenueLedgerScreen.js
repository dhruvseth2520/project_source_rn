import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView, Dimensions, FlatList } from 'react-native';
import { Chip, Avatar, FAB } from 'react-native-paper';
import {
  PulseIndicator,
} from 'react-native-indicators';
import { getData } from "../../../utils/localStorage";
import env from "../../../utils/environment";
import { useNavigation } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import Timeline from "../../../components/Timeline";

const MONTH_ARRAY = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const VenueLedgerScreen = () => {
  const [balance, setBalance] = useState(0);
  const [ledger, setLedger] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState({'Jan': 0});
  const [timelineData, setTimelineData] = useState([]);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const [guestListVisible, setGuestListVisible] = useState(false);

  const sortByDate = (arr) => {
    return arr.sort(function(a, b) {
        var keyA = new Date(a.time);
        var keyB = new Date(b.time);

        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
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
        fetch(`${env.API_URL}/api/events/attendance/venue/${response._id}`).then(response => response.json()).then(data => {
          let tableData = {};
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
          })

          let timeline = [];
          let sum = 0;
          fetch(`${env.API_URL}/api/payments/due/${response._id}`).then(response => response.json()).then(data => {
            data.forEach(payment => {
              const previousMonth = new Date();
              previousMonth.setMonth(new Date(payment.dueDate).getMonth() - 1);

              const title = `Payment Due ${payment.dueDate.split(" ")[0]} ${payment.dueDate.split(" ")[1]}`;
              const description = `${payment.amount} MMK due for month of ${previousMonth.toLocaleString('default', { month: 'long' })}`;
              timeline.push({time: payment.dueDate, title: title, description: description, circleColor: '#CA3467'});

              sum += payment.amount;

              fetch(`${env.API_URL}/api/payments/${response._id}`).then(response => response.json()).then(data => {
                data.forEach(transaction => {
                  const dateString = `${MONTH_ARRAY[new Date(transaction.date).getMonth()]} ${new Date(transaction.date).getDate()} ${new Date(transaction.date).getFullYear()}`
                  timeline.push({time: dateString, title: 'Payment Received', description: `${transaction.amount} MMK received through ${transaction.method}`, circleColor: '#34C056'});
                  sum -= transaction.amount;
                })

                setLoading(false);
                setBalance(sum);
                setTimelineData(timeline);
                setGraphData(dateBalance);
                setLedger(tableData);
              })
            })
          })
        })
      })
    });
    return unsubscribe;
  }, [])

  return (<ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
    <Text style={styles.title}>Ledger</Text>

    {isLoading ? (<PulseIndicator color="#22D2C9" style={{alignSelf: 'center', left: -11, marginTop: 20, marginBottom: 20}}></PulseIndicator>) : (
      <>
          <View style={styles.card}>
            <Image style={styles.cardBackground} source={require('../../../assets/canva-photo-editor.png')}/>
            <Image style={styles.visaLogo} source={require('../../../assets/visalogo.png')} />
            <View style={styles.cardContent}>
              <Text style={styles.label}>Amount Payable</Text>
              <Text style={[styles.label, {fontSize: balance >= 100000 ? 44 : (balance === 0 ? 64 : 48), left: -3}]}>{balance} MMK</Text>
            </View>

            {balance > 0 ? (<View style={{alignSelf: 'flex-start', marginTop: 82, marginLeft: 20}}>
              <TouchableOpacity style={styles.paymentButton} onPress={() => navigation.navigate("VenuePayment", {balance: balance})}>
                <Text style={{fontFamily: 'Avenir', color: '#1AA2B0'}}>Clear Balance</Text>
              </TouchableOpacity>
            </View>) : (<></>)}

          </View>

          <Text style={styles.subTitle}>Monthly Breakdown</Text>
          <View>
              {Object.values(graphData).every(val => val === 0) ? (<Text style={styles.caption}>No activity yet. Start registering guests for events now to see your month to month growth</Text>) : (
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
                    color: (opacity = 1) => `rgba(26, 176, 168, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: "3",
                      strokeWidth: "2",
                      stroke: "#1AB0A8"
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    left: 34,
                    marginTop: 30
                  }}
                />
              )}
          </View>
          <Text style={[styles.subTitle, {marginTop: 15}]}>Details</Text>
          <View style={{flexDirection: 'row', marginTop: 17, left: 33, marginBottom: 5}}>
            <TouchableOpacity style={{marginRight: 10}} onPress={() => setGuestListVisible(false)}>
              <Text style={guestListVisible ? styles.btnText : styles.active}>Payment History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGuestListVisible(true)}>
              <Text style={!guestListVisible ? styles.btnText : styles.active}>Guest List</Text>
            </TouchableOpacity>
          </View>

          {guestListVisible ? (
            <View style={{marginBottom: 80}}>
              {Object.keys(ledger).length !== 0 ? (
                <>
                    {Object.keys(ledger).map(eventName => (
                        <View style={styles.eventCard}>
                            <Text style={styles.header}>{eventName}</Text>
                            <View style={styles.tableData}>
                              <View style={{flexDirection: 'row', marginTop: 15}}>
                                <Text style={[styles.subheader, {width: '28%', left: 10}]}>Promoter</Text>
                                <Text style={[styles.subheader, {width: '33%', left: 22}]}>Guest Count</Text>
                                <Text style={[styles.subheader, {width: '33%', left: 16}]}>Payable (MMK)</Text>
                              </View>
                            <View>
                              {ledger[eventName].map(item => (
                                <View style={[styles.tableRow, {backgroundColor: '#f3f3f3'}]}>
                                  <Chip avatar={<Avatar.Image size={24} source={{uri: item.promoterAvatar}} />} style={styles.promoterChip} textStyle={{fontFamily: 'Avenir', top: 1, fontSize: 13}}>{item.promoterName.split(" ")[0]}</Chip>
                                  <Text style={styles.tableCell}>{item.guestCount}</Text>
                                  <Text style={styles.tableCell}>{item.payable}</Text>
                                </View>
                              ))}
                            </View>
                            <View style={[styles.tableRow, {paddingVertical: 12}]}>
                              <Text style={[styles.tableCell, {top: 0, left: 0, marginLeft: 10, fontWeight: '500', width: '33%'}]}>Total</Text>
                              <Text style={[styles.tableCell, {top: 0, width: '33%', fontWeight: '500'}]}>{ledger[eventName].reduce((acc, curr) => acc + curr.guestCount, 0)}</Text>
                              <Text style={[styles.tableCell, {top: 0, fontWeight: '500'}]}>{ledger[eventName].reduce((acc, curr) => acc + curr.payable, 0)}</Text>
                            </View>
                          </View>
                        </View>
                    ))}
                </>
              ) : (<Text style={[styles.caption, {marginTop: 0}]}>No guests registered yet</Text>)}
            </View>
          ) : (
            <View style={{flex: 1}}>
              {timelineData.length !== 0 ? (
                <Timeline data={sortByDate(timelineData)} />
              ) : (
                <Text style={[styles.caption, {marginTop: 0}]}>No payment data yet</Text>
              )}
            </View>
        )}
      </>)}
  </ScrollView>)
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white'
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
  card: {
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 10,
    height: 235,
    width: '84%',
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
    height: 235
  },
  cardContent: {
    top: 68,
    left: 25
  },
  paymentButton: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  caption: {
    fontFamily: 'Avenir',
    padding: 10,
    width: '85%',
    marginTop: 10,
    marginLeft: 24,
    color: '#424242'
  },
  label: {
    fontFamily: 'Avenir',
    color: 'white',
    fontWeight: '800',
    flexWrap: 'wrap'
  },
  visaLogo: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignSelf: 'flex-end',
    right: 15
  },
  subTitle: {
    fontSize: 27,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 33,
    marginTop: 20
  },
  header: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: '400',
    color: '#424242',
    marginTop: 5
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 18,
    paddingVertical: 5,
    width: '98%',
    marginTop: 10,
    padding: 5,
    marginBottom: 3,
  },
  subheader: {
    fontWeight: '300',
    fontFamily: 'Avenir',
    fontWeight: '400'
  },
  tableCell: {
    width: '33%',
    top: 8,
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '300'
  },
  promoterChip: {
    width: '33%',
    marginLeft: 10,
    left: -6,
    backgroundColor: '#F3F3F3'
  },
  btnText: {
    fontFamily: 'Avenir',
    fontSize: 15
  },
  active: {
    fontFamily: 'Avenir',
    fontSize: 15,
    color: '#1AB0A8'
  },
  eventCard: {
    width: '83%',
    left: 33,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 18,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },

})

export default VenueLedgerScreen;
