import React from "react";
import { SafeAreaView, Image, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";

export const PatientInfoScreen = ({navigation, route}) => {
  const navigatePatientScreen = (patient) => {
    navigation.navigate("Patients");
  };

  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const BackAction = () => <TopNavigationAction style={{marginLeft: 10}} icon={BackIcon} onPress={navigatePatientScreen} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation accessoryLeft={BackAction} title="Back to patients" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.text} category="h1">
          {`${route.params.firstName} ${route.params.lastName}`}
        </Text>
        <Text style={styles.text}>
          DOB: {new Date(route.params.dateOfBirth).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>Gender: {route.params.genderId}</Text>
        <Text style={styles.text}>Race: {route.params.raceId}</Text>
        <Text style={styles.text}>Height: {route.params.height}</Text>
        <Text style={styles.text}>Weight: {route.params.weight}</Text>
        <Text style={styles.text}>
          Blood Type: {route.params.bloodTypeId}
        </Text>
        <Text style={styles.text}>
          Social Security Number: {route.params.SSN}
        </Text>
        <Text style={styles.text}>Email: {route.params.email}</Text>
        <Text style={styles.text}>
          Phone Number: {route.params.phoneNumber}
        </Text>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 2,
  },
});
