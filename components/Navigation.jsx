import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/Home.jsx";
import SessionsScreen from "../screens/Sessions.jsx";
import AuthScreen from "../screens/Auth.jsx";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomNavigation />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth">
            {(props) => (
              <AuthScreen {...props} onLogin={() => setIsLoggedIn(true)} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};


export default AppNavigator;
