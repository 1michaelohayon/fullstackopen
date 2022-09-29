export interface patientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;

}

export type nonSensetivePatientsEntry = Omit<patientsEntry, 'ssn'>;

export interface diagnosesEntry {
  code: string;
  name: string;
  latin: string;
}