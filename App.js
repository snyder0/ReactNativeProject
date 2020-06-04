import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DemographicsScreen from "./screens/DemographicsScreen";
import * as React from "react";
import * as eva from "@eva-design/eva";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import useCachedResources from "./hooks/useCachedResources";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import {
  ApplicationProvider,
  IconRegistry,
  TopNavigation,
  Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./navigation/Navigation";

const Stack = createStackNavigator();

const theme = {
  // Button: {
  //   raised: true,
  // },
};

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <TopNavigation
            title={(evaProps) => <Text {...evaProps}>React Native Project</Text>}
            subtitle={(evaProps) => <Text {...evaProps}>Demo</Text>}
          />
          <AppNavigator />
        </ApplicationProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
