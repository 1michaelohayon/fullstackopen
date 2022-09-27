interface BmiValues {
  heightInput: number;
  weightInput: number;
}
const parseArguements = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguements');
  if (args.length > 4) throw new Error('Too many arguements');


  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInput: Number(args[2]),
      weightInput: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};



const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const heightInMeters = heightInCm / 100;
  const heightInMetersSquare = heightInMeters * heightInMeters;
  const bmiScore = weightInKg / heightInMetersSquare;

  return bmiScore < 18.5
    ? "Underweight"
    : bmiScore < 24.9
      ? "Normal (healthy weight)"
      : bmiScore < 29.9
        ? "Overweight"
        : "Obese";
};


try {
  const { heightInput, weightInput } = parseArguements(process.argv);
  console.log(calculateBmi(heightInput, weightInput));
} catch (error: unknown) {
  let errorMessage = 'Something bad happend.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}


export default calculateBmi;