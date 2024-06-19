import { FieldErrors, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface PasswordErrorListProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  errorMessages: Record<string, string>;
  fieldName: keyof T;
}

export default function PasswordErrorList<T extends FieldValues>({
  errors,
  errorMessages,
  fieldName,
}: PasswordErrorListProps<T>) {
  const errorTypes = errors[fieldName]?.types || {};
  const errorKeys = Object.values(errorTypes).flat();
  return (
    <ul className="grid gap-2">
      {Object.entries(errorMessages).map(([key, value]) => (
        <li
          key={key}
          className={cn(
            'text-tiny list-disc ml-5',
            errorKeys.includes(key) ? 'text-red-500' : 'text-gray-500'
          )}
        >
          {value}
        </li>
      ))}
    </ul>
  );
}
