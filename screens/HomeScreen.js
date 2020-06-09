import React from "react";
import { SafeAreaView, Image } from "react-native";
import { Button, Divider, Layout, TopNavigation, Text } from "@ui-kitten/components";

export const HomeScreen = ({ navigation }) => {
  const navigateDemographics = () => {
    navigation.navigate("Demographics");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image style={{ width: 300, height: 105, marginBottom: 5 }} source={require("../assets/images/BRG.png")} />
        <Text>What's up Doc</Text>
        {/* <Button onPress={navigateDemographics}>Open Demographics</Button> */}
      </Layout>
    </SafeAreaView>
  );
};
