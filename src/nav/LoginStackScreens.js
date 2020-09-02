import React from "react";
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from "../screens/LoginScreen";
import LoginVenueOrPromoterScreen from "../screens/LoginVenueOrPromoterScreen";
import LoginPromoterRegisterScreen from "../screens/LoginPromoterRegisterScreen";
import LoginVenueRegisterScreen from "../screens/LoginVenueRegisterScreen";

const LoginStackNav = createStackNavigator()

const LoginStackScreens = () => {
    return (
        <LoginStackNav.Navigator>
            <LoginStackNav.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <LoginStackNav.Screen name="VoP" component={LoginVenueOrPromoterScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <LoginStackNav.Screen name="PromoterRegister" component={LoginPromoterRegisterScreen} options={{ title: 'Promoter', headerBackTitle: 'Back' }} />
            <LoginStackNav.Screen name="VenueRegister" component={LoginVenueRegisterScreen} options={{ headerShown: false }} />
        </LoginStackNav.Navigator>
    );
}

export default LoginStackScreens;