import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PromoterHomeScreen from '../screens/PromoterHomeScreen';

const PromoterTabNav = createBottomTabNavigator();

const PromoterTabScreens = () => {
    return (
        <PromoterTabNav.Navigator>
            <PromoterTabNav.Screen name="PromoterHomeTab" component={PromoterHomeScreen} options={{ title: "Home" }} />
            <PromoterTabNav.Screen name="PromoterProfileTab" component={() => null} options={{ title: "Profile" }} />
        </PromoterTabNav.Navigator>
    )
}

export default PromoterTabScreens;