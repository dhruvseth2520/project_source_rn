import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EventsScreen from "../screens/venue/EventsScreen";
import NewEventForm from "../screens/venue/NewEventForm";

const Stack = createStackNavigator();

const VenueEventStackScreen = () => {
  return <Stack.Navigator>
    <Stack.Screen
      name="VenueEventsHome"
      options={{ headerShown: false }}
      component={EventsScreen}
    />
    <Stack.Screen
      name="VenueEventForm"
      options={{ headerShown: false, gestureEnabled: false }}
      component={NewEventForm}
    />
  </Stack.Navigator>
}

const styles = StyleSheet.create({

});

export default VenueEventStackScreen;
