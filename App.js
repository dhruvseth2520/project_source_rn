import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getData, removeData } from './src/utils/localStorage';
import LoginStackScreens from "./src/nav/LoginStackScreens";
import VenueTabScreens from "./src/nav/venues/VenueTabScreens";
import PromoterTabScreens from "./src/nav/promoters/PromoterTabScreens";

const RootStack = createStackNavigator();

export default function App() {
  const [initialRoute, setRoute] = useState("");
  removeData('@promoterFormData');
  removeData('@venueFormData');

  getData('@venueFormData').then(response => {
    if (!response) {
      getData('@promoterFormData').then(response => {
        if (response) {
          setRoute("Promoter");
        } else {
          setRoute("Login");
        }
      })
    } else {
      setRoute("Venue");
    }
  })

  return (
    <NavigationContainer>
      {initialRoute === 'Promoter' ? (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="PromoterTab" component={PromoterTabScreens} options={{ gestureEnabled: false }} />
            <RootStack.Screen name="Login" component={LoginStackScreens} />
            <RootStack.Screen name="VenueTab" component={VenueTabScreens} options={{ gestureEnabled: false }} />
        </RootStack.Navigator>
      ) : <></>}
      {initialRoute === 'Login' ? (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Login" component={LoginStackScreens} />
          <RootStack.Screen name="PromoterTab" component={PromoterTabScreens} options={{ gestureEnabled: false }} />
          <RootStack.Screen name="VenueTab" component={VenueTabScreens} options={{ gestureEnabled: false }} />
        </RootStack.Navigator>
      ) : <></>}
      {initialRoute === 'Venue' ? (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="VenueTab" component={VenueTabScreens} options={{ gestureEnabled: false }} />
          <RootStack.Screen name="Login" component={LoginStackScreens} />
          <RootStack.Screen name="PromoterTab" component={PromoterTabScreens} options={{ gestureEnabled: false }} />
        </RootStack.Navigator>
      ) : <></>}

    </NavigationContainer>
  );
}
