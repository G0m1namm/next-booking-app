import React from 'react';
import { FieldErrors, FieldName, FieldValues } from 'react-hook-form';

import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';

type Props<T extends FieldValues> = {
  errors: FieldErrors<T>;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;
};

export default function InputErrorMessage<T extends FieldValues>({
  errors,
  name,
}: Props<T>) {
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      as={<span className="text-tiny text-destructive" />}
    />
  );
}
