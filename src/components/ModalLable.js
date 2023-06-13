import React from "react";

export default function ModalLable (props) {

    return (
        <div> 
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">
                                {props.modalLable}
            </label>
        </div>

    );
}