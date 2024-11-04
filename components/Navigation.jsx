import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState, useContext } from "react";

import { UserContext } from "../contexts/UserContext";

import HomeScreen from "../screens/Home.jsx";
import SessionsScreen from "../screens/Sessions.jsx";
import AuthScreen from "../screens/AuthScreen";
import CreateSessionScreen from "../screens/CreateSession";
import RequestsScreen from "../screens/RequestsScreen";
import CreateRequestScreen from "../screens/CreateRequest";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SessionStack = () => {
  return (
    <Stack.Navigator initialRouteName="Sessions">
      <Stack.Screen
        name="SessionsScreen"
        component={SessionsScreen}
        options={{ title: "Sessions" }}
      />
      <Stack.Screen
        name="CreateSession"
        component={CreateSessionScreen}
        options={{ title: "Create Session" }}
      />
    </Stack.Navigator>
  );
};

const RequestStack = () => {
  return (
    <Stack.Navigator initialRouteName="Requests">
      <Stack.Screen
        name="RequestScreen"
        component={RequestsScreen}
        options={{ title: "Requests" }}
      />
      <Stack.Screen
        name="CreateRequest"
        component={CreateRequestScreen}
        options={{ title: "CreateRequest" }}
      />
    </Stack.Navigator>
  );
};

const BottomNavigation = () => {
  return (
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
        name="RequestHome"
        component={RequestStack}
        options={{
          headerShown: false,
          title: "RequestHome",
          tabBarLabel: "Requests",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="human-greeting-variant"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionStack}
        options={{
          title: "Sessions",
          headerShown: false,
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
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user, profile } = useContext(UserContext);
  useEffect(() => {
    console.log("Nav user: ", user);
    console.log("Nav profile: ", profile);
  }, [profile]);
  return (
    <NavigationContainer>
      {user && profile ? (
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
