import React from "react";

export default function ButtonDesign (type,onclick) {

    return (
        <div>
        <button type={type} onClick={onclick} className="w-full text-grey-700 bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "  >
        </button>
        </div>

    );
}