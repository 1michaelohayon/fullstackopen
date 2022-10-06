import { CoursePart } from "../types"

interface TotalProps {
  courseParts: Array<CoursePart>,
}

const Total = (props: TotalProps) => 
  <div>
  Number of exercises {props.courseParts.reduce((carry, part) => 
    carry + part.exerciseCount, 0)}
  </div>

export default Total