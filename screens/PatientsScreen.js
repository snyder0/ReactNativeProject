import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { SearchBar } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import RNListItem from "../components/RNListItem";
import {
  Button,
  Overlay,
  Dimensions,
} from "react-native-elements";
import DemographicsScreen from "./DemographicsScreen";
import {
  RectButton,
  ScrollView,
} from "react-native-gesture-handler";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";

export default function PatientsScreen({ navigation }) {
  const [search, setSearch] = React.useState("");

  const updateSearch = (search) => {
    setSearch(`${search}`);
  };

  const [visible, setVisible] = React.useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <React.Fragment>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        lightTheme={true}
        value={search}
      />
      <Button
        title="Open Overlay"
        onPress={toggleOverlay}
      />

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
       
      </Overlay>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <RNListItem navigation={navigation} />

        {/* <OptionButton
        icon="md-compass"
        label="Read the React Navigation documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        icon="ios-chatboxes"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      /> */}
      </ScrollView>
    </React.Fragment>
  );
}

function OptionButton({
  icon,
  label,
  onPress,
  isLastOption,
}) {
  return (
    <RectButton
      style={[
        styles.option,
        isLastOption && styles.lastOption,
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.optionIconContainer}>
          <Ionicons
            name={icon}
            size={22}
            color="rgba(0,0,0,0.35)"
          />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
  },
});
