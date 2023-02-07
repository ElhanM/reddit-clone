// PLUGINS IMPORTS //
import { TextField, TextFieldProps } from "@mui/material";
import { getValue } from "@mui/system";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type TextFieldComponentProps = {
  label: string;
  name: string;
  textFieldProps?: TextFieldProps;
};

const TextFieldComponent = ({ label, name, ...rest }: TextFieldComponentProps) => {
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
    getValues,
    reset,
  } = useFormContext();

  const hasError = !!errors[name];
  const isDirtyField = !!isDirty;
  const isModified = !!getValues(name);
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

  useEffect(() => {
    // we only want error to appear if a modifed field gets unfocused, and once it appears, it should stay
    // but, e.g. if we unfocus an unmodifed field, and then after that focus it again and modify it
    // the error appears before unfocus
    // since isTouchedField stays true
    // so, everytime a filed gets unfocused, if showHelperText===false, aka the error is not showing, we will reset isTouchedField to false
    // but, since we only want reset the value of isTouchedField
    // we need to add all specific options to keep the other values
    if (!showHelperText) {
      reset(
        { [name]: false },
        {
          keepErrors: true,
          keepDirty: true,
          keepDirtyValues: true,
          keepValues: true,
          keepDefaultValues: true,
          keepIsSubmitted: true,
          // keepTouched: true,
          keepIsValid: true,
          keepSubmitCount: true,
        },
      );
    }
  }, [isTouchedField]);

  console.log("showHelperText", showHelperText);

  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        error={showHelperText}
        // typecast to string to avoid type errors
        helperText={showHelperText && ((errors[name]?.message as string) ?? "")}
        {...rest.textFieldProps}
        {...register(name)}
      />
    </>
  );
};

export default TextFieldComponent;
