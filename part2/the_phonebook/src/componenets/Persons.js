import React from "react";
const ContactInfo = ({obj}) => <li>{obj.name} {obj.number}</li>

const Persons = ({ data }) => 
    <ul>
      {data.map(object =>
        <ContactInfo key={object.name} obj={object} />
      )}
    </ul>

export default Persons