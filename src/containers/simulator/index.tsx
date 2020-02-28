import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {EmulatorState} from './types';

type Props = ConnectedProps<typeof connector>;

const Simulator = ({requests}: Props) => {
  return (
    <div>
      {requests.map((request, i) => (
        <div key={`request-item-${i}`}>{request.name}</div>
      ))}
    </div>
  );
};

const mapStateToProps = ({simulator}: {simulator: EmulatorState}) => ({
  requests: simulator.requests,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Simulator);
