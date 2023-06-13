import React from "react";

export default function TitleText (props) {

    return (
        <div className="text-xl font-semibold tracking-wide py-2"> 
            <h1> {props.titleText} </h1>
        </div>

    );
}