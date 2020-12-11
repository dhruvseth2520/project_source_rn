import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PromotersHome from "../../screens/venue/promoters/PromotersHome"
import PromoterProfile from "../../screens/venue/promoters/PromoterProfile";

const Stack = createStackNavigator();

const VenuePromoterStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VenuePromotersHome"
        options={{ headerShown: false }}
        component={PromotersHome}
      />
      <Stack.Screen
        name="VenuePromoterProfile"
        options={{ headerShown: false }}
        component={PromoterProfile}
      />
    </Stack.Navigator>
  )
}

export default VenuePromoterStackScreen;
