// PLUGINS IMPORTS //
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //
import { CreateButton, AuthTextFieldComponent } from "components/atoms";
import { HandleError } from "components/templates";
import { FormWrapper } from "components/organisms";
import { AuthTemplate } from "components/templates";

// EXTRA IMPORTS //
import { useLoginMutation } from "features/slices/authSlice";
import { ILoginForm } from "types/pages";
import loginFormSchema from "./loginFormSchema";
import styles from "./login.module.css";
import { ETheme } from "types/theme";

/////////////////////////////////////////////////////////////////////////////

type LoginProps = {};

const Login = (props: LoginProps) => {
  const history = useNavigate();

  //! handle errors
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  // by default, whenever we hit login, if submitHandler runs, error will be reset to undefined
  // this causes the error modal to disappear for a split second and reappear if there is still an error
  // to prevent this, we use a ref to store the prev value and display that while error is undefined
  const errorRef = useRef<FetchBaseQueryError | SerializedError>(undefined);

  useEffect(() => {
    if (error !== undefined) errorRef.current = error;
  }, [error]);

  const methods = useForm<ILoginForm>({
    resolver: yupResolver(loginFormSchema),
    // in order to achive the behaviour where error msgs appear both on submit and when fields that are modified get unfocused, we use mode: "onTouched" with
    // some extra logic in the input field to stop behaviours like error appearing if user did not modify the field
    // also, once error appears, it will stay there until form is submitted properly
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // typing an async arrow function
  const submitHandler: SubmitHandler<ILoginForm> = async (data: ILoginForm) => {
    const { email, password } = data;
    // If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
    await loginUser({
      email,
      password,
    }).unwrap();
    // redirect to home page
    // we do not need to check whether there was an error before redirecting because if there was an error, due to yup form validation
    // this function will not be called
    history("/");
  };

  return (
    <AuthTemplate>
      <main className={`${styles["login-wrapper"]}`}>
        <Typography variant="h5" className={`${styles["login-header"]}`}>
          Login
        </Typography>
        <FormWrapper methods={methods} submitHandler={submitHandler} authForm={true}>
          <section className={`${styles["inner-login"]}`}>
            <AuthTextFieldComponent label="Email" name="email" />
            <AuthTextFieldComponent label="Password" name="password" type="password" />
            {(isError || errorRef.current) && !isSuccess && <HandleError error={error || errorRef.current} marginTop />}
            <CreateButton
              theme={ETheme.LIGHT}
              buttonText="Login"
              buttonProps={{ type: "submit", variant: "contained", color: "primary", fullWidth: true, disabled: isLoading }}
            />
          </section>
        </FormWrapper>
        <Typography variant="subtitle1" className={`${styles["login-footer"]}`}>
          New to Reddit? Sign up
        </Typography>
        {/* <Link to="/">Go to home</Link> */}
      </main>
    </AuthTemplate>
  );
};

export default Login;
