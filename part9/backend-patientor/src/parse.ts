
import { Gender, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const name = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name`);
  }
  return name;
};
const date = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error(`Incorrect or missing date`);
  }
  return date;
};
const specialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist`);
  }
  return specialist;
};
const description = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description`);
  }
  return description;
};
const employerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employerName`);
  }
  return employerName;
};
const dateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error(`Incorrect or missing dateOfBirth`);
  }
  return dateOfBirth;
};
const occupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation`);
  }
  return occupation;
};
const ssn = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing ssn`);
  }
  return occupation;
};
////////////////////////////////////////////////////////




// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
const gender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

///////////////

interface DischargeType {
  date: string;
  criteria: string;
}
const isDischarge = (object: any): object is DischargeType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const date = object.date;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const criteria = object.criteria;
  return isString(date) && isString(criteria);
};
const discharge = (discharge: unknown): DischargeType => {
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};
//////////////////////
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};
const healthCheckRating = (HealthCheckRating: unknown): HealthCheckRating => {
  if (typeof HealthCheckRating === undefined || !isHealthCheckRating(HealthCheckRating)) {
    throw new Error('Incorrect or missing HealthCheckRating');
  }
  return HealthCheckRating;
};
////////////////////////////////
const isStringArray = (arr: unknown): arr is string[] => {
  return arr instanceof Array<string>;
};

const diagnosesCodes = (diagnosesCodes: unknown): string[] | undefined => {
  if (!diagnosesCodes) {
    return undefined;
  }
  if (!isStringArray(diagnosesCodes)) {
    throw new Error('Incorrect or missing diagnosesCodes');
  }
  return diagnosesCodes;
};
/////////////////////////

interface SickLeave {
  startDate: string;
  endDate: string;
}
const isSickLeave = (object: any): object is SickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const startDate = object.startDate;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const endDate = object.endDate;
  return isString(startDate) && isString(endDate);
};
const sickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  if (!isSickLeave(sickLeave)) {
    throw new Error(`Incorrect or missing SickLeave ${sickLeave}`);
  }
  return sickLeave;
};


const occupationalHealthcare = (type: unknown): "OccupationalHealthcare" => {
  if (!type || !isString(type) || type !== "OccupationalHealthcare") {
    throw new Error(`Incorrect or missing OccupationalHealthcare`);
  }
  return type;
};
const healthCheck = (type: unknown): "HealthCheck" => {
  if (!type || !isString(type) || type !== "HealthCheck") {
    throw new Error(`Incorrect or missing HealthCheck`);
  }
  return type;
};
const hospital = (type: unknown): "Hospital" => {
  if (!type || !isString(type) || type !== "Hospital") {
    throw new Error(`Incorrect or missing Hospital`);
  }
  return type;
};


export default {
  name,
  specialist,
  date,
  description,
  employerName,
  dateOfBirth,
  ssn,
  occupation,
  gender,
  discharge,
  healthCheckRating,
  diagnosesCodes,
  sickLeave,
  occupationalHealthcare,
  healthCheck,
  hospital
};