import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EventsScreen from "../screens/venue/EventsScreen";
import EventDetails from "../screens/venue/EventDetails";
import NewEventForm from "../screens/venue/NewEventForm";
import RegisterGuests from "../screens/venue/RegisterGuests";

const Stack = createStackNavigator();

const VenueEventStackScreen = ({ route }) => {

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
    <Stack.Screen
      name="VenueEventPage"
      options={{ headerShown: false }}
      component={EventDetails}
    />
    <Stack.Screen
      name="RegisterGuests"
      options={{ headerShown: false }}
      component={RegisterGuests}
    />
  </Stack.Navigator>
}

const styles = StyleSheet.create({

});

export default VenueEventStackScreen;
