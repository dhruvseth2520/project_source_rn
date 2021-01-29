import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VenueEventsScreen from "../../screens/venue/events/VenueEventsScreen";
import EventDetails from "../../screens/venue/events/EventDetails";
import NewEventForm from "../../screens/venue/events/NewEventForm";
import RegisterGuestsScreen from "../../screens/venue/events/RegisterGuestsScreen";
import GuestListScreen from "../../screens/venue/events/GuestListScreen";
import PromoterProfile from "../../screens/venue/promoters/PromoterProfile";


const Stack = createStackNavigator();

const VenueEventStackScreen = ({ route }) => {

  return <Stack.Navigator>
    <Stack.Screen
      name="VenueEventsHome"
      options={{ headerShown: false }}
      component={VenueEventsScreen}
    />
    <Stack.Screen
      name="PromoterProfile"
      options={{ headerShown: false }}
      component={PromoterProfile}
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
      name="RegisterGuestsScreen"
      options={{ headerShown: false }}
      component={RegisterGuestsScreen}
    />
    <Stack.Screen
      name="GuestListScreen"
      options={{ headerShown: false }}
      component={GuestListScreen}
    />

  </Stack.Navigator>
}




export default VenueEventStackScreen;
