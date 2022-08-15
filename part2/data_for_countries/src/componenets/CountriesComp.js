import React from "react";
import CountryLabel from "./CountryLabel";
import CountryProfile from "./CountryProfile"
//FUNCTIONS============

     



const Countries = ({ data }) =>{
//states 



//funcs=======================================


//return==================================================
return (
    <>
    <CountriesComp data={data} />
    </>
)
}
//COMPONENETS=============================================================


const CountriesComp = ({ data }) => {
    if (data.length == 1) {
        return (
            <>
                <CountryProfile obj={data[0]}  />
            </>
        )

    } else if (data.length > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    }

    return (
        <ul>
            {data.map(object =>
                <CountryLabel key={object.name.common} obj={object}/>
            )}
        </ul>
    )
}

export default Countries

