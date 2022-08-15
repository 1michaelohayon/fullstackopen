import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ object }) => {
    //States & Effects
    const [current, setCurrent] = useState([])


    const api_key = process.env.REACT_APP_API_KEY
    const target = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    useEffect(() => {
        axios
            .get(target(object.capitalInfo.latlng[0], object.capitalInfo.latlng[1])).then(r => {
                console.log('promised fulfilled');

                setCurrent([r.data]);
            });
    }, []);
    console.log('render', current.length, 'weater')

    //func========================
    const tempVerify = () => current.length !== 0

    console.log(tempVerify())

    console.log(current)
    //Return=========
    return (
        <>
            <WeatherComp weatherData db={tempVerify() ? current : false} />
        </>

    )
}

const WeatherComp = (db) => {
    if (db === false) {
        return (
            <div>
                <p>Error no data</p>
            </div>
        )
    } else {
        try {
            const navigatedDB = db.db[0];
            const iconURL = `https://openweathermap.org/img/wn/${navigatedDB.weather[0].icon}@2x.png`
            return (
                <div>
                    <p>temparture {navigatedDB.main.temp} Celcius</p>
                    <img src={iconURL}/>
                    <p>wind {navigatedDB.wind.speed} m/s</p>
                </div>
            )
        } catch (error) {
         //console.error(error)
        }
    }


}



export default Weather