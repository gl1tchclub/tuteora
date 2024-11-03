import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { View, StyleSheet, ScrollView } from "react-native";
import { UserProvider } from "./contexts/UserContext";
import { SessionProvider } from "./contexts/SessionsContext";
import AppNavigator from "./components/Navigation";
import AuthScreen from "./screens/AuthScreen";
import { KeyboardAvoidingView } from "react-native";

// Keep the splash screen visible while we fetch resources
preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Artificially delay for 3 seconds to simulate a slow loading
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Other things may include fetching data, loading fonts, etc
      } catch (err) {
        console.log(err);
      } finally {
        // Note: finally is always executed
        setIsReady(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // When the root view is loaded, hide the splash screen
      await hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <UserProvider>
      <SessionProvider>
        <View className="flex-1 justify-center" onLayout={onLayoutRootView}>
          <AppNavigator />
          <StatusBar style="auto" />
        </View>
      </SessionProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
    width: "100%",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
