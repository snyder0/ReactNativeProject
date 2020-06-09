// import PatientData from "../patientData";

let A = 0;
let B = 0;
let AB = 0;
let O = 0;

let bloodTypes = [];
let PatientData = [];

const getAllPatients = () => {
  fetch("http://c9c503b00fd1.ngrok.io/api/patients", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      PatientData = data.data.items;
    });
};

fetch("http://c9c503b00fd1.ngrok.io/api/bloodtypes", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    bloodTypes = data.data;
  });

getAllPatients();

PatientData.forEach((patient) => {
  switch (patient.bloodTypeId) {
    case 1:
      A++;
      break;
    case 2:
      B++;
      break;
    case 3:
      AB++;
      break;
    case 4:
      O++;
      break;
    default:
    // code block
  }
});

const data = {
  labels: ["0-17", "18-39", "40-64", "65+"],
  datasets: [
    {
      data: [
        10,
        20,
        30,
        40
      ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    },
    {
      data: [
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
  },
];

// Mock data object for Progress

const progressChartData = [Math.random(), Math.random(), Math.random()];

export { data, contributionData, pieChartData, progressChartData };
