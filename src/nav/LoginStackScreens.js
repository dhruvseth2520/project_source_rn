import React from "react";
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from "../screens/login/LoginScreen";
import VenueOrPromoterScreen from "../screens/login/VenueOrPromoterScreen";
import PromoterRegisterScreen from "../screens/login/PromoterRegisterScreen";
import VenueRegisterScreen from "../screens/login/VenueRegisterScreen";
import VenueInfoDeck from "../screens/login/VenueInfoDeck";
import PromoterInfoDeck from "../screens/login/PromoterInfoDeck";
const LoginStackNav = createStackNavigator()

const LoginStackScreens = () => {
    return (
        <LoginStackNav.Navigator>
            <LoginStackNav.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <LoginStackNav.Screen name="VoP" component={VenueOrPromoterScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <LoginStackNav.Screen name="PromoterRegister" component={PromoterRegisterScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <LoginStackNav.Screen name="VenueInfo" component={VenueInfoDeck} options={{ headerShown: false, gestureEnabled: false }} />
            <LoginStackNav.Screen name="PromoterInfo" component={PromoterInfoDeck} options={{ headerShown: false, gestureEnabled: false }} />
            <LoginStackNav.Screen name="VenueRegister" component={VenueRegisterScreen} options={{ headerShown: false, gestureEnabled: false }} />
        </LoginStackNav.Navigator>
    );
}

export default LoginStackScreens;
