import React, {memo, useEffect, useState} from 'react';
import Spinner from '@atlaskit/spinner';
import {SimulatorRequest} from 'containers/simulator/types';

type Props = {
  request: SimulatorRequest;
};

/*

* Simple component for visualization progress of requests loading
*
* */
const RequestSpinner = memo(({request}: Props) => {
  const [delayLeft, setDelayLeft] = useState<number>(request?.delay || 0);
  const ref = React.useRef() as any;

  useEffect(() => {
    setDelayLeft(request?.delay);
  }, [request]);

  useEffect(() => {
    if (delayLeft) {
      ref.current = setTimeout(() => {
        setDelayLeft(delayLeft - 1);
      }, 1000);
    }

    return () => clearTimeout(ref.current);
  }, [delayLeft, ref]);

  return request ? (
    <div style={{textAlign: 'center'}}>
      <Spinner size="xlarge" delay={3000} />
      <div>{request.name}</div>
      <div>{delayLeft} sec left</div>
    </div>
  ) : null;
});

export default RequestSpinner;
