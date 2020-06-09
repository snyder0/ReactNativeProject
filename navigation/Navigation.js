import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { DetailsScreen } from "../screens/DetailsScreen";
import DemographicsScreen from "../screens/DemographicsScreen";
import PatientScreen from "../screens/PatientsScreen";
import AccountScreen from "../screens/AccountScreen";
import { PatientInfoScreen } from "../screens/PatientInfoScreen";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name="home" />;
const PersonIcon = (props) => <Icon {...props} name="person" />;
const PeopleIcon = (props) => <Icon {...props} name="people" />;
const PieChartIcon = (props) => <Icon {...props} name="pie-chart" />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    // appearance="noIndicator"
    style={styles.bottomNavigation}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Demographics" icon={PieChartIcon} />
    <BottomNavigationTab title="Patients" icon={PeopleIcon} />
    <BottomNavigationTab title="Account" icon={PersonIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator style={styles.bottomNavigation} tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Demographics" component={DemographicsScreen} />
    <Screen name="Patients" component={PatientScreen} />
    <Screen name="Account" component={AccountScreen} />
    <Screen name="PatientInfo" component={PatientInfoScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  bottomNavigation: {
    color: "red"
  },
});
