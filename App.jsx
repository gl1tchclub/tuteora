/**
 * @fileoverview Main application entry point for the React Native app.
 * Initializes providers for user, session, request, student, and tutor contexts.
 * Handles splash screen visibility and prepares the app resources asynchronously.
 * Displays the main AppNavigator if the app is ready, or a loading indicator otherwise.
 */

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { View, StyleSheet } from "react-native";
import { UserProvider } from "./contexts/UserContext";
import { SessionProvider } from "./contexts/SessionsContext";
import { TutorProvider } from "./contexts/TutorsContext";
import { RequestsProvider } from "./contexts/RequestsContext";
import { StudentProvider } from "./contexts/StudentsContext";
import AppNavigator from "./components/Navigation";

// Keep the splash screen visible while we fetch resources
preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Artificially delay
        await new Promise((resolve) => setTimeout(resolve, 500));

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
      <RequestsProvider>
        <StudentProvider>
          <SessionProvider>
            <TutorProvider>
              <View
                className="flex-1 justify-center"
                onLayout={onLayoutRootView}
              >
                <AppNavigator />
                <StatusBar style="auto" />
              </View>
            </TutorProvider>
          </SessionProvider>
        </StudentProvider>
      </RequestsProvider>
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
