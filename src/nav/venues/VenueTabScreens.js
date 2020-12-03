import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import VenuePromoterStackScreen from "./VenuePromoterStackScreen";
import VenueEventStackScreen from "./VenueEventStackScreen";
import VenueLedgerStackScreen from "./VenueLedgerStackScreen";
import TempScreen from '../../screens/TempScreen';

const VenueTabNav = createBottomTabNavigator();

const VenueTabScreens = () => {

  return (
        <VenueTabNav.Navigator tabBarOptions={{
        activeTintColor: '#515131',
        inactiveTintColor: 'gray',
        }}>
          <VenueTabNav.Screen name="VenuePromoters"
            options={{
              tabBarIcon: ({ focused, size }) => (
                  <Ionicons name="md-people" size={size} color={focused ? "#1AA2B0" : 'gray'} style={{"marginTop": 5}}/>
              ),
              headerShown: false,
              title: "Promoters",
              style: {marginVertical: 5}
            }}
            component={VenuePromoterStackScreen}
         />

          <VenueTabNav.Screen name="VenueEvents"
            options={{
              tabBarIcon: ({ focused, size }) => (
                <Ionicons name="ios-calendar" size={size} color={focused ? "#1AA2B0" : 'gray'} style={{"marginTop": 5}}/>
              ),
              headerShown: false,
              title: "Events"
            }}
            component={VenueEventStackScreen}
           />

          <VenueTabNav.Screen name="VenueMessages"
            options={{
              tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name="ios-chatboxes" size={size} color={focused ? '#1AA2B0' : 'gray'} style={{"marginTop": 5}}/>
              ),
              headerShown: false,
              title: "Inbox"
            }}
            component={TempScreen} />

          <VenueTabNav.Screen name="VenueLedger"
            options={{
              tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name="ios-wallet" size={size} color={focused ? '#1AA2B0' : 'gray'} style={{"marginTop": 5}}/>
              ),
              headerShown: false,
              title: "Ledger"
            }}
            component={VenueLedgerStackScreen} />

          <VenueTabNav.Screen
            name="VenueSettings"
            options={{
              tabBarIcon: ({ focused, size }) => (
                <Ionicons name="md-settings" size={size} color={focused ? "#1AA2B0" : 'gray'} style={{"marginTop": 5}}/>
              ),
              headerShown: false,
              title: "Settings"
            }}
            component={TempScreen} />
        </VenueTabNav.Navigator>
  )
}

export default VenueTabScreens;