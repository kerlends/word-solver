import * as React from 'react';

export const useForm = (): [string, React.ReactNode] => {
  const [value, setValue] = React.useState('');
  const [state, setState] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(value);
  };

  const form = (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={value} />
      <button>submit</button>
    </form>
  );

  return [state, form];
};
