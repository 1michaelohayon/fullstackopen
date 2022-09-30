import { PatientsEntry, NewPatientEntry, NonSensetivePatientsEntry } from "../types";
import patientsData from "../../data/patients";
import { v1 as uuid } from 'uuid';



const getPatients = (): PatientsEntry[] => patientsData;

const addPatient = (entry: NewPatientEntry):PatientsEntry => {
  
  const patientToAdd = {...entry, id: uuid()};
  patientsData.push(patientToAdd);
  return patientToAdd;
};

const getPatientsNoSSN = (): NonSensetivePatientsEntry[] => patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}));



export {
  getPatients,
  addPatient,
  getPatientsNoSSN
};