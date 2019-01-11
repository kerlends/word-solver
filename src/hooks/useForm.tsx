import * as React from 'react';

export const useForm = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setValue('');
  };

  return { value, onChange: handleChange, onReset: handleReset };
};
