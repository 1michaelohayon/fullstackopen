import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart
}

const Part = (props: PartProps): JSX.Element => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const skill = (skill: string) => `${skill}`

  switch (props.coursePart.type) {
    case "normal":
      return <p>
        <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
        <i>{props.coursePart.description}</i><br/>
      </p>;
    case "groupProject":
      return <p>
        <b>{props.coursePart.name} {props.coursePart.groupProjectCount}</b><br/>
        {props.coursePart.exerciseCount}<br/>
        </p>;
    case "submission":
      return <p>
        <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
        <i>{props.coursePart.description}</i><br/>
       submit to {props.coursePart.exerciseSubmissionLink}
      </p>
    case "special": {

      return <p>
        <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
        <i>{props.coursePart.description}</i><br/>
        required skills: {props.coursePart.requirements.map(s => skill(s)).join(', ')}
        </p>
    }
    default: 
      return assertNever(props.coursePart)
  }
}

export default Part

