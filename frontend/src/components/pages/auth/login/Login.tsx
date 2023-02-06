// PLUGINS IMPORTS //
import { useEffect } from "react";
import { Link } from "react-router-dom";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { AuthTemplate } from "components/templates";
import { useAppSelector } from "app/store";
import { useLoginMutation } from "features/slices/authSlice";

/////////////////////////////////////////////////////////////////////////////

type LoginProps = {};

const Login = (props: LoginProps) => {
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  return (
    <AuthTemplate>
      <section>
        Login
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
