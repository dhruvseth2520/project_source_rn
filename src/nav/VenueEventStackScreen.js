import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import VenueEventsScreen from "../screens/VenueEventsScreen";
import VenueNewEventForm from "../screens/VenueNewEventForm";

const Stack = createStackNavigator();

const VenueEventStackScreen = () => {
  return <Stack.Navigator>
    <Stack.Screen
      name="VenueEventsHome"
      options={{ headerShown: false }}
      component={VenueEventsScreen}
      initialParams={{"id": "Dhruv"}}
    />
    <Stack.Screen
      name="VenueEventForm"
      options={{ headerShown: false, gestureEnabled: false }}
      component={VenueNewEventForm}
    />
  </Stack.Navigator>
}

const styles = StyleSheet.create({

});

export default VenueEventStackScreen;
