import express from 'express';
const app = express();
app.use(express.json());
import diagnosesRouter from './routes/diagnosesRouter';
import paitentsRouter from './routes/paitentsRouter';
app.use(express.static('build'));

const baseURL = (dir:string):string => `/api/${dir}`;

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients',paitentsRouter);

const PORT = 3001;

app.get(baseURL('ping'), (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});  



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});