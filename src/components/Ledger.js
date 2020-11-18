import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, SectionList } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Chip, Avatar } from 'react-native-paper';

const Ledger = ({ balance, ledger, graphData }) => {
  const screenWidth = Dimensions.get("window").width;
  const [guestListVisible, setGuestListVisible] = useState(false);

  return <>
            <View style={styles.card}>
              <Image style={styles.cardBackground} source={require('../assets/canva-photo-editor.png')}/>
              <Image style={styles.visaLogo} source={require('../assets/visalogo.png')} />
              <View style={styles.cardContent}>
                <Text style={styles.label}>Amount Payable</Text>
                <Text style={[styles.label, {fontSize: balance >= 100000 ? 46 : 54, left: -3}]}>{balance} MMK</Text>
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
              <SectionList
                sections={ledger}
                style={styles.ledger}
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
                      <View style={[styles.tableRow, {borderTopWidth: 0.5, paddingVertical: 12, width: '92%', marginTop: 10, marginBottom: 20}]}>
                        <Text style={[styles.tableCell, {top: 0, left: 0, fontWeight: '500', width: '33%'}]}>Total</Text>
                        <Text style={[styles.tableCell, {top: 0, left: 10, width: '35%', fontWeight: '500'}]}>{totalCount}</Text>
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
              />
            ) : (
              <></>
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
    left: 35
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
    left: 21,
    top: 8,
    width: '32%',
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '300'
  },
  promoterChip: {
    width: '27%',
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
  }
})

export default Ledger;
