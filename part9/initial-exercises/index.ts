import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (weight && weight) {
    res.send({ height: height, weight: weight, bmi: calculateBmi(height, weight) });
  } else {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post('/calculator', (_req, res) => {


  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = _req.body;

  if (!daily_exercises || ! target ){
    return res.status(400).send({ error: "parameters missing" });
  }

  if (Array.isArray(daily_exercises)) {

    const toNumbers = daily_exercises.map(e => Number(e));
    const allNumbers = !(toNumbers.some(e => isNaN(e)));

    if (allNumbers && !isNaN(Number(target))) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = (calculateExercises(daily_exercises, target));
     return res.send(result);
    } 
  } 
  return res.status(400).send({ error: "malformatted parameters" });
});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});