import { React, useState, useEffect } from "react";
import axios from "axios";
import urls from "../common/Urls";
import AuthService from "./AuthenticationService";

const user = AuthService.getCurrentUser();
// const viewUser = "http://localhost:8080/users/" + userId"

const getAllUsers = (pageNo, pageSize) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return axios
    .get(urls.GET_ALL_USERS_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.jwt,
      },
      params: {
        pageNo: pageNo,
        pageSize: pageSize,
      },
    })
    .catch((e) => {
      if (e.response.status === 403)
        throw new Error("Error. Token is not Valid");
      else {
        throw new Error("Error: Something Went Wrong");
      }
    });
};

const DeleteUser = (userId) => {
  // const UserID = props.userID
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(userId);
  axios({
    method: "delete",
    url: "http://localhost:8080/users/" + userId,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      Authorization:
        `Bearer ` + user.jwt,
    },
    data: null,

    mode: "cors",
  }).then((res) => {
    console.log("response", res);
    // var users = res.data;
    // localStorage.setItem("UserList", JSON.stringify(users))
  });
};

// const ViewUser = async (userId) => {
//   console.log("userId");
//   console.log(userId);
  

//   await axios
//       .get(urls.VIEW_USER, {
//           userId: userId,
          
//       }).then((response) => {
//           if (response.status === 200) {

//               //if (response.data.body.user) {
//                   // localStorage.removeItem("user");
//                   localStorage.setItem("SingleUser", JSON.stringify(response.data.body));
//                   //console.log("token saved angi ",response.data.body);
//              // }
//              console.log("response code");
//             //  console.log(response.status);
//               return response.data;
//           }

//       }).catch((e) => {
//               if(e.response.status === 403)
//               throw new Error("Error. Username or Password Incorrect")
//               else{
//                   throw new Error("Error: Something Went Wrong")
//               }
          

//       });





// };


const UserService = {
  getAllUsers,
  DeleteUser
  // ViewUser,
};

export default UserService;
