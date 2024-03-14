import { React, useState, useEffect } from "react";
import AuthService from "../services/AuthenticationService";
import { ca } from 'date-fns/locale';
import axios from 'axios';
import urls from "../common/Urls";
import CommonToasts from "../common/Toasts";

export default function Useprofile() {

    const user1 = AuthService.getCurrentUser();
    const [loading, setLoading] = useState(true);
    console.log("current user in user profile page - "+ user1.user.userId)

    //get current users
    const getCurrentUser = () => {
        try{

            setLoading(true);

            const userId = user1.user.userId;

            axios({
                method: "GET",
                url: urls.GET_CURRENT_USER+ userId,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    "Authorization": `Bearer ` + user1.jwt,
                },
                mode: "cors",
            }).then((res) => {
                setCurrentUser(res.data.body);
            }).catch((error)=>{
                CommonToasts.errorToast(error.message)
                setLoading(false);
            });

        }catch (e){
            CommonToasts.errorToast(e.message);
            setLoading(false);
        }
    };

    useEffect(()=>{
        getCurrentUser();
      },[]);

      //Edit user new//

  const [viewCurrentUser, setCurrentUser] = useState({
    id: '',

    firstName: '',
    lastName: '',
    otherNames:'',

    primaryContactNo: '',
    secondaryContactNo: '',

    joinDate:'',
    gender:'',

    email:'',
    dateOfBirth:'',



    userStatus: '',

    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
    },

    
  });

    return (

        <div>
            <div className="bg-white mt-16 ">
                <div className="w-full text-white bg-main-color mt-4">
                    <div
                        className="flex flex-col bg-sky-300 max-h-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                        <div className="p-4 flex flex-row items-center justify-between bg-gray-">
                            <a href="#"
                                className="text-lg font-semibold  tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">user
                                profile</a>
                            <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
                                <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                    <path x-show="" fill-rule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                        clip-rule="evenodd"></path>
                                    <path x-show="open" fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>




                    </div>
                </div>


                <div className="container mx-auto my-5 p-5">
                    <div className="md:flex no-wrap md:-mx-2 ">

                        <div className="w-full md:w-3/12 md:mx-2">

                            <div className="bg-white p-3 border-t-4 border-green-400">

                                <div className="w-72 h-72 border border-gray-500">
                                    <div className="flex items-center justify-center h-full">
                                        <img className="max-w-full max-h-full" src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=" alt="" />
                                    </div>
                                </div>
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 mt-4">{viewCurrentUser.firstName}</h1>
                                <h3 className="text-gray-600 font-lg text-sm leading-6">{viewCurrentUser.lastName}</h3>

                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>Status</span>
                                        <span className="ml-auto"><span
                                            className="bg-green-500 py-1 px-2 rounded text-white text-sm">{viewCurrentUser.userStatus}</span></span>
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Member since</span>
                                        <span className="ml-auto">{viewCurrentUser.joinDate}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="my-4"></div>



                        </div>

                        <div className="w-full md:w-9/12 mx-2 h-64">

                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span className="text-gray-900  font-semibold">
                                        <svg className="h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">About</span>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">First Name</div>
                                            <div className="px-4 py-2">{viewCurrentUser.firstName}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Last Name</div>
                                            <div className="px-4 py-2">{viewCurrentUser.lastName}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Gender</div>
                                            <div className="px-4 py-2">{viewCurrentUser.gender}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                                            <div className="px-4 py-2">{viewCurrentUser.primaryContactNo}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Current Address</div>
                                            <div className="px-4 py-2">{viewCurrentUser.address.addressLine1},{viewCurrentUser.address.addressLine2}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">City</div>
                                            <div className="px-4 py-2">{viewCurrentUser.address.city}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Provice</div>
                                            <div className="px-4 py-2">{viewCurrentUser.address.province}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email.</div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href="mailto:jane@example.com">{viewCurrentUser.email}</a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Birthday</div>
                                            <div className="px-4 py-2">{viewCurrentUser.dateOfBirth}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>












        </div>
    );
}

