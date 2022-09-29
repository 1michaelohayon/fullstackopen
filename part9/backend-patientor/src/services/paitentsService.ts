import { patientsEntry, nonSensetivePatientsEntry } from "../types";
import { patientsData} from '../../data/patients';



const getPatients = (): patientsEntry[] => patientsData;


const getPatientsNoSSN = (): nonSensetivePatientsEntry[] => patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}));



export {
  getPatients,
  getPatientsNoSSN
};