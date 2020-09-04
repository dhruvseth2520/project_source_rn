import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VenuePromotersHome from "../screens/VenuePromotersHome"
import VenuePromoterProfile from "../screens/VenuePromoterProfile";

const Stack = createStackNavigator();

const VenuePromoterStackScreen = ({ route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VenuePromotersHome"
        options={{ headerShown: false }}
        component={VenuePromotersHome}
        initialParams={{form: route.params.form}}
      />
      <Stack.Screen
        name="VenuePromoterProfile"
        options={{ headerShown: false }}
        component={VenuePromoterProfile}
      />
    </Stack.Navigator>
  )
}

export default VenuePromoterStackScreen;
