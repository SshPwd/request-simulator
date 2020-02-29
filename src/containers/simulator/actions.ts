import {fakeRequest, genKey} from 'utils';
import {
  ActionAddRequest,
  ActionRemoveRequest,
  ActionSetButchRequestId,
  ActionType,
  ActionUpdateRequest,
  SimulatorRequest,
  SimulatorRequestStatusCode,
  GetStateType,
  ActionSetCurrentRequest,
} from './types';
import {Dispatch} from 'redux';

export const addRequest = (name: string, delay: number): ActionAddRequest => ({
  type: ActionType.ADD_REQUEST,
  request: {
    id: genKey(),
    name,
    delay,
    statusCode: SimulatorRequestStatusCode.Created,
  },
});

export const removeRequestById = (requestId: string): ActionRemoveRequest => ({
  type: ActionType.REMOVE_REQUEST,
  requestId,
});

export const setButchRequestId = (id: string): ActionSetButchRequestId => ({
  type: ActionType.SET_BUTCH_REQUEST_ID,
  id,
});

export const updateRequest = (request: SimulatorRequest): ActionUpdateRequest => ({
  type: ActionType.UPDATE_REQUEST,
  request,
});

export const setCurrentRequest = (request: SimulatorRequest | null): ActionSetCurrentRequest => ({
  type: ActionType.SET_CURRENT_REQUEST,
  request,
});

export const runRequestBatch = (requests: SimulatorRequest[]) => (
  dispatch: Dispatch<ActionSetButchRequestId | ActionUpdateRequest | ActionSetCurrentRequest>,
  /*
   * WARNING: using getState is dirty hack and anti-pattern, but native promises do not have Cancel API
   * in this case e need to know state of global rejection inside current working request
   * */
  getState: GetStateType
): Promise<any> => {
  const currentButchRequestId = genKey();

  dispatch(setButchRequestId(currentButchRequestId));

  requests.forEach(request => {
    dispatch(updateRequest({...request, statusCode: SimulatorRequestStatusCode.Pending}));
  });

  return requests
    .reduce((accumulatorPromise: Promise<any>, request) => {
      return accumulatorPromise.then(() => {
        dispatch(setCurrentRequest(request));
        return fakeRequest(request.delay, currentButchRequestId, getState).then(() =>
          dispatch(updateRequest({...request, statusCode: SimulatorRequestStatusCode.Done}))
        );
      });
    }, Promise.resolve())
    .then(() => {
      // clear current batch ID after finished butch request
      dispatch(setButchRequestId(''));
      dispatch(setCurrentRequest(null));
    });
};

export const stopRequestBatch = (requests: SimulatorRequest[]) => (
  dispatch: Dispatch<ActionSetButchRequestId | ActionUpdateRequest | ActionSetCurrentRequest>
) => {
  // clear current batch ID for reject the sequence of promises
  dispatch(setButchRequestId(''));
  dispatch(setCurrentRequest(null));

  // set status canceled to all pending promises
  requests.forEach(request => {
    if (request.statusCode === SimulatorRequestStatusCode.Pending) {
      dispatch(updateRequest({...request, statusCode: SimulatorRequestStatusCode.Canceled}));
    }
  });
};
