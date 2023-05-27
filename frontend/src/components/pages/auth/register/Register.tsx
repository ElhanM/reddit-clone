// PLUGINS IMPORTS //
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// COMPONENTS IMPORTS //
import { AuthTextFieldComponent, CreateButton } from "components/atoms";
import { FormWrapper } from "components/organisms";
import { AuthTemplate, HandleError } from "components/templates";

// EXTRA IMPORTS //
import { useRegisterMutation } from "features/slices/authSlice";
import { IRegisterForm } from "types/pages";
import { ETheme } from "types/theme";
import styles from "./register.module.css";
import registerFormSchema from "./registerFormSchema";

/////////////////////////////////////////////////////////////////////////////

type RegisterProps = {};

const Register = (props: RegisterProps) => {
  const history = useNavigate();

  //! handle errors
  const [registerUser, { isLoading, isError, error, isSuccess }] = useRegisterMutation();

  // by default, whenever we hit register, if submitHandler runs, error will be reset to undefined
  // this causes the error modal to disappear for a split second and reappear if there is still an error
  // to prevent this, we use a ref to store the prev value and display that while error is undefined
  const errorRef = useRef<FetchBaseQueryError | SerializedError>(undefined);

  useEffect(() => {
    if (error !== undefined) errorRef.current = error;
  }, [error]);

  const methods = useForm<IRegisterForm>({
    resolver: yupResolver(registerFormSchema),
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
  const submitHandler: SubmitHandler<IRegisterForm> = async (data: IRegisterForm) => {
    const { username, email, password } = data;
    // If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
    await registerUser({
      username,
      email,
      password,
    }).unwrap();
    // redirect to home page
    // we do not need to check whether there was an error before redirecting because if there was an error, due to yup form validation
    // this function will not be called
    history("/search-communities?name=");
  };

  return (
    <AuthTemplate>
      <main className={`${styles["register-wrapper"]}`}>
        <Typography variant="h5" className={`${styles["register-header"]}`}>
          Register
        </Typography>
        <FormWrapper methods={methods} submitHandler={submitHandler} authForm={true}>
          <section className={`${styles["inner-register"]}`}>
            <AuthTextFieldComponent label="Username" name="username" />
            <AuthTextFieldComponent label="Email" name="email" />
            <AuthTextFieldComponent label="Password" name="password" type="password" />
            {(isError || errorRef.current) && !isSuccess && <HandleError error={error || errorRef.current} marginTop />}
            <CreateButton
              theme={ETheme.LIGHT}
              buttonText="Register"
              buttonProps={{ type: "submit", variant: "contained", color: "primary", fullWidth: true, disabled: isLoading }}
            />
          </section>
        </FormWrapper>
        <Typography variant="subtitle1" className={`${styles["login-footer"]}`}>
          <Link to="/login">Already have an account? Login</Link>
        </Typography>
      </main>
    </AuthTemplate>
  );
};

export default Register;
