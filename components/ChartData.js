import * as React from "react";

export function ChartData(props) {
 const [patientData, setPatientData] = React.useState([])
 const [patientAges, setPatientAges] = React.useState([])

 React.useEffect(() => {
    getAllPatients()
    getPatientAges()
 }, [])

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
    patientData.forEach((patient) => {
        let age = getAge(patient.dateOfBirth)
        setPatientAges([...patientAges, age])
    })
  }

  const getAge = (birthday) => {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return patientAges
}
