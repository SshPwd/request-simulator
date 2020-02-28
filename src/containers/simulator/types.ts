export const enum SimulatorRequestStatusCode {
  Created,
  Pending,
  Done,
}

export type SimulatorRequest = {
  id: number;
  delay: number;
  name: string;
  statusCode: SimulatorRequestStatusCode;
};

export type EmulatorState = {
  requests: SimulatorRequest[];
};

type ActionAddRequest = {
  type: ActionType.ADD_REQUEST;
  request: SimulatorRequest;
};

type ActionUpdateRequest = {
  type: ActionType.UPDATE_REQUEST;
  request: SimulatorRequest;
};

type ActionRemoveRequest = {
  type: ActionType.REMOVE_REQUEST;
  requestId: number;
};

export type Action = ActionAddRequest | ActionUpdateRequest | ActionRemoveRequest;

export const enum ActionType {
  ADD_REQUEST = 'simulator/add-request',
  UPDATE_REQUEST = 'simulator/update-request',
  REMOVE_REQUEST = 'simulator/remove-request',
}
