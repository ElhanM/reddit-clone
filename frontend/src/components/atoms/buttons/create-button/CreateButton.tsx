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
  createPost?: boolean;
};

const CreateButtonLight = ({ theme, buttonText, createPost, ...rest }: CreateButtonProps) => {
  return (
    <Button
      variant="contained"
      className={`${styles[`button-${theme}`]}

      
      `}
      {...rest.buttonProps}
      sx={{
        // select .MuiButton-root
        "&.MuiButton-root": {
          margin: createPost && "0 !important",
        },
      }}
    >
      {rest.buttonProps.disabled ? "Loading..." : buttonText}
    </Button>
  );
};

export default CreateButtonLight;
