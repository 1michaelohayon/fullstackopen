import express from "express";
import { getPatientsNoSSN, addPatient, getPatients, addEntry } from "../services/paitentsService";
import toNewPatient, {toNewEntry} from "../utils";

const router = express.Router();


router.get('/', (_req, res) =>  {
  res.send(getPatientsNoSSN());
});

router.get('/:id', (_req, res) => {
  const targetID = _req.params.id;
  const patient = getPatients().find(p => p.id === targetID);
  patient ?
    res.send(patient) 
    : res.status(404).end();
});


router.post('/:id/entries', (_req, res) => {
  try{
  const targetID = _req.params.id;
  const patient = getPatients().find(p => p.id === targetID);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
  const entry = toNewEntry(_req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const addedEntry = addEntry(entry, patient);
  console.log(addedEntry, addedEntry);
  res.json(addedEntry);
  } catch (error: unknown) {
    let errorMesage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMesage += ' Error ' + error.message;
    }
    res.status(400).send(errorMesage);
  }
});



router.post('/', (_req, res) =>  {
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(_req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMesage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMesage += ' Error ' + error.message;
    }
    res.status(400).send(errorMesage);
  }
});



export default router;