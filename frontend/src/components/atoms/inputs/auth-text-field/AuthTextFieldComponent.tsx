// PLUGINS IMPORTS //
import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./text-field.module.css";

/////////////////////////////////////////////////////////////////////////////

type TextFieldComponentProps = {
  label: string;
  name: string;
  // type text, password, etc
  type?: string;
  textFieldProps?: TextFieldProps;
};

const AuthTextFieldComponent = ({ label, name, type, ...rest }: TextFieldComponentProps) => {
  const {
    register,
    formState: {
      errors,
      // get names of all fields that are dirty
      dirtyFields: { [name]: isDirty } = {
        [name]: false,
      },
      // check if form was submitted
      isSubmitted,
      // check if filed was unfocused
      touchedFields: { [name]: isTouched } = {
        [name]: false,
      },
    },
    // getValues,
    reset,
  } = useFormContext();

  // for convinience, we will store these values in variables
  // and we will not use useStates, because we want these variables to be updated on every render/value change
  const hasError = !!errors[name];
  const isDirtyField = !!isDirty;
  // const isModified = !!getValues(name);
  const isTouchedField = !!isTouched;

  // we use useState here so it does not go back to default value on every render
  const [showHelperText, setShowHelperText] = useState(false);

  // we only want error to show if either form was submitted, or if form was focused, modified and unfocused
  if (!showHelperText) {
    if (hasError && isSubmitted) {
      setShowHelperText(true);
    } else if (isTouchedField && isDirtyField && hasError) {
      setShowHelperText(true);
    }
  }

  // we only want error to appear if a modifed field gets unfocused, and once it appears, it should stay
  // but, e.g. if we unfocus an unmodifed field, and then after that focus it again and modify it
  // the error appears before unfocus
  // since isTouchedField stays true
  // so, everytime a filed gets unfocused, if showHelperText===false, aka the error is not showing, we will reset isTouchedField to false
  // but, since we only want reset the value of isTouchedField
  // we need to add all specific options to keep the other values
  if (!showHelperText && isTouchedField) {
    reset(
      { [name]: false },
      {
        keepErrors: true,
        keepDirty: true,
        keepDirtyValues: true,
        keepValues: true,
        keepDefaultValues: true,
        keepIsSubmitted: true,
        // touched is the only one that we want to reset
        // keepTouched: true,
        keepIsValid: true,
        keepSubmitCount: true,
      },
    );
  }

  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        // only show error outline and error text only if both showHelperText is true and error msg exists
        // this pervents error where error outline stays after there is no longer an error
        error={showHelperText && !!((errors[name]?.message as string) ?? "")}
        // typecast to string to avoid type errors
        helperText={showHelperText && ((errors[name]?.message as string) ?? "")}
        {...rest.textFieldProps}
        // disable browsers default autocomplete cus it hides error text
        autoComplete="off"
        type={type ?? "text"}
        {...register(name)}
        fullWidth
      />
    </>
  );
};

export default AuthTextFieldComponent;
