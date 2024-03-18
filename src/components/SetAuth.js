// import {
//     // REGISTER_USER,
//     // LOGIN_USER,
//     // SET_AUTHENTICATION,
//     // UNAUTHENTICATED,
//     // INVALID_USER_CREDENTIALS,
//     // SET_LOGGING_PROGRESS,
//     // SYSTEM_ERROR,
//   } from "./types";
  import Axios from "axios";
  import SetAuthorizationToken from "./SetAuthorizationToken";
import urls from "../common/Urls";
  // import SetAuthorizationToken from "./setAuthorizationToken";
  // import { SIGN_IN } from "../../configs/api-config";
   

  const SIGN_IN = urls.LOGIN_URL;

  // export const setAuthetication = (data) => (dispatch) => {
  //    dispatch({
  //     type: SET_AUTHENTICATION,
  //     payload: data,
  //   });
  // };
  
  export const loginUser = (  username, password, )  =>{
    // dispatch({
    //   type: SET_LOGGING_PROGRESS,
    //   payload: null,
    // });
    console.log("my code working",username,
    password,)
    Axios.post(SIGN_IN, {
      username: username,
      password: password,
  })
      .then((res) => {
        if (res.data.status == "success") {
          let loggedinUser = {
            ...res.data.body,
           
          };
          const token = res.data.body.jwt;
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("user", JSON.stringify(loggedinUser));
           window.location.reload();
          setTimeout(() => {
            SetAuthorizationToken(token);
            // setAuthetication(res.data.body[1]);
            // dispatch({
            //   type: LOGIN_USER,
            //   payload: { status: true, loggedinUser },
            // });
          }, 100);
        } else {
          // dispatch({
          //   type: INVALID_USER_CREDENTIALS,
          //   payload: {},
          // });
        }
      })
      .catch((error) => {
        // dispatch({
        //   type: SYSTEM_ERROR,
        //   payload: {},
        // });
      });
  };
   
  export const signOutAction = () => (dispatch) => {
    console.log("working signout 101")
  
    localStorage.clear();
    delete Axios.defaults.headers.common["Authorization"];
    // dispatch({
    //   type: UNAUTHENTICATED,
    //   payload: {},
    // });
    // window.location.reload();
  };