import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Share, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getData } from "../utils/localStorage";


const ShareButtons = ({ event, view }) => {
  const [eventURL, setEventURL] = useState("");
  const [promoterData, setPromoterData] = useState(null);

  const windowHeight = Dimensions.get('window').height;

  let fontSize = 14;
  if (windowHeight < 700) {
    fontSize = 12;
  }

  useEffect(() => {
    getData('@promoterFormData').then(response => {
      setPromoterData(response);
      setEventURL(`https://web.projectsource.app/events/${event._id}/promoter/${response._id}`)
    })
  }, [])

  const shareEvent = async () => {
    try {
      const result = await Share.share({
        title: event.eventName,
        url: eventURL
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const facebookShare = () => {
    let facebookParameters = [];
    facebookParameters.push('quote=' + encodeURI(`Come check out ${event.eventName} at ${event.venue} on ${new Date(event.date).toDateString()}. Say my name, ${promoterData.firstName} or use my code, ${promoterData.promoterCode}, at the door to get a promotion`));
    facebookParameters.push('u=' + encodeURI(eventURL));

    const url = 'https://www.facebook.com/sharer/sharer.php?' + facebookParameters.join('&');
    Linking.openURL(url)
      .then(() => {

      })
      .catch(() => {
        alert('Something went wrong');
      });
  }

  const postTweet = () => {
    let twitterParameters = [];
    twitterParameters.push('url=' + encodeURI(eventURL));
    twitterParameters.push('text=' + encodeURI(`Come check out ${event.eventName} at ${event.venue} on ${new Date(event.date).toDateString()}. Say my name, ${promoterData.firstName} or use my code, ${promoterData.promoterCode}, at the door to get a promotion`));

    const url = 'https://twitter.com/intent/tweet?' + twitterParameters.join('&');

    Linking.openURL(url)
      .then((data) => {

      })
      .catch(() => {
        alert('Something went wrong');
      });
  }

  return (
    <>
      {view === "Page" ? (
        <>
          <View style={{flexDirection: 'row', marginBottom: 25, marginTop: 5, left: 10}}>
            <TouchableOpacity onPress={facebookShare} style={[styles.socialButton, {backgroundColor: '#3b5998'}]}>
              <FontAwesome5 style={styles.btnIcon} name="facebook-f" />
              <Text style={[styles.btnText, {fontSize: fontSize}]}>Share on Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={postTweet} style={[styles.socialButton, {backgroundColor: '#1DA1F2'}]}>
              <FontAwesome5 style={styles.btnIcon} name="twitter" />
              <Text style={[styles.btnText, {fontSize: fontSize}]}>Share on Twitter</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 60, marginTop: 5, left: 10}}>
            <TouchableOpacity onPress={shareEvent} style={[styles.socialButton, {backgroundColor: 'white'}]}>
              <FontAwesome5 style={[styles.btnIcon, {fontSize: 14, color: '#1AA2B0'}]} name="user" />
              <Text style={[styles.btnText, {fontSize: fontSize, color: '#1AA2B0'}]}>Share with Contacts</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{flexDirection: 'row', marginTop: 5, left: 10}}>
          <TouchableOpacity onPress={shareEvent} style={[styles.socialButton, {backgroundColor: 'white', width: '54%', height: 0.055 * windowHeight, shadowOpacity: 0.1}]}>
            <FontAwesome5 style={[styles.btnIcon, {fontSize: 12, color: '#1AA2B0'}]} name="user" />
            <Text style={[styles.btnText, {color: '#1AA2B0', fontSize: fontSize}]}>Share with Contacts</Text>
          </TouchableOpacity>
        </View>
      )}

    </>
  )
}

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '43%',
    borderRadius: 30,
    height: 50,
    marginLeft: 10,
    marginTop: -10,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 5,
  },
  btnIcon: {
    fontSize: 18,
    left: 18,
    color: 'white',
  },
  btnText: {
    left: 27,
    fontFamily: 'Avenir',
    color: 'white'
  }
})

export default ShareButtons;
