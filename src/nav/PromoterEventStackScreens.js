import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventListScreen from "../screens/promoter/EventListScreen";
import EventDetailScreen from '../screens/promoter/EventDetailScreen';

const PromoterEventStackNav = createStackNavigator();

const PromoterEventStackScreens = ({ route }) => {
  return (
    <PromoterEventStackNav.Navigator>
      <PromoterEventStackNav.Screen
        name="PromoterEventHome"
        component={EventListScreen}
        options={{ headerShown: false }}
      />
      <PromoterEventStackNav.Screen
        name="PromoterEventDetail"
        component={EventDetailScreen}
        options={({ route }) => ({
          title: route.params.title
        })}
      />
    </PromoterEventStackNav.Navigator>
  );
};

export default PromoterEventStackScreens;
