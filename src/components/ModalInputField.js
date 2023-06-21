import React from "react";

export default function ModalInputField ({id,name,value,type,inputHandle,placeholder}) {

    return (
      
        <div className="flex flex-col items-start">
        <input className="block w-full  border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        > {value={value}}</input>
    </div>

    );
}