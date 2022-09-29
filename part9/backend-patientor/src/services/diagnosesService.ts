import diagnosesData from '../../data/diagnoses.json';
import { diagnosesEntry } from '../types';

const diagnoses: Array<diagnosesEntry> = diagnosesData as Array<diagnosesEntry>;


const getDiagnoses = (): diagnosesEntry[] => diagnoses;


export default {
  getDiagnoses
};