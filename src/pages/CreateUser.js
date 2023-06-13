import React from "react";
import TitleText from "../components/TitleText";
import CreateUser from "./CreateUser";
import CreateUserComponents from "./CreateUserComponents";

export default function CreateUserPage() {



  function CreateEmployeeBreadCrumb (){
    return(
        <div className="bg-white p-4 flex items-center flex-wrap">
  <ul className="flex items-center">


	<li className="inline-flex items-center">
	  <a href="#" className="text-gray-600 hover:text-blue-500">
		Basics
	  </a>

	  <svg class="w-5 h-auto fill-current mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
	</li>

	<li className="inline-flex items-center">
	  <a href="#" class="text-gray-600 hover:text-blue-500">
		Address
	  </a>

	  <svg class="w-5 h-auto fill-current mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
	</li>

	<li className="inline-flex items-center">
	  <a href="#" className="text-gray-600 hover:text-blue-500 text-blue-500">
		Bank Account
	  </a>
	</li>
  </ul>
</div>

    );
    
  }

    return (
        <div className="bg-grey h-fit w-full">
            <TitleText titleText="Create User" />

            <div className=" absolute mt-4 h-[82%] w-[82%] bg-white rounded-lg border border-gray-200 shadow-md">
            <CreateEmployeeBreadCrumb/>
            
           

</div>
{/* <div>
	<CreateUser />
	
</div> */}
        

        </div>
    );
}