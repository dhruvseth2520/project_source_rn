import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PromotersHome from "../screens/venue/PromotersHome"
import PromoterProfile from "../screens/venue/PromoterProfile";

const Stack = createStackNavigator();

const VenuePromoterStackScreen = ({ route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VenuePromotersHome"
        options={{ headerShown: false }}
        component={PromotersHome}
        initialParams={{form: route.params.form}}
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
