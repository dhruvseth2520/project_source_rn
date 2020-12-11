import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';


const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {

  }
}

export { getData, storeData, removeData };
