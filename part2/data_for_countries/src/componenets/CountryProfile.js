import React from "react";
import Weather from "./Weather";


const Lang = ({ obj }) => <li>{obj}</li>
const CountryProfile = ({ obj }) =>  (
    <div>
        <h1>{obj.name.common}</h1>
        <div>capital {obj.capital[0]}</div>
        <div>area {obj.area}</div>
        <h4>languages:</h4>
        <ul>
            {Object.values(obj.languages).map(l =>
                <Lang key={l} obj={l} />
            )}

        </ul>
        <img src={obj.flags.png} />
        <h1>Weather in {obj.capital[0]} {console.log(obj)}</h1>
        <Weather object={obj}/>
        
        
    </div>
)

export default CountryProfile