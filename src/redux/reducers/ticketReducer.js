// reducer.js
import { DELETE_TICKET,GET_ALL_TICKETS,SUCCESS,ERROR,TICKET_ADD_SUCCESS,SET_TICKET_DETAILS } from "../actions/Types";

const initialState = {
  tickets: [],
  loading: false,
  error: null,
  ticketDescription: null,

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_TICKET:
      const updatedTickets = state.tickets.filter(
        (ticket) => ticket.id !== action.ticketId
      );
      return {
        ...state,
        tickets: updatedTickets,
      };
      case GET_ALL_TICKETS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SUCCESS:
        return {
          ...state,
          tickets: action.payload,
          loading: false,
          error: null,
        };
      case ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case TICKET_ADD_SUCCESS:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
        error: null,
      };
      case SET_TICKET_DETAILS:
        return {
          ...state,
          ticketDescription: action.ticketId,
        };
    default:
      return state;
  }
};

export default reducer;
