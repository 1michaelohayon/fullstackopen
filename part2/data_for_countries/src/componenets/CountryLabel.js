import React from "react";
import { useState } from "react";
import CountryProfile from "./CountryProfile";


const CountryLabel = ({ obj }) => {
    //state
    const [show, setShow] = useState(false);
    //func
    const setToShow = () => setShow(!show)
    //return
    return (
        <>
            <CountryLabelComp obj={obj} show={show} setShow={setToShow} />
        </>
    )


}



const CountryLabelComp = ({ obj, show, setShow }) => show
    ? <li>
        <button onClick={setShow}>
            {show ? "hide" : "show"}
        </button>
        <CountryProfile obj={obj} />
    </li>
    : <li>
        {obj.name.common}
        <button onClick={setShow}>
            {show ? "hide" : "show"}
        </button>
    </li>


export default CountryLabel

