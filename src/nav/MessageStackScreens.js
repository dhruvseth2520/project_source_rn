import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessageListScreen from "../screens/MessageListScreen";
import MessageRoomScreen from '../screens/MessageRoomScreen';

const MessageStackNav = createStackNavigator();

const MessageStackScreens = ({ route, navigation }) => {
  return (
    <MessageStackNav.Navigator>
      <MessageStackNav.Screen
        name="MessageList"
        component={MessageListScreen}
        options={{title: 'Chats'}}
      />
      <MessageStackNav.Screen
        name="MessageRoom"
        component={MessageRoomScreen}
        options={({ route }) => ({
          title: route.params.title
        })}
      />
    </MessageStackNav.Navigator>
  );
};

export default MessageStackScreens;
