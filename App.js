import React from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from "./src/screens/LoginScreen";
import VenueOrPromoterScreen from "./src/screens/VenueOrPromoterScreen";
import PromoterRegisterScreen from "./src/screens/PromoterRegisterScreen";
import VenueRegisterScreen from "./src/screens/VenueRegisterScreen";
import PromoterHomeScreen from "./src/screens/PromoterHomeScreen";
import PromoterEventScreen from "./src/screens/PromoterEventScreen";

const RootStack = createStackNavigator();
const PromoterTabNav = createBottomTabNavigator();

export default function App() {
  const isSignedIn = false

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <>
<<<<<<< HEAD
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VoP" component={VenueOrPromoterScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="PromoterRegister" component={PromoterRegisterScreen} options={{ title: 'Promoter', headerBackTitle: 'Back' }} />
          <Stack.Screen name="VenueRegister" component={VenueRegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PromoterHome" component={PromoterTab} options={{ headerShown: false }} />
          {/* <Stack.Screen name="VenueHome" component={() => null} /> */}
=======
          <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="VoP" component={VenueOrPromoterScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <RootStack.Screen name="PromoterRegister" component={PromoterRegisterScreen} options={{ title: 'Promoter', headerBackTitle: 'Back' }} />
          <RootStack.Screen name="VenueRegister" component={VenueRegisterScreen} options={{ title: 'Venue', headerBackTitle: 'Back' }} />
          <RootStack.Screen name="PromoterHome" component={PromoterTab} options={{ headerShown: false, gestureEnabled: false }} />
          <RootStack.Screen name="VenueHome" component={() => null} />
>>>>>>> 6f37f28224f46a916d4570daa439da5231c480c7
        </>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const PromoterTab = () => {
  return (
    <PromoterTabNav.Navigator>
      <PromoterTabNav.Screen name="PromoterHomeTab" component={PromoterHomeScreen} options={{ title: "Home" }} />
      <PromoterTabNav.Screen name="PromoterProfileTab" component={() => null} options={{ title: "Profile" }}/>
    </PromoterTabNav.Navigator>
  )
}
