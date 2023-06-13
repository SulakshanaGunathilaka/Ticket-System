// actions.js
import axios from "axios";
import { DELETE_TICKET } from "./Types";
import AuthService from "../../services/AuthenticationService";



export const deleteTicket = (ticketId) => {
  return (dispatch) => {
    const user1 = AuthService.getCurrentUser();

    axios({
      method: "delete",
      url: "http://localhost:8080/tickets/" + ticketId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        Authorization: `Bearer ` + user1.jwt,
      },
      data: null,
      mode: "cors",
    })
      .then((res) => {
        console.log("response", res);
        dispatch({
          type: DELETE_TICKET,
          ticketId: ticketId,
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting ticket:", error);
      });
  };
};
