import React from "react";

export default function FormInputField ({id,name,value,type,inputHandle,placeholder}) {

    return (
        <div className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'> 
            <input value={value} onChange={inputHandle}  type={type} name={name} placeholder={placeholder} id={id} />
        </div>

    );
}