import React from "react";
import TitleText from "../components/TitleText";
import CommonSpinners from "../common/Spinners";

export default function HomePage() {

    return (
        <div className="bg-grey h-fit w-full">
            <TitleText titleText="Dashboard" />
        
{CommonSpinners.pageSpinner("Fetching Details")}



        </div>
    );
}
