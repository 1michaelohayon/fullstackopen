import express from "express";
import { getPatientsNoSSN } from "../services/paitentsService";

const router = express.Router();

router.get('/', (_req, res) =>  {
  res.send(getPatientsNoSSN());
});

router.post('/', (_req, res) =>  {
  res.send("diag info");
});



export default router;