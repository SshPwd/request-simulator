export const enum SimulatorRequestStatusCode {
  Created,
  Pending,
  Done,
  Canceled,
}

export type SimulatorRequest = {
  id: string;
  delay: number;
  name: string;
  statusCode: SimulatorRequestStatusCode;
};

export type SimulatorState = {
  requests: SimulatorRequest[];
  currentBatchRequestId: string;
  currentRequest: SimulatorRequest | null;
};

export type ActionAddRequest = {
  type: ActionType.ADD_REQUEST;
  request: SimulatorRequest;
};

export type ActionUpdateRequest = {
  type: ActionType.UPDATE_REQUEST;
  request: SimulatorRequest;
};

export type ActionRemoveRequest = {
  type: ActionType.REMOVE_REQUEST;
  requestId: string;
};

export type ActionSetButchRequestId = {
  type: ActionType.SET_BUTCH_REQUEST_ID;
  id: string;
};

export type ActionSetCurrentRequest = {
  type: ActionType.SET_CURRENT_REQUEST;
  request: SimulatorRequest | null;
};

export type Action =
  | ActionAddRequest
  | ActionUpdateRequest
  | ActionRemoveRequest
  | ActionSetButchRequestId
  | ActionSetCurrentRequest;

export const enum ActionType {
  ADD_REQUEST = 'simulator/add-request',
  UPDATE_REQUEST = 'simulator/update-request',
  REMOVE_REQUEST = 'simulator/remove-request',
  SET_BUTCH_REQUEST_ID = 'simulator/set-batch-request-id',
  SET_CURRENT_REQUEST = 'simulator/set-current-request',
}

export type GetStateType = () => SimulatorState;
