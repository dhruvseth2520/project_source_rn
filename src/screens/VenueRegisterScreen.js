import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';

const VenueRegisterScreen = () => {
  return <View style={styles.background}>
    <Image style={styles.logo} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlCX_KCBoFMSJ8ocIWvCaHDwhcN4DEgnkMYg&usqp=CAU'}} />

    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Venue Name</Text>
        <TextInput style={styles.input} autoCapitalize={false} autoCorrect={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Venue Address</Text>
        <TextInput style={styles.input} autoCapitalize={false} autoCorrect={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Primary Contact Name</Text>
        <TextInput style={styles.input} autoCapitalize={false} autoCorrect={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Email</Text>
        <TextInput style={styles.input} autoCapitalize={false} autoCorrect={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput style={styles.input} autoCapitalize={false} autoCorrect={false} />
      </View>
      <View style={styles.inputContainer}>
        <Button title="Submit"></Button>
      </View>

    </View>

  </View>
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1
  },
  label: {
    marginBottom: 10
  },
  logo: {
    width: 280,
    height: 120,
    alignSelf: 'center',
    marginTop: 50
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.3,
    borderRadius: 3,
    height: 30,
    width: 280
  },
  form: {
    marginTop: 50,
    alignSelf: 'center',
  },
  inputContainer: {
    margin: 8
  }
})

export default VenueRegisterScreen;
