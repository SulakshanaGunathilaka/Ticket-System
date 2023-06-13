import React from "react";
import axios from "axios";
import urls from "../common/Urls";

 // import { loginUser } from "../components/SetAuth";
// import AuthService from "./AuthenticationService";








const getLeaveDetails =  (pageNo, pageSize) => {

   
// if (localStorage.jwtToken) {
//     setAuthorizationToken (localStorage.jwtToken);

//   }
const user = JSON.parse(localStorage.getItem("user"));
   
  
    return  axios
        .get("(http://localhost:8080/leaveApplication/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.jwt
            },
            params:{
                pageNo: pageNo,
                pageSize: pageSize
            },
        
        }).catch((e) => {
            if(e.response.status === 403)
            throw new Error("Error. Token is not Valid")
            else{
                throw new Error("Error: Something Went Wrong")
            }
        

    });

};



const LeaveService = {
    getLeaveDetails,
    


}


export default LeaveService;


