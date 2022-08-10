import React from "react"

const PersonForm = ({ onSub, name, chngName, number, chngNumber }) =>
  <>
    <form onSubmit={onSub}>
      <div>
        name: <input value={name} onChange={chngName} required />
      </div>
      <div>number: <input type="tel" value={number} onChange={chngNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
  
  const SearchForm = ({ val, onChng }) => 
    <form>
      <div>
        filter shown with <input value={val} onChange={onChng} />
      </div>
    </form>


export {PersonForm, SearchForm}