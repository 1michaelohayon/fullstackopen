import { useState, useEffect } from "react";
import axios from 'axios'
import SearchForm from "./componenets/searchForm";
import CountriesComp from "./componenets/CountriesComp";

const App = (props) => {
  //States & Effects=============================
  const [countries, setCountries] = useState([]);
  const [searchFilter, setFilter] = useState('');


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all').then(r => {
        setCountries(r.data);
      });
  }, []);


  //Functions==============================
  const lowerCaseFilter = (ctrs) => ctrs.filter(c => c.name.common.toLowerCase().includes(searchFilter.toLowerCase()));


  let searchLogic = searchFilter === ""
    ? []
    : lowerCaseFilter(countries)


  function filterContent(event) {
    setFilter(event.target.value)
  }
  //Return===============================    

  return (
    <>
      <SearchForm val={searchFilter} onChng={filterContent} />
      <CountriesComp data={searchLogic} />
    </>
  )

}

export default App;
