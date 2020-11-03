import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PromoterEventsScreen from "../screens/promoter/PromoterEventsScreen";
import EventDetails from '../components/EventDetails';

const PromoterEventStackNav = createStackNavigator();

const PromoterEventStackScreens = ({ route }) => {
  return (
    <PromoterEventStackNav.Navigator>
      <PromoterEventStackNav.Screen
        name="PromoterEventHome"
        component={PromoterEventsScreen}
        options={{ headerShown: false }}
      />
      <PromoterEventStackNav.Screen
        name="PromoterEventDetail"
        component={EventDetails}
        options={{ headerShown: false }}
      />
    </PromoterEventStackNav.Navigator>
  );
};

export default PromoterEventStackScreens;
