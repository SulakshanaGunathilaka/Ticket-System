import axios from "axios";
// import { Select } from 'flowbite-react';
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInputField from "../components/FormInputField";
import FormInputText from "../components/FormInputText";
import TitleText from "../components/TitleText";
import Select from "react-select";
import { useForm } from 'react-hook-form';
import AuthService from "../services/AuthenticationService";
import CommonToasts from "../common/Toasts";
import urls from "../common/Urls";
import { useNavigate } from 'react-router-dom';

function CreateUser2() {
  const user1 = AuthService.getCurrentUser();
  const formArray = [1, 2];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [state, setState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    otherNames: "",
    password: "",
    primaryContactNo: "",
    secondaryContactNo: "",
    dateOfBirth: "",
    gender: "",
    nicNumber: "",
    joinDate: "",

    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",

    // accountNo: "",
    // bankName: "",
    // bankBranch: "",
    // bankAccountType: "",

    // designationName: "",
    // designationLevel: "",

  });
  // const user1 = AuthService.getCurrentUser();

  const { register, handleSubmit, formState: { errors }, } = useForm({});

  const navigate = useNavigate();

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const next = () => {
    if (
      formNo === 1 &&
      state.firstName &&
      state.otherNames &&
      state.lastName &&
      state.email &&
      state.password &&
      state.nicNumber &&
      state.joinDate &&
      state.primaryContactNo &&
      state.secondaryContactNo &&
      state.gender &&
      state.dateOfBirth
    ) {
      setFormNo(formNo + 1);
    } else if (
      formNo === 2 &&
      state.addressLine1 &&
      state.addressLine2 &&
      state.city &&
      state.province
    ) {
      setFormNo(formNo + 1);
    } 
    // else if (
    //   formNo === 3 &&
    //   state.accountNo &&
    //   state.bankName &&
    //   state.bankBranch &&
    //   state.bankAccountType
    // ) {
    //   setFormNo(formNo + 1);
    // }
    //  else if (
    //   formNo === 4 &&
    //   state.designationName &&
    //   state.designationLevel
    // ) 
    // {
    //   setFormNo(formNo + 1);
    // } 
    else {
      toast.error("Please fillup all input field");
    }
  };
  const pre = () => {
    setFormNo(formNo - 1);
  };
  const finalSubmit = () => {
    let submitValues = {
      firstName: state.firstName,
      otherNames: state.otherNames,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      nicNumber: state.nicNumber,
      joinDate: state.joinDate,
      primaryContactNo: state.primaryContactNo,
      secondaryContactNo: state.secondaryContactNo,
      gender: state.gender,
      dateOfBirth: state.dateOfBirth,

      address: {
        addressLine1: state.addressLine1,
        addressLine2: state.addressLine2,
        city: state.city,
        province: state.province,
      },

      // bankDetails: {
      //   accountNo: state.accountNo,
      //   bankName: state.bankName,
      //   bankBranch: state.bankBranch,
      //   accountType: state.bankAccountType,
      // },

      // designation: {
      //   designationName: state.designationName,
      //   designationLevel: state.designationLevel,
      // },

    };
    console.log(state);
    axios({

      method: "post",
      url: urls.CREATE_USER,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Authorization": `Bearer ` + user1.jwt,
      },
      data: submitValues,

      mode: "cors",
    }).then((res) => {
      console.log("response", res);

      if (res.status == 200) {
        CommonToasts.basicToast("User Created Successfully");
        navigate("/employees")
      }else {
        CommonToasts.errorToast("Error while creating user");
      }

      // console.log("final " + state);
      setState(res.data.body);
    });

    if (
      state.addressLine1 &&
      state.addressLine2 &&
      state.city &&
      state.province

    ) {
      // toast.success("Form submit success");
    } else {
      toast.error("Please fillup all input field");
    }
  };

  return (
    <div className=" bg-grey h-fit w-full ">
      <TitleText titleText="Create User" />
      {/* <div className=" absolute mt-4 h-[82%] w-[82%] bg-white rounded-lg border border-gray-200 shadow-md">
      <CreateEmployeeBreadC/>
            
           

</div> */}

      <div className=" absolute mt-4 h-[82%] w-[82%] bg-white rounded-lg border border-gray-200 shadow-md">
        <ToastContainer />
        {/* <div className="card w-[370px] rounded-md shadow-md bg-white p-5"> */}
        <div className="flex justify-center items-center">
          {formArray.map((v, i) => (
            <>
              <div
                className={`w-[35px] my-3 text-white rounded-full ${formNo - 1 === i ||
                    // formNo - 1 === i + 1 ||
                    // formNo - 1 === i + 2 ||
                    formNo === formArray.length
                    ? "bg-sky-400"
                    : "bg-sky-200"
                  } h-[35px] flex justify-center items-center`}
              >
                {v}
              </div>
              {i !== formArray.length - 1 && (
                <div
                  className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === formArray.length
                      ? "bg-sky-500"
                      : "bg-sky-400"
                    }`}
                ></div>
              )}
            </>
          ))}
        </div>
        <form onSubmit={handleSubmit(finalSubmit)}>
          {formNo === 1 && (

            <div>
              <div className="block p-6  bg-white w-full h-fit">
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
                    <FormInputText formInputText="Other Names" />
                    <FormInputField
                      value={state.otherNames}
                      inputHandle={inputHandle}
                      type="text"
                      name="otherNames"
                      id="otherNames"
                      placeholder="Other Names"
                      {...register("otherNames", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.otherNames?.message}</p> */}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Email" />
                    <FormInputField
                      value={state.email}
                      inputHandle={inputHandle}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      {...register("email", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.email?.message}</p> */}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Password" />
                    <FormInputField
                      value={state.password}
                      inputHandle={inputHandle}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      {...register("password", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.password?.message}</p> */}
                  </div>
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="NIC" />
                    <FormInputField
                      value={state.nicNumber}
                      inputHandle={inputHandle}
                      type="text"
                      name="nicNumber"
                      id="nicNumber"
                      placeholder="NIC"
                      {...register("nicNumber", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.nicNo?.message}</p> */}
                  </div>
                </div>
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
                    <FormInputText formInputText="Secondary Contact" />
                    <FormInputField
                      value={state.secondaryContactNo}
                      inputHandle={inputHandle}
                      type="text"
                      name="secondaryContactNo"
                      id="secondaryContactNo"
                      placeholder="Secondary Contact"
                      {...register("secondaryContactNo", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.secondaryContactNo?.message}</p> */}
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Joined Date" />
                    <FormInputField
                      value={state.joinDate}
                      inputHandle={inputHandle}
                      type="date"
                      name="joinDate"
                      id="joinDate"
                      placeholder="Joined Date"
                      {...register("joinDate", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.joinDate?.message}</p> */}
                  </div>
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Gender" />
                    <FormInputField
                      value={state.gender}
                      inputHandle={inputHandle}
                      type="text"
                      name="gender"
                      id="gender"
                      placeholder="Gender"
                      {...register("gender", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.gender?.message}</p> */}
                    {/* <Select options={options} onChange={inputHandle}  classNamePrefix="select"    name='gender' value={state.gender} class='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'/> */}
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Date Of Birth" />
                  <FormInputField
                    value={state.dateOfBirth}
                    inputHandle={inputHandle}
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="dateOfBirth"
                    {...register("dateOfBirth", { required: "This is required" })}
                  />
                  {/* <p className="text-red-400 text-xs"> {errors.dateOfBirth?.message}</p> */}
                </div>

                <div className="mt-4 flex justify-center items-center">
                  <button
                    onClick={next}
                    className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"

                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

          )}

          {formNo === 2 && (

            <div>
              <div className="block p-6  bg-white w-full h-full ">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Address Line 1" />
                    <FormInputField
                      value={state.addressLine1}
                      inputHandle={inputHandle}
                      type="text"
                      name="addressLine1"
                      id="addressLine1"
                      placeholder="Address Line 1"
                      {...register("addressLine1", { required: "This is required" })}
                    />
                    {/* <p className="text-red-400 text-xs"> {errors.addressLine1?.message}</p> */}
                  </div>
                  <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Address Line 2" />
                    <FormInputField
                      value={state.addressLine2}
                      inputHandle={inputHandle}
                      type="text"
                      name="addressLine2"
                      id="addressLine2"
                      placeholder="Address Line 2"
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
                <div className="mt-4 gap-3 flex justify-center items-center">
                  <button
                    onClick={pre}
                    className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"
                  >
                    Previous
                  </button>
                  <button
                    onClick={finalSubmit}
                    className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"
                    type="submit"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

          )}
          {/* {formNo === 3 && (

            <div>
              <div className="block p-6  bg-white w-full">
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
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.accountNo?.message}</p> */}
                {/* </div>
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
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.bankName?.message}</p> */}
                {/* </div>

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
                    /> */}
                    {/* <p className="text-red-400 text-xs"> {errors.bankBranch?.message}</p> */}
                  {/* </div>
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
                    /> */}


                    {/* <p className="text-red-400 text-xs"> {errors.accountType?.message}</p> */}
                  {/* </div>
                </div>
                <div className="mt-4 gap-3 flex justify-center items-center">
                  <button
                    onClick={pre}
                    className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"
                  >
                    Previous
                  </button>
                  <button
                    onClick={next}
                    className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"
                    type="submit"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

          )}
 */}

  

          {/* {formNo === 4 && (
            <div>
              <div className="block p-6  bg-white w-full h-full">
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Designation" />
                  <FormInputField
                    value={state.designationName}
                    inputHandle={inputHandle}
                    type="text"
                    name="designationName"
                    id="designationName"
                    placeholder="Designation"
                    {...register("designationName", { required: "This is required" })}
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.designationName?.message}</p> */}
                {/* </div>
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
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.designationLevel?.message}</p> */}
                {/* </div>

                <div className="mt-4 gap-3 flex justify-center items-center">
                  <button
                    onClick={pre}
                    className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"
                  >
                    Previous
                  </button>
                  <button
                    onClick={finalSubmit}
                    className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"


                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

          )} */}
          {/* <button
                    className="bg-gray-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"

                  >
                    Save Changes
                  </button> */}
        </form>
      </div>
    </div>
    // </div>
  );
}

export default CreateUser2;
