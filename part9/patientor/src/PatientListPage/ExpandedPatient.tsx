import React from "react";
import { Patient, Entry } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDettails from "../components/EntryDetails";

import axios from "axios";
import { apiBaseUrl } from "../constants";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryForm from "../AddEntryModal";
import { Button } from "@material-ui/core";
import { useStateValue, setExpandedPatient } from "../state";
interface ExpandedPatientProps {
  patient: Patient | null | undefined
}

const ExpandedPatient = (props: ExpandedPatientProps) => {
  const [, dispatch] = useStateValue();
const patient = props.patient;
const [modalOpen, setModalOpen] = React.useState<boolean>(false);
const [error, setError] = React.useState<string | undefined>();


  if (!patient) {
    return <div>something went wrong...</div>;
  }





  const submitNewEntry = async (values: EntryFormValues) => {
    console.log('values:::', values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );

      console.log(newEntry);
      const updatedPatient = {...patient, entries: patient.entries?.concat(newEntry)};
      dispatch(setExpandedPatient(updatedPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };



  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


return (
  <div>
    <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon/> : <FemaleIcon/>} </h2>
    <p>
      ssh: {patient.ssn}<br/>
      occupation: {patient.occupation}
    </p>
    <h3>entries</h3>
    {patient.entries?.map((entry: Entry) => <EntryDettails key={entry.id} entry={entry}/>)}

    <AddEntryForm
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
            <Button variant="contained" color="primary" onClick={() => openModal()}>
        Add New Entry
      </Button>
  </div>
);
  
};

export default ExpandedPatient;

