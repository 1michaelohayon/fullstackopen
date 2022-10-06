import React from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { setPatientList, setDiagnoses, useStateValue} from "./state";
import { Diagnoses, Patient } from "./types";

import ExpandedPatient from "./PatientListPage/ExpandedPatient";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";

const App = () => {
  const [{expendedPatients}, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const { data: diagnosesListFromApi } = await axios.get<Diagnoses[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setPatientList(patientListFromApi));
        dispatch(setDiagnoses(diagnosesListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);



  const match = useMatch('patients/:id');
  const patient = match
    ? Object.values(expendedPatients).find(p => p.id === String(match.params.id))
    : null;



  return (
    <div className="App">
      
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<ExpandedPatient patient={patient}/>} />
          </Routes>
        </Container>
      
    </div>
  );
};

export default App;
