import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import PromoterEventStackScreens from './PromoterEventStackScreens';
import MessageStackScreens from './MessageStackScreens';

import PromoterProfile from '../screens/promoter/ProfileScreen';

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
                component={MessageStackScreens}
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
