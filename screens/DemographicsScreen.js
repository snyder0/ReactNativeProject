import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { ScrollView, StatusBar, Dimensions, Text, View } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import {
  data,
  contributionData,
  pieChartData,
  progressChartData,
} from "./data";
import { MonoText } from "../components/StyledText";
import { ChartData } from "../components/ChartData";
import "babel-polyfill";

const chartConfigs = [
  {
    backgroundColor: "#F4F4F4",
    backgroundGradientFrom: "#0091EA",
    backgroundGradientTo: "#0091EA",
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#022173",
    backgroundGradientFrom: "#022173",
    backgroundGradientTo: "#1b3fa0",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#26872a",
    backgroundGradientFrom: "#43a047",
    backgroundGradientTo: "#66bb6a",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#000000",
    backgroundGradientTo: "#000000",
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
  },
  {
    backgroundColor: "#0091EA",
    backgroundGradientFrom: "#0091EA",
    backgroundGradientTo: "#0091EA",
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
  },
  {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#b90602",
    backgroundGradientFrom: "#e53935",
    backgroundGradientTo: "#ef5350",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#ff3e03",
    backgroundGradientFrom: "#ff3e03",
    backgroundGradientTo: "#ff3e03",
    color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`,
  },
];

export default function DemographicsScreen({ route }) {
  const [patientData, setPatientData] = React.useState([]);
  const [patientAges, setPatientAges] = React.useState([]);
  const [ageRange, setAgeRange] = React.useState([]);

  React.useEffect(() => {
    getAllPatients();
    getPatientAges();
    getAgeRanges();
  }, []);

  const getAllPatients = () => {
    fetch("http://c9c503b00fd1.ngrok.io/api/patients", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setPatientData(data.data.items);
      });
  };

  const getPatientAges = () => {
    let ageArray = patientData.map((patient) => {
      let bday = new Date(patient.dateOfBirth);
      let age = getAge(bday);
      return age;
    });
    setPatientAges(ageArray);
  };

  const getAge = (birthday) => {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const getAgeRanges = () => {
    let ageRangeArray = [0, 0, 0, 0];
    for (let age of patientAges) {
      if (age <= 17) {
        ageRangeArray[0]++;
      } else if (age <= 39) {
        ageRangeArray[1]++;
      } else if (age <= 64) {
        ageRangeArray[2]++;
      } else if (age >= 65) {
        ageRangeArray[3]++;
      }
    }
    setAgeRange(ageRangeArray);
  };

  const width = Dimensions.get("window").width - 30;
  const height = 220;

  const renderTabBar = () => {
    return <StatusBar />;
  };

  const ageData = {
    labels: ["0-17", "18-39", "40-64", "65+"],
    datasets: [
      {
        data: ageRange,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      },
    ],
  };

  const pieChartData = [
    {
      name: "A+",
      population: 10,
      color: "#00bfff",
      legendFontColor: "#00bfff",
      legendFontSize: 15,
    },
    {
      name: "A-",
      population: 4,
      color: "#0080ff",
      legendFontColor: "#0080ff",
      legendFontSize: 15,
    },
    {
      name: "B+",
      population: 12,
      color: "#bf00ff",
      legendFontColor: "#bf00ff",
      legendFontSize: 15,
    },
    {
      name: "B-",
      population: 12,
      color: "#4000ff",
      legendFontColor: "#4000ff",
      legendFontSize: 15,
    },
    {
      name: "AB+",
      population: 63,
      color: "#ffbf00",
      legendFontColor: "#ffbf00",
      legendFontSize: 15,
    },
    {
      name: "AB-",
      population: 63,
      color: "#ff0000",
      legendFontColor: "#ff0000",
      legendFontSize: 15,
    },
    {
      name: "O+",
      population: 4,
      color: "#8000ff",
      legendFontColor: "#8000ff",
      legendFontSize: 15,
    },
    {
      name: "O-",
      population: 4,
      color: "#3366FF",
      legendFontColor: "#3366FF",
      legendFontSize: 15,
    },
  ];

  

  return (
    <ScrollableTabView renderTabBar={renderTabBar}>
      {chartConfigs.map((chartConfig) => {
        const labelStyle = {
          color: "#000000",
          marginVertical: 10,
          textAlign: "center",
          fontSize: 16,
        };
        const graphStyle = {
          marginVertical: 8,
          ...chartConfig.style,
        };
        const containerStyle = {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        };
        return (
          <ScrollView
            key={Math.random()}
            style={{
              backgroundColor: chartConfig.backgroundColor,
            }}
          >
            {/* <View>
              <Text>Bezier Line Chart</Text>
              <LineChart
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                  ],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#1c348c",
                  backgroundGradientFrom: "#49a2d7",
                  backgroundGradientTo: "#0096d6",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View> */}
            {/* <View style={containerStyle}>
              <Text style={labelStyle}>Bezier Line Chart</Text>
              <LineChart
                data={ageData}
                width={width}
                height={height}
                chartConfig={chartConfig}
                bezier
                style={graphStyle}
              />
            </View>
            <View style={containerStyle}>
              <Text style={labelStyle}>Progress Chart</Text>
              <ProgressChart
                data={progressChartData}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
            </View> */}
            {ageData && <View style={containerStyle}>
              <Text style={labelStyle}>Patient Ages</Text>
              <BarChart
                width={width}
                height={height}
                data={ageData}
                chartConfig={chartConfig}
                style={graphStyle}
              />
            </View>}
            <View style={containerStyle}>
              <Text style={labelStyle}>Patient Blood Types</Text>
              <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
              />
            </View>
            {/* <View style={containerStyle}>
              <Text style={labelStyle}>Line Chart</Text>
              <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
            </View>
            <View style={containerStyle}>
              <Text style={labelStyle}>Contribution Graph</Text>
              <ContributionGraph
                values={contributionData}
                width={width}
                height={height}
                endDate={new Date("2016-05-01")}
                numDays={105}
                chartConfig={chartConfig}
                style={graphStyle}
              />
            </View> */}
          </ScrollView>
        );
      })}
    </ScrollableTabView>
  );
}

DemographicsScreen.navigationOptions = {
  header: null,
};
