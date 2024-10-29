import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Text } from "react-native";

import HomeScreen from "../screens/Home.jsx";
import SessionsScreen from "../screens/Sessions.jsx";
import AuthScreen from "../screens/AuthScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "My Home",
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Sessions"
      component={SessionsScreen}
      options={{
        title: "Sessions",
        tabBarLabel: "Sessions",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="book-account"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>;
};

const AppNavigator = () => {
  const { user } = useState(UserContext);
  console.log("Nav user: ", user);
  return (
    <NavigationContainer>
      {user ? (
        <>
          <BottomNavigation />
        </>
      ) : (
        <>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              screenOptions={{ headerShown: false }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
