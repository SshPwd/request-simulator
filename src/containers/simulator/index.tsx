import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {SimulatorState} from './types';
import {addRequest, removeRequestById, runRequestBatch, stopRequestBatch} from './actions';
import RequestForm, {FormPayload} from 'components/request-form';
import RequestItem from 'components/request-item';
import RequestSpinner from 'components/request-spinner';
import Button, {ButtonGroup} from '@atlaskit/button';
import './index.scss';

type Props = ConnectedProps<typeof connector>;

const Simulator = ({
  requests,
  addRequest,
  removeRequestById,
  runRequestBatch,
  stopRequestBatch,
  currentRequest,
  isRunning,
}: Props) => {
  const onAddRequest = (payload: FormPayload) => addRequest(payload.name, payload.delay);

  return (
    <div className="rs__container">
      <h1 className="rs__title">Request Simulator</h1>

      <div className="rs__wrapper">
        <div>
          <div>
            <RequestForm disabled={isRunning} onAddRequest={onAddRequest} />
          </div>

          <div>
            {requests.map(request => (
              <RequestItem
                disabled={isRunning}
                key={`request-item-c-${request.id}`}
                onRemove={removeRequestById}
                request={request}
              />
            ))}
          </div>

          {requests.length ? (
            <div className="rs__controls">
              <ButtonGroup>
                <Button isDisabled={isRunning} appearance="primary" onClick={() => runRequestBatch(requests)}>
                  Run
                </Button>
                <Button isDisabled={!isRunning} onClick={() => stopRequestBatch(requests)}>
                  Stop
                </Button>
              </ButtonGroup>
            </div>
          ) : null}
        </div>

        {currentRequest ? <RequestSpinner request={currentRequest} /> : <div>No active requests</div>}
      </div>
    </div>
  );
};

const mapStateToProps = ({simulator}: {simulator: SimulatorState}) => ({
  requests: simulator.requests,
  currentRequest: simulator.currentRequest,
  isRunning: !!simulator.currentBatchRequestId,
});

const mapDispatchToProps = {
  addRequest,
  removeRequestById,
  runRequestBatch,
  stopRequestBatch,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Simulator);
