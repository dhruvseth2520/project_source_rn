import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VenueEventsScreen from "../../screens/venue/events/VenueEventsScreen";
import EventDetails from "../../components/EventDetails";
import NewEventForm from "../../screens/venue/events/NewEventForm";

const Stack = createStackNavigator();

const VenueEventStackScreen = ({ route }) => {

  return <Stack.Navigator>
    <Stack.Screen
      name="VenueEventsHome"
      options={{ headerShown: false }}
      component={VenueEventsScreen}
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

  </Stack.Navigator>
}




export default VenueEventStackScreen;
