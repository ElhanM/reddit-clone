// PLUGINS IMPORTS //
import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./text-field.module.css";

/////////////////////////////////////////////////////////////////////////////

type CreatePostTextFieldComponentProps = {
  label: string;
  name: string;
  error: boolean;
  // type text, password, etc
  type?: string;
  setEmptyTitle: (value: boolean) => void;
  textFieldProps?: TextFieldProps;
};

const CreatePostTextFieldComponent = ({ label, name, type, error, setEmptyTitle, ...rest }: CreatePostTextFieldComponentProps) => {
  const { register, watch } = useFormContext();

  useEffect(() => {
    setEmptyTitle(false);
  }, [watch(name)]);

  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        error={error}
        helperText={error && "The title value should not be empty"}
        autoComplete="off"
        type={type ?? "text"}
        size="small"
        {...register(name)}
        fullWidth
        {...rest.textFieldProps}
      />
    </>
  );
};

export default CreatePostTextFieldComponent;
