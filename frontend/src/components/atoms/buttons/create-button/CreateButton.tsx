// PLUGINS IMPORTS //
import { Button } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./create-button.module.scss";
import { ETheme } from "types/features";

/////////////////////////////////////////////////////////////////////////////

type CreateButtonProps = {
  theme: ETheme;
};

const CreateButtonLight = ({ theme }: CreateButtonProps) => {
  return (
    <Button fullWidth variant="contained" className={`${styles[`button-${theme}`]}`} onClick={() => {}}>
      Create Post
    </Button>
  );
};

export default CreateButtonLight;
