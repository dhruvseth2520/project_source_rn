import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import PromoterEventListScreen from '../screens/PromoterEventListScreen';
import TempScreen from '../screens/TempScreen';

const PromoterTabNav = createBottomTabNavigator();

const PromoterTabScreens = () => {
    return (
        <PromoterTabNav.Navigator>
            <PromoterTabNav.Screen
                name="PromoterHomeTab"
                component={PromoterEventListScreen}
                options={
                    {
                        title: "Events",
                        tabBarIcon: ({ focused, size, color }) => (
                            <Ionicons name="ios-albums" size={size} color={color} />
                        )
                    }} />
            <PromoterTabNav.Screen
                name="PromoterProfileTab"
                component={TempScreen}
                options={
                    {
                        title: "Profile",
                        tabBarIcon: ({ focused, size, color }) => (
                            <Ionicons name="ios-contact" size={size} color={color} />
                        ),
                    }} />
        </PromoterTabNav.Navigator>
    )
}

export default PromoterTabScreens;
