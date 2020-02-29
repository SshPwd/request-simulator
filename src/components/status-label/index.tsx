import React, {memo} from 'react';
import Lozenge from '@atlaskit/lozenge';
import {SimulatorRequestStatusCode} from 'containers/simulator/types';

type Props = {
  statusCode: SimulatorRequestStatusCode;
};

const mapStatusCodeToAppearance: {[key: number]: {appearance: any; label: string}} = {
  0: {
    appearance: 'default',
    label: 'new',
  },

  1: {
    appearance: 'inprogress',
    label: 'pending',
  },

  2: {
    appearance: 'success',
    label: 'done',
  },

  3: {
    appearance: 'removed',
    label: 'canceled',
  },
};

const StatusLabel = memo(({statusCode}: Props) => (
  <Lozenge appearance={mapStatusCodeToAppearance[statusCode].appearance}>
    {mapStatusCodeToAppearance[statusCode].label}
  </Lozenge>
));

export default StatusLabel;
