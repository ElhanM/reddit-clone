// PLUGINS IMPORTS //
import * as yup from "yup";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { ILoginFormProps } from "types/pages";

/////////////////////////////////////////////////////////////////////////////

const loginFormSchema: yup.SchemaOf<ILoginFormProps> = yup.object({
  // make yup schema using exact same rules as express-validator with same error messages
  email: yup
    .string()
    .email("The email value should be a valid email")
    .required("The email value should not be empty")
    .min(4, "The email value should be between 4 and 255 characters")
    .max(255, "The email value should be between 4 and 255 characters"),
  password: yup
    .string()
    .required("The password value should not be empty")
    .min(8, "The password value should be between 8 and 32 characters")
    .max(32, "The password value should be between 8 and 32 characters")
    .matches(/^[a-zA-Z0-9_.-]+$/, "The password value can only contain letters, numbers, dash, underscore and dot"),
});

export default loginFormSchema;
