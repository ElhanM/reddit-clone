// PLUGINS IMPORTS //
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// COMPONENTS IMPORTS //
import { PlainLink } from "components/atoms";

// EXTRA IMPORTS //
import styles from "./error.module.css";

/////////////////////////////////////////////////////////////////////////////

type ErrorProps = {};

const Error = (props: ErrorProps) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles["notfound-wrapper"]}`}>
      <div className={`${styles["notfound"]}`}>
        <div className={`${styles["notfound-404"]}`}>
          <Typography variant="h1">
            4<span>0</span>4
          </Typography>
        </div>
        <Typography variant="h2">Oops! Page Not Be Found</Typography>
        <Typography variant="body1">
          Sorry but the page you are looking for either does not exist, has been removed, has had its URL changed or is temporarily unavailable
        </Typography>
        <footer className={`${styles["button-wrapper"]}`}>
          <PlainLink className={`${styles["button"]}`} to="/">
            Home
          </PlainLink>
          <PlainLink
            className={`${styles["button"]}`}
            // dummy link since to is required in link component
            to="#"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </PlainLink>
        </footer>
      </div>
    </div>
  );
};

export default Error;
