import { useState } from "react";

export const useForm = (callback: any, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // onChange
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // onSubmit
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback(); // triggering the callback
  };

  // return values
  return {
    onChange,
    onSubmit,
    values,
  };
};
