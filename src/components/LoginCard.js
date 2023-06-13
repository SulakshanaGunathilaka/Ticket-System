import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/AuthenticationService";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonToasts from "../common/Toasts";
import CommonSpinners from "../common/Spinners";
import { loginUser } from "./SetAuth";



export default function LoginCard() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


  const handleLogin = async (e) => {

    // loginUser(username,password)
    setLoading(true);
    await delay(1000);
    console.log("start");
    console.log(loading);

    try {
      await AuthService.login(username, password).then(
        () => {

          console.log("sucess");
          setLoading(false);
          CommonToasts.basicToast("Successfully Logged In")
          navigate("/home")

        }
      );

    }
    catch (e) {
      console.log('Error')
      console.log(e)
      setLoading(false);
      CommonToasts.errorToast(e.message)


    }


    // console.log("end");
    // console.log(loading);

  };


  return (
    
    <div >
      <div className=" p-4 w-full bg-white max-w-sm rounded-lg border border-gray-200 shadow-md  md:p-6 dark:bg-gray-800 dark:border-gray-700">
        <form className="max-w-[400px]  w-full mx-auto" >
          <h4 className="flex text-xl justify-center font-semibold text-gray-700 dark:text-white mb-3 mt-0">Welcome</h4>
          <h5 className="text-l font-medium text-gray-700 dark:text-white mt-0 mb-5">Sign in with your Username and Password</h5>
          <div className="flex flex-wrap w-full mt-3 mb-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input type="email" name="email" id="email" onChange={onChangeUsername} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="example@ccmsltd.com" required />
          </div>
          <div className="flex flex-wrap w-full mt-5 mb-8">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
            <input type="password" name="password" id="password" onChange={onChangePassword} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>


          {loading ?

            CommonSpinners.buttonSpinner("Logging You In")

            :



            <button type="button" onClick={handleLogin} className="w-full text-grey-700 bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "  >


              <span>Login</span>

            </button>

          }

        </form>
      </div>

    </div>


  );
}