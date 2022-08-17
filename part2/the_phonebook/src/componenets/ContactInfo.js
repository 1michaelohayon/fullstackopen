import React from "react";
const ContactInfo = ({obj, click}) => <li>{obj.name} {obj.number} <button onClick={click}>delete</button> </li>



export default ContactInfo