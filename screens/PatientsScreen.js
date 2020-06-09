import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Overlay, Dimensions } from "react-native-elements";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import PatientData from "../patientData";
import {
  Autocomplete,
  AutocompleteItem,
  Icon,
  Datepicker,
  Divider,
  IndexPath,
  Layout,
  List,
  ListItem,
  Text,
  CalendarViewModes,
  ButtonGroup,
  Button,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import ApiService from "../services/ApiService";
import { createStackNavigator } from "@react-navigation/stack";
import { PatientInfoScreen } from "./PatientInfoScreen";

const Stack = createStackNavigator();

const filter = (item, query) => {
  item.firstName.toLowerCase().includes(query.toLowerCase());
};

const raceOptions = [
  "All",
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Native Hawaiian or Other Pacific Islander",
  "White",
];

export default function PatientsScreen({ navigation }) {
  const [value, setValue] = React.useState(null);
  const [test, setTest] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [patient, setPatient] = React.useState({});
  const [text, setText] = React.useState("Press any button"); // for gender button group
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = raceOptions[selectedIndex.row];

  const navigatePatientInfoScreen = (patient) => {
    navigation.navigate("PatientInfo", patient);
  };

  React.useEffect(() => {
    getAllPatients();
    if (value == null) {
      setTest(data);
    }
  }, []);

  const getAllPatients = () => {
    fetch("http://c9c503b00fd1.ngrok.io/api/patients", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTest(data.data.items);
        setData(data.data.items);
      });
  };

  const searchByName = (query) => {
    let url = "http://c9c503b00fd1.ngrok.io/api/patients";
    if (query !== "") {
      url += `?NameSearch=${query}`;
    }
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTest(data.data.items);
      })
  };

  const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = React.useState(initialDate);
    return { date, onSelect: setDate };
  };

  const onChangeText = (query) => {
    setValue(query);
    searchByName(query);
    if (query == " ") {
      setTest(data);
    }
    // setData(data.filter((item) => filter(item, query)));
  };

  const onSelect = (index) => {
    setValue(`${data[index].firstName} ${data[index].lastName}`);
  };

  const clearInput = () => {
    setValue("");
    setTest(data);
  };

  const toggleOverlay = (item) => {
    setVisible(!visible);
    setPatient(item);
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={`${item.firstName} ${item.lastName}`}
    />
  );

  const renderRaceOption = (title) => <SelectItem title={title} />;

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name="close" />
    </TouchableWithoutFeedback>
  );

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.firstName} ${item.lastName}`}
      description={new Date(item.dateOfBirth).toLocaleDateString()}
      onPress={() => navigatePatientInfoScreen(item)}
    />
  );

  const now = new Date();
  const minDate = new Date(
    now.getFullYear() - 80,
    now.getMonth(),
    now.getDate()
  );
  const minMaxPickerState = useDatepickerState();

  return (
    <React.Fragment>
      <Autocomplete
        placeholder="Search"
        value={value}
        accessoryRight={renderCloseIcon}
        onChangeText={onChangeText}
        onSelect={onSelect}
        style={styles.search}
      >
        {/* {test.length > 0 ? test.map(renderOption) : ''} */}
      </Autocomplete>
      {/* <Layout style={styles.filterContainer} level="3">
        <Datepicker
          min={minDate}
          startView={CalendarViewModes.YEAR}
          style={styles.datePicker}
          {...minMaxPickerState}
        />
        <ButtonGroup style={styles.buttonGroup} size="small">
          <Button onPress={() => setText("Middle button pressed")}>M</Button>
          <Button onPress={() => setText("Right button pressed")}>F</Button>
          <Button onPress={() => setText("Right button pressed")}>O</Button>
        </ButtonGroup>
        <Select
          style={styles.select}
          placeholder="Default"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <SelectItem title="All" />
          <SelectItem title="American Indian or Alaska Native" />
          <SelectItem title="Asian" />
          <SelectItem title="Black or African American" />
          <SelectItem title="Native Hawaiian or Other Pacific Islander" />
          <SelectItem title="White" />
        </Select>
      </Layout> */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.text} category="h1">
          {`${patient.firstName} ${patient.lastName}`}
        </Text>
        <Text style={styles.text}>
          DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>Gender: {patient.genderId}</Text>
        <Text style={styles.text}>Race: {patient.raceId}</Text>
        <Text style={styles.text}>Height: {patient.height}</Text>
        <Text style={styles.text}>Weight: {patient.weight}</Text>
        <Text style={styles.text}>Blood Type: {patient.bloodTypeId}</Text>
        <Text style={styles.text}>Social Security Number: {patient.SSN}</Text>
        <Text style={styles.text}>Email: {patient.email}</Text>
        <Text style={styles.text}>Phone Number: {patient.phoneNumber}</Text>
      </Overlay>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <List
          style={styles.container}
          data={test}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </ScrollView>
    </React.Fragment>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    //paddingTop: 15,
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
  text: {
    margin: 2,
  },
  select: {
    //marginTop: 10,
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
  },
  search: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  datePicker: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  buttonGroup: {
    marginBottom: 8,
  },
});
