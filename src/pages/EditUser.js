import { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AuthService from "../services/AuthenticationService";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import TitleText from "../components/TitleText";
import FormInputText from "../components/FormInputText";
import FormInputField from "../components/FormInputField";
import { useForm } from 'react-hook-form';
import AuthService from "../services/AuthenticationService";


function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function EditUser() {
  const user1 = AuthService.getCurrentUser();
  const [open, setOpen] = useState(0);
  // const [userDetails, setUserDetails] = useState("");

  console.log("test",user1)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [state, setState] = useState({
    firstName: "",
    // otherNames: "",
    lastName: "",
    // email: "",
    // password: "",
    // nicNo: "",
    // joinDate: "",
    userStatus: "",
    primaryContactNo: "",
    secondaryContactNo: "",
    // gender: "",
    // dateOfBirth: "",

    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",

    accountNo: "",
    bankName: "",
    bankBranch: "",
    bankAccountType: "",

    designationName: "",
    designationLevel: "",


    departmentname: "",
    agency: "",

    // rolesname: "",

    // privilegesname: "",
    // roles: ""







  });



  const { register, handleSubmit, formState: { errors }, } = useForm({});



  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const finalSubmit = (userId) => {
    let submitValues = {
      firstName: state.firstName,
      // otherNames: state.otherNames,
      lastName: state.lastName,
      // email: state.email,
      // password: state.password,
      // nicNo: state.nicNo,
      // joinDate: state.joinDate,
      primaryContactNo: state.primaryContactNo,
      secondaryContactNo: state.secondaryContactNo,
      // gender: state.gender,
      // dateOfBirth: state.dateOfBirth,
      userStatus: state.userStatus,

      address: {
        addressLine1: state.addressLine1,
        addressLine2: state.addressLine2,
        city: state.city,
        province: state.province,
      },

      bankDetails: {
        accountNo: state.accountNo,
        bankName: state.bankName,
        bankBranch: state.bankBranch,
        bankAccountType: state. bankAccountType,
      },

      department: {
        name: state.departmentname,
        agency: state.agency,
      },

      // roles: {
      //   name:state.rolesname,
      //   privileges: [
      //     {
      //       name: state.privilegesname,
      //       roles: [state.roles],
      //     }
      //   ]
      // },

      designation: {
        designationName: state.designationName,
        designationLevel: state.designationLevel,
      },

    };
    console.log(state);
    axios({
      method: "put",
      url: "http://localhost:8080/users/"+ user1?.user?.userId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ` + user1.jwt,
      },
      data: submitValues,

      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      // console.log("final " + state);
      setState(res.data.body);
    });


  };





  return (
    <div className=" bg-grey h-fit w-full ">
      <TitleText titleText="Edit User" />
      <div className=" absolute mt-4 h-[82%] w-[82%] bg-white rounded-lg border-2 border-gray-200 shadow-md">

        <form  className="p-6" onSubmit={handleSubmit(finalSubmit)}>
          <Fragment>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                Basic Information
              </AccordionHeader>
              <AccordionBody>
                {/* <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button> */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="First Name" />
                    <FormInputField
                      value={state.firstName}
                      inputHandle={inputHandle}
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      {...register("firstName", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.firstName?.message}</p> */}
                  </div>
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Last Name" />
                    <FormInputField
                      value={state.lastName}
                      inputHandle={inputHandle}
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      {...register("lastName", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.lastName?.message}</p> */}
                  </div>
                    {/* <p className="text-red-400 text-xs"> {errors.otherNames?.message}</p> */}
                  {/* </div> */}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="User Status" />
                    <FormInputField
                      value={state.userStatus}
                      inputHandle={inputHandle}
                      type="text"
                      name="userStatus"
                      id="userStatus"
                      placeholder="userStatus"
                      {...register("userStatus", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.lastName?.message}</p> */}
                  </div>
                  {/* <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Email" />
                    <FormInputField
                      value={state.email}
                      inputHandle={inputHandle}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      {...register("email", { required: "This is required" })}
                    /> */}
                    {/* <p className="text-red-400 text-xs"> {errors.email?.message}</p> */}
                  {/* </div> */}
                </div>
                {/* <div className="grid grid-cols-2 gap-4"> */}
                  {/* <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Password" />
                    <FormInputField
                      value={state.password}
                      inputHandle={inputHandle}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      {...register("password", { required: "This is required" })}
                    /> */}
                    {/* <p className="text-red-400 text-xs"> {errors.password?.message}</p> */}
                  {/* </div> */}
                  {/* <div className="flex flex-col mb-2">
                    <FormInputText formInputText="NIC" />
                    <FormInputField
                      value={state.nicNo}
                      inputHandle={inputHandle}
                      type="text"
                      name="nicNo"
                      id="nicNo"
                      placeholder="NIC"
                      {...register("nicNo", { required: "This is required" })}
                    /> */}
                    {/* <p className="text-red-400 text-xs"> {errors.nicNo?.message}</p> */}
                  {/* </div> */}
                {/* </div> */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Primary Contact" />
                    <FormInputField
                      value={state.primaryContactNo}
                      inputHandle={inputHandle}
                      type="text"
                      name="primaryContactNo"
                      id="primaryContactNo"
                      placeholder="Primary Contact"
                      {...register("primaryContactNo", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.primaryContactNo?.message}</p> */}
                  </div>
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Secoundary Contact" />
                    <FormInputField
                      value={state.secondaryContactNo}
                      inputHandle={inputHandle}
                      type="text"
                      name="secondaryContactNo"
                      id="secondaryContactNo"
                      placeholder="Secoundary Contact"
                      {...register("secondaryContactNo", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.secondaryContactNo?.message}</p> */}
                  </div>
                </div>
                {/* <div class="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Join Date" />
                    <FormInputField
                      value={state.joinDate}
                      inputHandle={inputHandle}
                      type="date"
                      name="joinDate"
                      id="joinDate"
                      placeholder="Join Date"
                      {...register("joinDate", { required: "This is required" })}
                    /> */}
                    {/* <p className="text-red-400 text-xs"> {errors.joinDate?.message}</p> */}
                  {/* </div>
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Gender" />
                    <FormInputField
                      value={state.gender}
                      inputHandle={inputHandle}
                      type="text"
                      name="gender"
                      id="gender"
                      placeholder="gender"
                      {...register("gender", { required: "This is required" })}
                    /> */}
                    {/* <p className="text-red-400 text-xs"> {errors.gender?.message}</p> */}
                    {/* <Select options={options} onChange={inputHandle}  classNamePrefix="select"    name='gender' value={state.gender} class='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'/> */}
                  {/* </div>
                </div> */}
                {/* <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Date Of Birth" />
                  <FormInputField
                    value={state.dateOfBirth}
                    inputHandle={inputHandle}
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="dateOfBirth"
                    {...register("dateOfBirth", { required: "This is required" })}
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.dateOfBirth?.message}</p> */}
                {/* </div> */}
                {/* <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                SAVE
              </button> */}
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(2)}>
                Address
              </AccordionHeader>
              <AccordionBody>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Address Line1" />
                    <FormInputField
                      value={state.addressLine1}
                      inputHandle={inputHandle}
                      type="text"
                      name="addressLine1"
                      id="addressLine1"
                      placeholder="Address Line1"
                      {...register("addressLine1", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.addressLine1?.message}</p> */}
                  </div>
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Address Line2" />
                    <FormInputField
                      value={state.addressLine2}
                      inputHandle={inputHandle}
                      type="text"
                      name="addressLine2"
                      id="addressLine2"
                      placeholder="Address Line2"
                      {...register("addressLine2", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.addressLine2?.message}</p> */}
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="City" />
                  <FormInputField
                    value={state.city}
                    inputHandle={inputHandle}
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    {...register("city", { required: "This is required" })}
                  />
                  {/* <p className="text-red-400 text-xs"> {errors.city?.message}</p> */}
                </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Province" />
                  <FormInputField
                    value={state.province}
                    inputHandle={inputHandle}
                    type="text"
                    name="province"
                    id="province"
                    placeholder="Province"
                    {...register("province", { required: "This is required" })}
                  />
                  {/* <p className="text-red-400 text-xs"> {errors.province?.message}</p> */}
                </div>
                {/* <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                SAVE
              </button> */}
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(3)}>
                Bank Details
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Account Number" />
                  <FormInputField
                    value={state.accountNo}
                    inputHandle={inputHandle}
                    type="text"
                    name="accountNo"
                    id="accountNo"
                    placeholder="Account Number"
                    {...register("accountNo", { required: "This is required" })}
                  />
                  {/* <p className="text-red-400 text-xs"> {errors.accountNo?.message}</p> */}
                </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Bank Name" />
                  <FormInputField
                    value={state.bankName}
                    inputHandle={inputHandle}
                    type="text"
                    name="bankName"
                    id="bankName"
                    placeholder="Bank Name"
                    {...register("bankName", { required: "This is required" })}
                  />
                  {/* <p className="text-red-400 text-xs"> {errors.bankName?.message}</p> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Bank Branch" />
                    <FormInputField
                      value={state.bankBranch}
                      inputHandle={inputHandle}
                      type="text"
                      name="bankBranch"
                      id="bankBranch"
                      placeholder="Bank Branch"
                      {...register("bankBranch", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.bankBranch?.message}</p> */}
                  </div>
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Account Type" />
                    <FormInputField
                      value={state.bankAccountType}
                      inputHandle={inputHandle}
                      type="text"
                      name="bankAccountType"
                      id="bankAccountType"
                      placeholder="Account Type"
                      {...register("bankAccountType", { required: "This is required" })}
                    />


                    {/* <p className="text-red-400 text-xs"> {errors.accountType?.message}</p> */}
                  </div>
                </div>
                {/* <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                SAVE
              </button> */}
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(4)}>
                Designation
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Designation Name" />
                  <FormInputField
                    value={state.designationName}
                    inputHandle={inputHandle}
                    type="text"
                    name="designationName"
                    id="designationName"
                    placeholder="Designation Name"
                    {...register("designationName", { required: "This is required" })}
                  />
                  {/* <p className="text-red-400 text-xs"> {errors.designationName?.message}</p> */}
                </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Designation Level" />
                  <FormInputField
                    value={state.designationLevel}
                    inputHandle={inputHandle}
                    type="text"
                    name="designationLevel"
                    id="designationLevel"
                    placeholder="Designation Level"
                    {...register("designationLevel", { required: "This is required" })}
                  />
                  {/* <p className="text-red-400 text-xs"> {errors.designationLevel?.message}</p> */}
                </div>

                {/* <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg" >
                SAVE
              </button> */}
          
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(5)}>
                Department
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Department name" />
                  <FormInputField
                    value={state.departmentname}
                    inputHandle={inputHandle}
                    type="text"
                    name="departmentname"
                    id="departmentname"
                    placeholder="departmentname"
                    {...register("departmentname", { required: "This is required" })}
                  />
                  {/* <p className="text-red-400 text-xs"> {errors.employmentStatus?.message}</p> */}
                </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Agency" />
                  <FormInputField
                    value={state.agency}
                    inputHandle={inputHandle}
                    type="text"
                    name="agency"
                    id="agency"
                    placeholder="agency"
                    {...register("agency", { required: "This is required" })}
                  />
                  {/* <p className="text-red-400 text-xs"> {errors.start?.message}</p> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Duration" />
                    <FormInputField
                      value={state.duration}
                      inputHandle={inputHandle}
                      type="text"
                      name="duration"
                      id="duration"
                      placeholder="duration"
                      {...register("duration", { required: "This is required" })}
                    /> */}
                    {/* <p className="text-red-400 text-xs">{errors.duration?.message}</p> */}
                  {/* </div> */}
                </div>
                {/* <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                SAVE
              </button> */}
                  <button
                  onClick={finalSubmit}
                  className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"


                >
                  Submit
                </button>
              </AccordionBody>
            </Accordion>
            {/* <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(6)}>
                Roles
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Roles name" />
                  <FormInputField
                    value={state.rolesname}
                    inputHandle={inputHandle}
                    type="text"
                    name="rolesname"
                    id="rolesname"
                    placeholder="rolesname"
                    {...register("rolesname", { required: "This is required" })}
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.value?.message}</p> */}
                {/* </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Privilages name" />
                  <FormInputField
                    value={state.privilegesname}
                    inputHandle={inputHandle}
                    type="text"
                    name="privilegesname"
                    id="privilegesname"
                    placeholder="privilegesname"
                    {...register("privilegesname", { required: "This is required" })}
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.type?.message}</p> */}
                {/* </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Roles" />
                  <FormInputField
                    value={state.roles}
                    inputHandle={inputHandle}
                    type="text"
                    name="roles"
                    id="roles"
                    placeholder="roles"
                    {...register("roles", { required: "This is required" })}
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.type?.message}</p> */}
                {/* </div> */}
                {/* <button
                  onClick={finalSubmit}
                  className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"


                >
                  Submit
                </button>
              </AccordionBody> */}
            {/* </Accordion> */}

          </Fragment>
        </form>
      </div>
    </div>
  );
}
