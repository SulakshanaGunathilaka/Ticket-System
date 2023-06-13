import React from "react";
import TitleText from "../components/TitleText";
import CreateUserComponents from "./CreateUserComponents";
import { Link } from "react-router-dom";

// export default function CreateUserPage() {



	const CreateEmployeeBreadCrumb = ({ crumbs }) => {
		// Don't render a single breadcrumb.
		if (crumbs.length <= 1) {
			return null;
		}

		return (
			//         <div class="bg-white p-4 flex items-center flex-wrap">
			//   <ul class="flex items-center">


			// 	<li class="inline-flex items-center">
			// 	  <a href="#" class="text-gray-600 hover:text-blue-500">
			// 		Basics
			// 	  </a>

			// 	  <svg class="w-5 h-auto fill-current mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
			// 	</li>

			// 	<li class="inline-flex items-center">
			// 	  <a href="#" class="text-gray-600 hover:text-blue-500">
			// 		Address
			// 	  </a>

			// 	  <svg class="w-5 h-auto fill-current mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
			// 	</li>

			// 	<li class="inline-flex items-center">
			// 	  <a href="#" class="text-gray-600 hover:text-blue-500 text-blue-500">
			// 		Bank Account
			// 	  </a>
			// 	</li>
			//   </ul>
			// </div>
			<div className="mb-4 bg-gray-300">
				{/* Link back to any previous steps of the breadcrumb. */}
				{crumbs.map(({ name, path }, key) =>
					key + 1 === crumbs.length ? (
						<span key={key} className="bold">
							{name}
						</span>
					) : (
						<Link key={key} className="underline text-blue-500 mr-4" to={path}>
							{name}
						</Link>
					)
				)}
			</div>

		);

	}
	export default CreateEmployeeBreadCrumb;


