// actions.js
import axios from "axios";
import { DELETE_TICKET ,GET_ALL_TICKETS,GET_ALL_TICKETS_SUCCESS,GET_ALL_TICKETS_ERROR } from "./Types";
import AuthService from "../../services/AuthenticationService";
import urls from "../../common/Urls";



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

export const getAllTickets = (pageNo, pageSize) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_TICKETS });

    try {
      const user1 = AuthService.getCurrentUser();
      const response = await axios.get(urls.GET_ALL_TICKETS_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user1.jwt,
        },
        params: {
          pageNo: pageNo,
          pageSize: pageSize,
        },
      });

      dispatch({
        type: GET_ALL_TICKETS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        dispatch({
          type: GET_ALL_TICKETS_ERROR,
          error: 'Error. Token is not Valid',
        });
      } else {
        dispatch({
          type: GET_ALL_TICKETS_ERROR,
          error: 'Error: Something Went Wrong',
        });
      }
    }
  };
};
