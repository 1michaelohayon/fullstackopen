import { Patient, NewPatient, PublicPatient, Entry, NewEntry } from "../types";
import patientsData from "../../data/patients";
import { v1 as uuid } from 'uuid';



const getPatients = (): Patient[] => patientsData;

const addPatient = (patient: NewPatient):Patient => {
  
  const patientToAdd = {...patient, id: uuid()};
  patientsData.push(patientToAdd);
  return patientToAdd;
};



const addEntry = (entry: NewEntry, patient: Patient | undefined):Entry => {

  const entryToAdd = {...entry, id: uuid()};

  if (!patient){
    throw new Error(`patient is undefined, entry: ${entry}, patient: ${patient}`);
    }



  const targetPatient = patientsData.find(p => p.id === patient.id);
  if (targetPatient?.entries){
    targetPatient?.entries.push(entryToAdd);
  } else {
    throw new Error(`targetPatient is undefined, entry: ${entry}, patient: ${patient}`);
  }
  return entryToAdd;
};



const getPatientsNoSSN = (): PublicPatient[] => patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}));



export {
  getPatients,
  addPatient,
  getPatientsNoSSN,
  addEntry
};