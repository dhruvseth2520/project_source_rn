import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./src/screens/LoginScreen";
import VendorOrPromoterScreen from "./src/screens/VendorOrPromoterScreen";
import PromoterRegisterScreen from "./src/screens/PromoterRegisterScreen";
import VenueRegisterScreen from "./src/screens/VenueRegisterScreen";

const Stack = createStackNavigator();

export default function App() {
  const isSignedIn = false

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ?
          <>
            <Stack.Screen name="Home" component={() => null} />
          </>
          :
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
            <Stack.Screen name="VoP" component={VendorOrPromoterScreen} options={{ header: () => null , gestureEnabled: false}} />
            <Stack.Screen name="PromoterRegister" component={PromoterRegisterScreen} options={{ title: 'Promoter', headerBackTitle: 'Back' }} />
            <Stack.Screen name="VenueRegister" component={VenueRegisterScreen} options={{ title: 'Venue', headerBackTitle: 'Back' }} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
