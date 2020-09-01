import React from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from "./src/screens/LoginScreen";
import VenueOrPromoterScreen from "./src/screens/VenueOrPromoterScreen";
import PromoterRegisterScreen from "./src/screens/PromoterRegisterScreen";
import VenueRegisterScreen from "./src/screens/VenueRegisterScreen";
import PromoterHome from "./src/screens/PromoterHome";

const Stack = createStackNavigator();

const PromoterTabNav = createBottomTabNavigator();

export default function App() {
  const isSignedIn = false

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VoP" component={VenueOrPromoterScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="PromoterRegister" component={PromoterRegisterScreen} options={{ title: 'Promoter', headerBackTitle: 'Back' }} />
          <Stack.Screen name="VenueRegister" component={VenueRegisterScreen} options={{ title: 'Venue', headerBackTitle: 'Back' }} />
          <Stack.Screen name="PromoterHome" component={PromoterTab} options={{ headerShown: false }} />
          {/* <Stack.Screen name="VenueHome" component={() => null} /> */}
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const PromoterTab = () => {
  return (
    <PromoterTabNav.Navigator>
      <PromoterTabNav.Screen name="PromoterHomeTab" component={PromoterHome} options={{ title: "Home" }} />
      <PromoterTabNav.Screen name="PromoterProfileTab" component={TempView} options={{ title: "Profile" }}/>
    </PromoterTabNav.Navigator>
  )
}

const TempView = () => <View><Text>This view is temporary</Text></View>