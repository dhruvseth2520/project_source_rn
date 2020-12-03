import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VenueLedgerScreen from "../../screens/venue/payments/VenueLedgerScreen";
import VenuePaymentScreen from "../../screens/venue/payments/VenuePaymentScreen";

const Stack = createStackNavigator();

const VenueLedgerStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VenueLedger"
        options={{ headerShown: false }}
        component={VenueLedgerScreen}
      />
      <Stack.Screen
        name="VenuePayment"
        options={{ headerShown: false }}
        component={VenuePaymentScreen}
      />
      <Stack.Screen
        name="VenuePaymentDetails"
        options={{ headerShown: false }}
        component={VenuePaymentScreen}
      />
    </Stack.Navigator>
  )
}

export default VenueLedgerStackScreen;