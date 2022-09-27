interface ExerciseValues {
  targetValue: number;
  exercisesValue: Array<number>;
}

const parseExercisArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguements');

  args.shift();
  args.shift();

  const argsToNumbers = args.map(e => Number(e));
  const allNumbers = !(argsToNumbers.some(e => isNaN(e)));

  if (allNumbers) {
    const target = argsToNumbers.shift();
    return {
      targetValue: Number(target),
      exercisesValue: argsToNumbers,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};




type ratingScores = 1 | 2 | 3;
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: ratingScores;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercises: Array<number>, target: number): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(e => e > 0).length;
  const average = exercises.reduce((previous, current) => previous + current, 0) / periodLength;
  const success = average >= target;

  const rating = success
    ? 3
    : average / target > 3 / 4
      ? 2
      : 1;

  const ratingDescription = rating === 3
    ? "success! you've reached the maximum score"
    : rating === 2
      ? "not too bad but could be better"
      : "failed! try harder next time";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { targetValue, exercisesValue } = parseExercisArgs(process.argv);
  console.log(calculateExercises(exercisesValue, targetValue));
} catch (error: unknown) {
  let errorMessage = 'Something bad happend.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;