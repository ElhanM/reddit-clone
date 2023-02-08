// PLUGINS IMPORTS //
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";

// COMPONENTS IMPORTS //
import { CreateButton, TextFieldComponent } from "components/atoms";

// EXTRA IMPORTS //
import { AuthTemplate } from "components/templates";
import { useLoginMutation } from "features/slices/authSlice";
import { ILoginFormProps } from "types/pages";
import loginFormSchema from "./loginFormSchema";
import styles from "./login.module.css";
import { FormWrapper } from "components/organisms";
import { ETheme } from "types/theme";

/////////////////////////////////////////////////////////////////////////////

type LoginProps = {};

const Login = (props: LoginProps) => {
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const methods = useForm<ILoginFormProps>({
    resolver: yupResolver(loginFormSchema),
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

  // typing an async arrow function
  const submitHandler: SubmitHandler<ILoginFormProps> = async (data: ILoginFormProps) => {
    console.log("data submitted", data);
  };

  return (
    <AuthTemplate>
      <main className={`${styles["login-wrapper"]}`}>
        <Typography variant="h5" className={`${styles["login-header"]}`}>
          Login
        </Typography>
        <FormWrapper methods={methods} submitHandler={submitHandler}>
          <TextFieldComponent label="Email" name="email" />
          <TextFieldComponent label="Password" name="password" />
          <CreateButton
            theme={ETheme.LIGHT}
            buttonText="Login"
            buttonProps={{ type: "submit", variant: "contained", color: "primary", fullWidth: false }}
          />
        </FormWrapper>
        <Typography variant="subtitle1" className={`${styles["login-footer"]}`}>
          New to Reddit? Sign up
        </Typography>
        {/* <button
          onClick={() =>
            loginUser({
              email: "elhan@gmail.com",
              password: "elhan1234",
            })
          }
        >
          Login Button
        </button>
        <Link to="/">Go to home</Link> */}
      </main>
    </AuthTemplate>
  );
};

export default Login;
