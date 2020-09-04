import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PromoterEventListScreen from "../screens/PromoterEventListScreen";
import PromoterEventDetailScreen from '../screens/PromoterEventDetailScreen';

const PromoterEventStackNav = createStackNavigator();

const PromoterEventStackScreens = ({ route }) => {
  return (
    <PromoterEventStackNav.Navigator>
      <PromoterEventStackNav.Screen
        name="PromoterEventHome"
        component={PromoterEventListScreen}
        options={{ headerShown: false }}
      />
      <PromoterEventStackNav.Screen
        name="PromoterEventDetail"
        component={PromoterEventDetailScreen}
        options={({ route }) => ({
          title: route.params.title
        })}
      />
    </PromoterEventStackNav.Navigator>
  );
};

export default PromoterEventStackScreens;
