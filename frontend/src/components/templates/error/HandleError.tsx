// PLUGINS IMPORTS //
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import CancelIcon from "@mui/icons-material/Cancel";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./handle-error.module.css";

/////////////////////////////////////////////////////////////////////////////

type HandleErrorProps = {
  error: FetchBaseQueryError | SerializedError;
  marginTop?: boolean;
};

const ErrorWrapper = ({ marginTop, children }: { children: React.ReactNode; marginTop?: boolean }) => {
  return (
    <div
      className={`${styles["error-wrapper"]}
      ${marginTop ? styles["error-wrapper--margin-top"] : ""}
    `}
    >
      <CancelIcon />
      <span>{children}</span>
    </div>
  );
};

const HandleError = ({ marginTop, error }: HandleErrorProps) => {
  // error is an object, so we can't directly render it
  // docs type safe way to handle rtk query errors:
  // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling
  if ("status" in error) {
    // you can access all properties of `FetchBaseQueryError` here
    // with my backend logic, this is most likely to give back JSON.stringify(error.data which cointains msg and status
    let errMsg = "error" in error ? error.error : JSON.stringify(error.data);

    // so we chech, if we have msg in errMsg, we set errMsg to msg string, so our error message looks better
    // if for some reason we don't have msg in errMsg, we just render the whole errMsg in the form of a stringified JSON object
    if ("msg" in JSON.parse(errMsg)) {
      errMsg = JSON.parse(errMsg).msg;
    }
    return <ErrorWrapper children={errMsg} marginTop={marginTop} />;
  } else {
    // you can access all properties of `SerializedError` here
    return <ErrorWrapper children={error.message} marginTop={marginTop} />;
  }
};

export default HandleError;
