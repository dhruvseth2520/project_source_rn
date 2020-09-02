import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginStackScreens from "./src/nav/LoginStackScreens";
import VenueTabScreens from "./src/nav/VenueTabScreens";
import PromoterTabScreens from "./src/nav/PromoterTabScreens";

const RootStack = createStackNavigator();

export default function App() {
  const isSignedIn = false

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={LoginStackScreens} />
        <RootStack.Screen name="PromoterTab" component={PromoterTabScreens} options={{ gestureEnabled: false }} />
        <RootStack.Screen name="VenueTab" component={VenueTabScreens} options={{ /*, gestureEnabled: false */ }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
