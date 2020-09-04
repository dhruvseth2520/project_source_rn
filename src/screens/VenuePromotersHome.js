import React, { useState } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PromoterCard from "../components/PromoterCard";


const VenuePromotersHome = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const formData = route.params.form;

  const promoters = [{
    'firstName': 'Dhruv',
    'profileImg': 'https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/15776868_1410970445593491_2341491425767806790_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=m4GCiM_MEDwAX_sNdMb&_nc_oc=AQmoFtOxjdy3DPmUOu2MMLbDGoaSsucFaqzGvwjQ5hPvHNiHYRXfH6qBFAo48vXYfBM&_nc_ht=scontent.fphl2-4.fna&oh=be8339c6eb02969a8214d84ba432e768&oe=5F74B743',
    'badge': 'Followers'
  }, {
    'firstName': 'Anthony',
    'profileImg': 'https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/p960x960/23916454_10210562933285216_5634471730128896697_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=NzjN7IrihegAX_sC8BO&_nc_ht=scontent.fphl2-4.fna&tp=6&oh=dc143c6d46fda57a91ddbff666bc2772&oe=5F750783',
    'badge': 'Traffic'
  }, {
    'firstName': 'Maxence',
    'profileImg': 'https://scontent.fphl2-4.fna.fbcdn.net/v/t1.0-9/116904229_10220648233770578_7167708777824898008_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=ZI8q-YE9PtQAX98JOjT&_nc_ht=scontent.fphl2-4.fna&oh=3cd0abc1d35f714be115026e6361f3a3&oe=5F767B6E',
    'badge': 'Followers'
  }, {
    'firstName': 'Ameya',
    'profileImg': 'https://scontent.fphl2-4.fna.fbcdn.net/v/t1.0-9/29102166_10209128878658371_8715336630391544215_n.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=gd6njZk6UhwAX9eAzcf&_nc_ht=scontent.fphl2-4.fna&oh=f4f1f290a6d96659c1a399d29147f767&oe=5F75736C'
  }];

  return (
          <ScrollView style={styles.background}>
                  <Text style={styles.title}>Promoters</Text>

                  <Image style={styles.heroImage} source={{uri: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'}} />
                  <Text style={styles.description}>Our network of young promoters will use their social media influence and personal network to get your {formData.category} the traffic you seek</Text>

                  <Text style={styles.subTitle}>Top Promoters in the area</Text>
                  <Text style={styles.comment}>Showing promoters near {formData.venueName}</Text>

                  <FlatList horizontal
                    style={styles.promoterList}
                    showsHorizontalScrollIndicator={false}
                    data={promoters}
                    keyExtractor={promoter => promoter.firstName}
                    renderItem={({ item }) => {
                      return <PromoterCard name={item.firstName} image={item.profileImg} badgeTitle={item.badge}></PromoterCard>
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
  title: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    fontWeight: '400',
    color: '#424242',
    marginLeft: 33,
    marginTop: 70
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
    marginTop: 15
  }
})

export default VenuePromotersHome;
