import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, SectionList } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Chip, Avatar } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';

const Ledger = ({ balance, ledger, graphData, timelineData }) => {
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

  return <>
            <View style={styles.card}>
              <Image style={styles.cardBackground} source={require('../assets/canva-photo-editor.png')}/>
              <Image style={styles.visaLogo} source={require('../assets/visalogo.png')} />
              <View style={styles.cardContent}>
                <Text style={styles.label}>Amount Payable</Text>
                <Text style={[styles.label, {fontSize: balance >= 100000 ? 48 : 56, left: -3}]}>{balance} MMK</Text>
              </View>
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
                              <View>
                                <Text style={styles.header}>{eventName}</Text>
                                <View style={{flexDirection: 'row', marginTop: 5}}>
                                  <Text style={[styles.subheader, {width: '41%'}]}>Promoter</Text>
                                  <Text style={styles.subheader}>Guest Count</Text>
                                  <Text style={styles.subheader}>Payable (MMK)</Text>
                                </View>
                              </View>
                              <View>
                                {ledger[eventName].map(item => (
                                  <View style={styles.tableRow}>
                                    <Chip avatar={<Avatar.Image size={24} source={{uri: item.promoterAvatar}} />} style={styles.promoterChip} textStyle={{fontFamily: 'Avenir', top: 1, fontSize: 13}}>{item.promoterName.split(" (")[0]}</Chip>
                                    <Text style={styles.tableCell}>{item.guestCount}</Text>
                                    <Text style={styles.tableCell}>{item.payable}</Text>
                                  </View>
                                ))}
                              </View>
                              <View style={[styles.tableRow, {borderTopWidth: 0.5, paddingVertical: 12, width: '92%', marginTop: 10}]}>
                                <Text style={[styles.tableCell, {top: 0, left: 0, fontWeight: '500', width: '33%'}]}>Total</Text>
                                <Text style={[styles.tableCell, {top: 0, left: 34, width: '35%', fontWeight: '500'}]}>{ledger[eventName].reduce((acc, curr) => acc + curr.guestCount, 0)}</Text>
                                <Text style={[styles.tableCell, {top: 0, left: 29, fontWeight: '500'}]}>{ledger[eventName].reduce((acc, curr) => acc + curr.payable, 0)}</Text>
                              </View>
                          </View>
                      ))}
                  </>
                ) : (<Text style={[styles.caption, {marginTop: 0}]}>No guests registered yet</Text>)}

              </View>
            ) : (
              <View style={{flex: 1}}>
                {timelineData.length !== 0 ? (
                  <Timeline
                    data={sortByDate(timelineData)}
                    innerCircle="dot"
                    lineWidth={1}
                    lineColor="#E3E3E3"
                    circleSize={14}
                    dotSize={8}
                    circleColor="#34C056"
                    style={{marginTop: 30, marginLeft: 30, marginBottom: 50}}
                    titleStyle={{fontFamily: 'Avenir', fontWeight: '500', marginTop: 5, marginLeft: 5}}
                    descriptionStyle={{fontFamily: 'Avenir', fontWeight: '400', marginLeft: 5}}
                    eventDetailStyle={styles.eventDetailContainer}
                    rowContainerStyle={{height: 150}}
                    renderTime={(rowData, sectionID, rowID) => {
                      const month = rowData.time.split(" ")[0];
                      const day = rowData.time.split(" ")[1];
                      const year = rowData.time.split(" ")[2];
                      return (<View style={styles.timeContainer}>
                        <Text style={styles.timeMonth}>{month}</Text>
                        <Text style={styles.timeDay}>{day}</Text>
                        <Text style={styles.timeYear}>{year}</Text>
                      </View>)
                    }}
                  />
                ) : (
                  <Text style={[styles.caption, {marginTop: 0}]}>No payment data yet</Text>
                )}
              </View>

            )}
        </>
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 10,
    width: '84%',
    height: 215,
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
    top: 68,
    left: 25
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
    marginTop: 30
  },
  ledger: {
    marginLeft: 33,
    marginTop: 15,
    marginBottom: 50,
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
    padding: 5,
    marginBottom: 3,
    marginTop: 3
  },
  subheader: {
    width: '30%',
    fontWeight: '300',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Avenir',
    fontWeight: '400'
  },
  tableCell: {
    left: 23,
    top: 8,
    width: '30.5%',
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '300'
  },
  promoterChip: {
    width: '34%',
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
    color: '#1AA2B0'
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
  eventDetailContainer: {
    left: 15,
    backgroundColor: 'white',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    width: '85%',
    height: 95
  },
  timeContainer: {
    top: -5,
    marginLeft: 5
  },
  timeMonth: {
    fontSize: 20,
    fontFamily: 'Avenir',
    fontWeight: '500',
    color: '#1AA2B0'
  },
  timeDay: {
    fontFamily: 'Avenir',
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center'
  },
  timeYear: {
    marginTop: 7,
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 12,
    color: 'gray',
    textAlign: 'center'
  }
})

export default Ledger;
