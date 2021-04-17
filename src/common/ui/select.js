import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'ajax-bootstrap-select/dist/css/ajax-bootstrap-select.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-select/dist/js/bootstrap-select.min.js';
import React, { useState } from 'react';
//import jquery from 'jquery/dist/jquery.min.js'
//window.$ = window.jQuery = jquery;
//require ('ajax-bootstrap-select/dist/js/ajax-bootstrap-select.js');




function Select(props){
    const {id, ...rest} = props;
    const {onChange, setOnChange} = useState(false);
    return(
        <select {...rest} className="selectpicker">
            {props.children}
        </select>
    );
}

function Option(props){
    const {id, ...rest} = props;
    return(
        <option {...rest}>{props.children}</option>
    );
}

export {Select, Option}