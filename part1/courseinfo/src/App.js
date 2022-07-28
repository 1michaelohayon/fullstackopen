
const App = () => {
  const course = {
    name: "Half Stack application development",
 parts: [{
  name: "Fundamentals of React",
  exercises: 10
},
{
  name: "Using props to pass data",
  exercises: 7
},

{
  name: "State of a compo nent",
  exercises: 14
}]
  }

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

const Header = (props) => {
  
  return(
    <div>
      <h1>
        {props.course}
        </h1>
    </div>

  )

}
const Content = (props) => {


  return(
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>



    </div>
  )
}
const Part = (props) => {
  return(
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  )
}
const Total =(props) => {
  let sum = 0;
  props.parts.forEach(element => {
    sum += element.exercises;
  });

  return(
    <div>
      <p>
        Nunber of exercises {sum}
      </p>
    </div>
  )

}
export default App