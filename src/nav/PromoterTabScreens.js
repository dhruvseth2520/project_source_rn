import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import PromoterEventStackScreens from './PromoterEventStackScreens';

import PromoterProfile from '../screens/PromoterProfileScreen';
import TempScreen from '../screens/TempScreen';

const PromoterTabNav = createBottomTabNavigator();

const PromoterTabScreens = () => {
    return (
        <PromoterTabNav.Navigator>
            <PromoterTabNav.Screen
                name="PromoterEventList"
                component={PromoterEventStackScreens}
                options={
                    {
                        title: "Events",
                        tabBarIcon: ({ focused, size, color }) => (
                            <Ionicons name="ios-albums" size={size} color={color} />
                        ),
                    }} />
            <PromoterTabNav.Screen
                name="PromoterInbox"
                component={TempScreen}
                options={
                    {
                        title: "Inbox",
                        tabBarIcon: ({ focused, size, color }) => (
                            <Ionicons name="ios-chatboxes" size={size} color={color} />
                        )
                    }} />
            <PromoterTabNav.Screen
                name="PromoterProfile"
                component={PromoterProfile}
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
