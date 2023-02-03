// PLUGINS IMPORTS //
import { Button, ButtonProps } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./create-button.module.scss";
import { ETheme } from "types/theme";

/////////////////////////////////////////////////////////////////////////////

type CreateButtonProps = {
  theme: ETheme;
  buttonText: string;
  buttonProps?: ButtonProps;
};

const CreateButtonLight = ({ theme, buttonText, ...rest }: CreateButtonProps) => {
  return (
    <Button variant="contained" className={`${styles[`button-${theme}`]}`} {...rest.buttonProps}>
      {buttonText}
    </Button>
  );
};

export default CreateButtonLight;
