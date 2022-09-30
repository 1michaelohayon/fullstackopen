import express from "express";
import { getPatientsNoSSN, addPatient } from "../services/paitentsService";
import toNewPatientEntry from "../utils";

const router = express.Router();


router.get('/', (_req, res) =>  {
  res.send(getPatientsNoSSN());
});

router.post('/', (_req, res) =>  {
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(_req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addedEntry = addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMesage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMesage += ' Error ' + error.message;
    }
    res.status(400).send(errorMesage);
  }
});



export default router;