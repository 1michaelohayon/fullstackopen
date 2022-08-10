import React from "react"

const Content = ({ content }) => <p>{content.name} {content.exercises}</p>
const Total = ({ sum }) => <b>total of {sum} exercises</b>
const Header = ({ text }) => <h3>{text}</h3>

const Course = ({course}) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
  <div>
    <Header text={course.name} />
    {course.parts.map(part =>
      <Content key={part.id} content={part} />)}
    <Total sum={total} />
  </div>
  )
}

export default Course