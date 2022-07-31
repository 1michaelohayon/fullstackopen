import { useState } from "react"


function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  //states===========================================
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 })
  const [max, setMax] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  //functions=====================================================
  const setRandom = () => () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length)
    while (randomNum === selected) {
      // prevents showing the same anecdotes 
      randomNum = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randomNum)
  }
  const voteSetter = () => () => {
    const copy = { ...vote }
    copy[selected] += 1;
    setVote(copy)

    // =====sets highest vote============
    let high = 0;
    let index = 0;
    Object.keys(vote).forEach(key => {
      if (copy[key] > high) {
        high = copy[key]
        index = key
      }
    })
    setMax(high)
    setMaxIndex(index)

  }
  //============================================================
  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <div>{anecdotes[selected]}</div>
      <Votes value={vote[selected]} />
      <Button text={"vote"} handleClick={voteSetter()} />
      <Button text={"next anecdote"} handleClick={setRandom()} />
      <Header text={"Anecdote with the most votes"} />
      <div>{anecdotes[maxIndex]}</div>
      <Votes value={max} />
    </div>
  )
}
//componenets====================================
const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>
const Votes = ({ value }) => (value === 1) ? <div>has {value} vote</div> : <div>has {value} votes</div>
const Header = ({ text }) => <h2>{text}</h2>


export default App;
