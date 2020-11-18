import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { PromoterEventStackScreens, PromoterSavedEventStackScreens } from './PromoterEventStackScreens';
import PromoterActivityScreen from "../screens/promoter/PromoterActivityScreen";
import MessageStackScreens from './MessageStackScreens';
import PromoterProfile from '../screens/promoter/ProfileScreen';
import theme, { tabDefaults } from '../utils/theme.styles'

const PromoterTabNav = createBottomTabNavigator();

const PromoterTabScreens = () => {
    return (
        <PromoterTabNav.Navigator tabBarOptions={{
            activeTintColor: '#313131',
            inactiveTintColor: 'gray',
            style: {
                height: 80,
            },
        }}>
            <PromoterTabNav.Screen
                name="PromoterEventList"
                component={PromoterEventStackScreens}
                options={
                    {
                        title: "Events",
                        tabBarIcon: ({ focused, size, color }) => (
                            <Ionicons name="ios-calendar" size={size} color={focused ? theme.PRIMARY_COLOR : 'gray'} />
                        ),
                    }} />
            <PromoterTabNav.Screen
                    name="PromoterSavedEvents"
                    component={PromoterSavedEventStackScreens}
                    options={
                            {
                                title: "Saved",
                                tabBarIcon: ({ focused, size, color }) => (
                                    <Ionicons name="ios-bookmark" size={size} color={focused ? theme.PRIMARY_COLOR : 'gray'} />
                                ),
                            }} />
            <PromoterTabNav.Screen
                name="PromoterInbox"
                component={MessageStackScreens}
                options={
                    {
                        title: "Inbox",
                        tabBarIcon: ({ focused, size, color }) => (
                            <Ionicons name="ios-chatboxes" size={size} color={focused ? theme.PRIMARY_COLOR : 'gray'} />
                        )
                    }} />
            <PromoterTabNav.Screen
                  name="PromoterActivity"
                  component={PromoterActivityScreen}
                  options={{
                                title: "Activity",
                                tabBarIcon: ({ focused, size, color }) => (
                                    <FontAwesome5 name="chart-line" size={size} color={focused ? theme.PRIMARY_COLOR : 'gray'} />
                                )
                            }} />
            <PromoterTabNav.Screen
                name="PromoterProfile"
                component={PromoterProfile}
                options={
                    {
                        title: "Profile",
                        tabBarIcon: ({ focused, size, color }) => (
                            <Ionicons name="ios-contact" size={size} color={focused ? theme.PRIMARY_COLOR : 'gray'} />
                        ),
                    }} />
        </PromoterTabNav.Navigator>
    )
}

export default PromoterTabScreens;
