import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const Phonebook = [

  /*Structure is defined in the app's function. Structure example:
  {
   name: 
   number:
   id: for this app the id is the name.
  },*/
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523'},
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }

]
//Return=====================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App Phonebook={Phonebook} />
);


