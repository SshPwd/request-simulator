import React, {memo} from 'react';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@atlaskit/form';
import {formValidationSchema} from 'utils';
import './index.scss';

type Props = {
  onAddRequest: (data: FormPayload) => void;
  disabled: boolean;
};

export type FormPayload = {
  name: string;
  delay: number;
};

const RequestForm = memo(({onAddRequest, disabled}: Props) => {
  const {handleSubmit, setValue, errors, watch, register} = useForm<FormPayload>({
    validationSchema: formValidationSchema,
    defaultValues: {
      name: '',
      delay: 3,
    },
  });

  register({name: 'name'});
  register({name: 'delay'});

  const values = watch();

  return (
    <form onSubmit={handleSubmit(onAddRequest)} style={{display: 'flex'}} className="rs__form">
      <div className="rs__form-field">
        <TextField
          name="request-name"
          label="Request name"
          value={values.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('name', e.target.value)}
          width="small"
          isInvalid={!!errors?.name}
          isDisabled={disabled}
        />

        {errors?.name ? <ErrorMessage>{errors?.name?.message}</ErrorMessage> : null}
      </div>

      <div className="rs__form-field">
        <TextField
          name="request-delay"
          value={values.delay}
          label="Delay (sec)"
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('delay', parseInt(e.target.value))}
          width="small"
          isDisabled={disabled}
        />
        {errors?.delay ? <ErrorMessage>{errors?.delay?.message}</ErrorMessage> : null}
      </div>

      <Button isDisabled={disabled} className="rs__form-field rs__add-btn" type="submit" appearance="primary">
        Add
      </Button>
    </form>
  );
});

export default RequestForm;
