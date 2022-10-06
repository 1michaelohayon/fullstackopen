import { NewPatient, NewEntry, BaseEntry, OccupationalHealthcareEntry, HealthCheckEntry, HospitalEntry } from "./types";
import parse from "./parse";


type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown,
  nonExist: unknown
};

const toNewPatient = (body: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parse.name(body.name),
    dateOfBirth: parse.dateOfBirth(body.dateOfBirth),
    ssn: parse.ssn(body.ssn),
    gender: parse.gender(body.gender),
    occupation: parse.occupation(body.occupation),
    entries: []
  };
  return newEntry;
};

export default toNewPatient;



type EntryFields = {
  date: unknown,
  specialist: unknown,
  description: unknown,
  type: unknown,
  employerName?: unknown,
  healthCheckRating?: unknown,
  discharge?: unknown,
  diagnosisCodes?: unknown;
  sickLeave?: unknown;
};


export const toNewEntry = (body: EntryFields): NewEntry => {
  const validBaseEntry: Omit<BaseEntry, 'id'> = {
    date: parse.date(body.date),
    specialist: parse.specialist(body.specialist),
    description: parse.description(body.description),
    diagnosisCodes: parse.diagnosesCodes(body.diagnosisCodes)
  };


  if (body.type === "OccupationalHealthcare") {
    const validOccupationalHealthcare: Omit<OccupationalHealthcareEntry, 'id'> = {
      ...validBaseEntry,
      type: "OccupationalHealthcare",
      sickLeave: parse.sickLeave(body.sickLeave),
      employerName: parse.employerName(body.employerName),
    };

    return validOccupationalHealthcare;
  } else if (body.type === "HealthCheck") {
    const validHealthCheck: Omit<HealthCheckEntry, 'id'> = {
      ...validBaseEntry,
      type: "HealthCheck",
      healthCheckRating: parse.healthCheckRating(body.healthCheckRating)
    };

    return validHealthCheck;
  } else if (body.type === "Hospital") {

    const validHospital: Omit<HospitalEntry, 'id'> = {
      ...validBaseEntry,
      type: 'Hospital',
      discharge: parse.discharge(body.discharge)
    };


    return validHospital;
  } else {
    throw new Error(`Incorrect or missing type ${body.type}`);
  }

};