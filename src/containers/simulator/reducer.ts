import {EmulatorState, Action, ActionType} from './types';

const initialState: EmulatorState = {
  requests: [],
};

const reducer = (state = initialState, action: Action): EmulatorState => {
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
    default:
      return state;
  }
};

export default reducer;
