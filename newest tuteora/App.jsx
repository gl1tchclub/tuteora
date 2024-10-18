// import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "react-native";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppNavigator from './components/Navigation';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View
      style={styles.root}
      onLayout={onLayoutRootView}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <AppNavigator />
          <StatusBar barStyle="default" />
        </View>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
