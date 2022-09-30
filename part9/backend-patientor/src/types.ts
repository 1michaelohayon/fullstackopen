export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;

}

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export type NonSensetivePatientsEntry = Omit<PatientsEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientsEntry, 'id'>;

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin: string;
}