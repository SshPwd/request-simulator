import React, {memo} from 'react';
import Button from '@atlaskit/button';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import {SimulatorRequest} from 'containers/simulator/types';
import StatusLabel from 'components/status-label';

type Props = {
  request: SimulatorRequest;
  onRemove: (id: string) => void;
  disabled: boolean
};

const RequestItem = memo(({request, onRemove, disabled}: Props) => (
  <div className="rs__item" key={`request-item-${request.id}`}>
    <div className="rs__r-info">
      <div title={request.name} className="rs__r-name">{request.name}</div>
      <div>{request.delay}</div>
    </div>

    <div>
      <StatusLabel statusCode={request.statusCode} />
    </div>
    <Button isDisabled={disabled} className="rs__r-rm-btn" onClick={() => onRemove(request.id)}>
      <TrashIcon label="Remove request" size="small" />
    </Button>
  </div>
));

export default RequestItem;
