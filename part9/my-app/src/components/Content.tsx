import { CoursePart } from "../types"
import Part from "./Part"
interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {

  return <div>
  {props.courseParts.map(course => <Part key={course.name} coursePart={course}/>)}
  </div>
}

export default Content