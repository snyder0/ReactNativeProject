import PatientData from "../patientData";

let A = 0;
let B = 0;
let AB = 0;
let O = 0;

PatientData.forEach((patient) => {
  switch (patient.bloodType) {
    case "A+":
      A++;
      break;
    case "B+":
      B++;
      break;
    case "AB+":
      AB++;
      break;
    case "O+":
      O++;
      break;
    default:
    // code block
  }
});

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
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
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    },
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
};

// Mock data object used for Contribution Graph

const contributionData = [
  { date: "2016-01-02", count: 1 },
  { date: "2016-01-03", count: 2 },
  { date: "2016-01-04", count: 3 },
  { date: "2016-01-05", count: 4 },
  { date: "2016-01-06", count: 5 },
  { date: "2016-01-30", count: 2 },
  { date: "2016-01-31", count: 3 },
  { date: "2016-03-01", count: 2 },
  { date: "2016-04-02", count: 4 },
  { date: "2016-03-05", count: 2 },
  { date: "2016-02-30", count: 4 },
];

// Mock data object for Pie Chart
console.log(A)
const pieChartData = [
  {
    name: "A+",
    population: A,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "B+",
    population: B,
    color: "green",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "AB+",
    population: AB,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "O+",
    population: O,
    color: "#3366FF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }
];

// Mock data object for Progress

const progressChartData = [Math.random(), Math.random(), Math.random()];

export { data, contributionData, pieChartData, progressChartData };
