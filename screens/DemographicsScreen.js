import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  ScrollView,
  StatusBar,
  Dimensions,
  Text,
  View,
} from "react-native";
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
import "babel-polyfill";

const chartConfigs = [
  {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) =>
      `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#022173",
    backgroundGradientFrom: "#022173",
    backgroundGradientTo: "#1b3fa0",
    color: (opacity = 1) =>
      `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#26872a",
    backgroundGradientFrom: "#43a047",
    backgroundGradientTo: "#66bb6a",
    color: (opacity = 1) =>
      `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#000000",
    backgroundGradientTo: "#000000",
    color: (opacity = 1) =>
      `rgba(${255}, ${255}, ${255}, ${opacity})`,
  },
  {
    backgroundColor: "#0091EA",
    backgroundGradientFrom: "#0091EA",
    backgroundGradientTo: "#0091EA",
    color: (opacity = 1) =>
      `rgba(${255}, ${255}, ${255}, ${opacity})`,
  },
  {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    color: (opacity = 1) =>
      `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#b90602",
    backgroundGradientFrom: "#e53935",
    backgroundGradientTo: "#ef5350",
    color: (opacity = 1) =>
      `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: "#ff3e03",
    backgroundGradientFrom: "#ff3e03",
    backgroundGradientTo: "#ff3e03",
    color: (opacity = 1) =>
      `rgba(${0}, ${0}, ${0}, ${opacity})`,
  },
];

export default function DemographicsScreen({ route }) {
  const width = Dimensions.get("window").width - 30;
  const height = 220;

  const renderTabBar = () => {
    return <StatusBar />;
  };

  return (
    <ScrollableTabView renderTabBar={renderTabBar}>
      {chartConfigs.map((chartConfig) => {
        const labelStyle = {
          color: chartConfig.color(),
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
            <View style={containerStyle}>
              <Text style={labelStyle}>
                Bezier Line Chart
              </Text>
              <LineChart
                data={data}
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
            </View>
            <View style={containerStyle}>
              <Text style={labelStyle}>Bar Graph</Text>
              <BarChart
                width={width}
                height={height}
                data={data}
                chartConfig={chartConfig}
                style={graphStyle}
              />
            </View>
            <View style={containerStyle}>
              <Text style={labelStyle}>Pie Chart</Text>
              <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
              />
            </View>
            <View style={containerStyle}>
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
              <Text style={labelStyle}>
                Contribution Graph
              </Text>
              <ContributionGraph
                values={contributionData}
                width={width}
                height={height}
                endDate={new Date("2016-05-01")}
                numDays={105}
                chartConfig={chartConfig}
                style={graphStyle}
              />
            </View>
          </ScrollView>
        );
      })}
    </ScrollableTabView>
  );
}

DemographicsScreen.navigationOptions = {
  header: null,
};
