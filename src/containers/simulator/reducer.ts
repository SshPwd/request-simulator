import {Action, ActionType, SimulatorState} from './types';

const initialState: SimulatorState = {
  requests: [],
  currentBatchRequestId: '',
  currentRequest: null,
};

const reducer = (state = initialState, action: Action): SimulatorState => {
  switch (action.type) {
    case ActionType.ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, {...action.request}],
      };

    case ActionType.UPDATE_REQUEST:
      return {
        ...state,
        requests: state.requests.map(request => {
          if (request.id === action.request.id) {
            return {...action.request};
          }

          return request;
        }),
      };

    case ActionType.REMOVE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(request => request.id !== action.requestId),
      };

    case ActionType.SET_BUTCH_REQUEST_ID:
      return {
        ...state,
        currentBatchRequestId: action.id,
      };

    case ActionType.SET_CURRENT_REQUEST:
      return {
        ...state,
        currentRequest: action.request ? {...action.request} : action.request,
      };

    default:
      return state;
  }
};

export default reducer;
