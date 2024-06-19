import {
  FieldErrors,
  FieldName,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { FieldValuesFromFieldErrors } from '@hookform/error-message';

import { PasswordInput } from './ui/input';
import InputErrorMessage from './ui/input-error-message';
import { Label } from './ui/label';

type FormControlName<K extends FieldValues> = keyof K &
  Path<K> &
  FieldName<FieldValuesFromFieldErrors<FieldErrors<K>>>;

interface FormControlProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: FormControlName<T>;
  label: string;
  errors?: FieldErrors<T>;
}

export default function FormControl<T extends FieldValues>({
  register,
  name,
  label,
  errors,
}: FormControlProps<T>) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={String(name)}>{label}</Label>
      <PasswordInput {...register(name)} required />
      {errors && <InputErrorMessage errors={errors} name={name} />}
    </div>
  );
}
