// reducer.js
import { DELETE_TICKET } from "../actions/Types";

const initialState = {
  tickets: [],
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
    default:
      return state;
  }
};

export default reducer;
