import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Entry, Diagnoses, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import MonitorHeartSharpIcon from '@mui/icons-material/MonitorHeartSharp';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';

interface EntryDetailsProps {
  entry: Entry
}

const EntryDetails = (props: EntryDetailsProps): JSX.Element => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosis = (code: string): JSX.Element => {
    const diagnosis = (diagnosis: Diagnoses | undefined): JSX.Element => {
      if (!diagnosis) {
        return <div>invalid code</div>;
      }
      return (
        <div>{diagnosis.code} {diagnosis.name}</div>
      );
    };

    const details: Diagnoses | undefined = Object.values(diagnoses).find(d => d.code === code);
    return diagnosis(details);
  };





  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.entry.type) {
    case "Hospital":
      return HospitalEntryDetails(props.entry, getDiagnosis);
    case "OccupationalHealthcare":
      return OccupationalHealthcareEntryyDetails(props.entry, getDiagnosis);
    case "HealthCheck":
      return HealthCheckEntryEntryyDetails(props.entry, getDiagnosis);
    default: assertNever(props.entry);
  }

  return <div>something went wrong...</div>;
};

export default EntryDetails;



const style = {
  borderStyle: 'solid',
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
};


const HospitalEntryDetails = (props: HospitalEntry, getDiagnosis: (code: string) => JSX.Element) => (
  <div style={style}>
    {props.date}<br />
    {props.diagnosisCodes
      ? <ul>{props.diagnosisCodes?.map(code => (<li key={code}>{getDiagnosis(code)}</li>))}</ul>
      : null
    }
    <i>{props.description}</i><br />
    diagnose by {props.specialist};
  </div>

);

const OccupationalHealthcareEntryyDetails = (props: OccupationalHealthcareEntry, getDiagnosis: (code: string) => JSX.Element) => (
  <div style={style}>
    {props.date} <WorkIcon /> {props.employerName}<br />
    {props.diagnosisCodes
      ? <ul>{props.diagnosisCodes?.map(code => (<li key={code}>{getDiagnosis(code)}</li>))}</ul>
      : null
    }
    <i>{props.description}</i><br />
    diagnose by {props.specialist};
  </div>

);

const HealthCheckEntryEntryyDetails = (props: HealthCheckEntry, getDiagnosis: (code: string) => JSX.Element) => (
  <div style={style}>
    {props.date} <MonitorHeartSharpIcon /><br />
    {props.diagnosisCodes
      ? <ul>{props.diagnosisCodes?.map(code => (<li key={code}>{getDiagnosis(code)}</li>))}</ul>
      : null
    }
    <i>{props.description}</i><br />
    {props.healthCheckRating === HealthCheckRating.Healthy
      ? <FavoriteSharpIcon color="success" />
      : props.healthCheckRating === HealthCheckRating.LowRisk
        ? <FavoriteSharpIcon color="warning" />
        : props.healthCheckRating === HealthCheckRating.HighRisk
          ? <FavoriteSharpIcon color="error" />
          : <FavoriteSharpIcon color="error" />

    }<br />
    diagnose by {props.specialist};
  </div>

);