import { useState } from 'react'
const App = () => {
//states =================================
  const [good, setGood] = useState(0)
  const [natural, setNatural] = useState(0)
  const [bad, setBad] = useState(0)
//state setters ==========================================
  const setToGood = (value) => () => { setGood(value) }
  const setToNatural = (value) => () => { setNatural(value) }
  const setToBad = (value) => () => { setBad(value) }
//=====================================================
  return (
    <>
      <Header text={"give feedback"} />
      <Button handleClick={setToGood(good + 1)} text="good" />
      <Button handleClick={setToNatural(natural + 1)} text="natural" />
      <Button handleClick={setToBad(bad + 1)} text="bad" />
      <Header text={"statistics"} />
      <Statistics good={good} natural={natural} bad={bad} />

    </>
  )
}
//componenets ================================
const Header = ({ text }) => <h2>{text}</h2>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({ text, rating }) => <tr><td>{text}</td><td>{rating}</td></tr>

const Statistics = ({ good, natural, bad }) => {               
  const all = good + natural + bad
  const average = (good + -bad) / all
  const positive = (good / all) * 100
  if (all === 0) {
    return <div>No feedback given</div>
  } else {
    return (<table>
      <tbody>
        <StatisticLine text={"good"} rating={good} />
        <StatisticLine text={"natural"} rating={natural} />
        <StatisticLine text={"bad"} rating={bad} />
        <StatisticLine text={"all"} rating={all || 0} />
        <StatisticLine text={"average"} rating={average || 0} />
        <StatisticLine text={"positive"} rating={positive + " %" || 0} />
      </tbody>
    </table>)
  }
}
export default App