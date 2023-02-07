// PLUGINS IMPORTS //
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// COMPONENTS IMPORTS //
import { CreateButton, TextFieldComponent } from "components/atoms";

// EXTRA IMPORTS //
import { AuthTemplate } from "components/templates";
import { useAppSelector } from "app/store";
import { useLoginMutation } from "features/slices/authSlice";
import { ETheme } from "types/theme";

/////////////////////////////////////////////////////////////////////////////

type LoginProps = {};

interface IFormProps {
  email: string;
  password: string;
}

//! split this into a separate file

const formSchema: yup.SchemaOf<IFormProps> = yup.object({
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

const Login = (props: LoginProps) => {
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const methods = useForm<IFormProps>({
    resolver: yupResolver(formSchema),
    // in order to achive the behaviour where error msgs appear both on submit and when fields that are modified get unfocused, we use mode: "onTouched" with
    // some extra logic in the input field to stop behaviours like error appearing if user did not modify the field
    // also, once error appears, it will stay there until form is submitted properly
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
    // uncontrolled inputs
  });
  const submitHandler: SubmitHandler<IFormProps> = async (data: IFormProps) => {
    console.log("data submitted", data);
  };
  return (
    <AuthTemplate>
      <section>
        Login
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            <TextFieldComponent label="Email" name="email" />
            <TextFieldComponent label="Password" name="password" />
            <CreateButton
              theme={ETheme.LIGHT}
              buttonText="Login"
              buttonProps={{ type: "submit", variant: "contained", color: "primary", fullWidth: false }}
            />
          </form>
        </FormProvider>
        <button
          onClick={() =>
            loginUser({
              email: "elhan@gmail.com",
              password: "elhan1234",
            })
          }
        >
          Login Button
        </button>
        <Link to="/">Go to home</Link>
      </section>
    </AuthTemplate>
  );
};

export default Login;
