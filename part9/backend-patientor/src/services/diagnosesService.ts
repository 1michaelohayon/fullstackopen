import diagnosesData from '../../data/diagnoses.json';
import { DiagnosesEntry } from '../types';

const diagnoses: Array<DiagnosesEntry> = diagnosesData as Array<DiagnosesEntry>;


const getDiagnoses = (): DiagnosesEntry[] => diagnoses;


export default {
  getDiagnoses
};