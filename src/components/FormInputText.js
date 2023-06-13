import React from "react";

export default function FormInputText (props) {

    return (
        <div className="text-base  tracking-wide py-1"> 
            <label> {props.formInputText} </label>
        </div>

    );
}