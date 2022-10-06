import diagnosesData from '../../data/diagnoses.json';
import { Diagnoses } from '../types';

const diagnoses: Array<Diagnoses> = diagnosesData as Array<Diagnoses>;


const getDiagnoses = (): Diagnoses[] => diagnoses;


export default {
  getDiagnoses
};