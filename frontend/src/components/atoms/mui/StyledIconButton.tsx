// PLUGINS IMPORTS //

import { IconButton, IconButtonProps } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type StyledIconButtonProps = {
  children: React.ReactNode;
  ariaLabel: string;
  icon?: boolean;
  iconProps?: IconButtonProps;
};

const StyledIconButton = ({ children, ariaLabel, icon, iconProps }: StyledIconButtonProps) => {
  return (
    <IconButton
      size="large"
      aria-label={ariaLabel}
      color="inherit"
      disableRipple
      sx={
        icon
          ? {
              width: "32px !important",
              height: "32px !important",
              // height makes it move up a bit, so we need to recenter it
              margin: "auto 0 !important",
              borderRadius: "10% !important",
              "&:hover": {
                backgroundColor: "#2d2d2f !important",
              },
            }
          : {
              "&:hover": {
                backgroundColor: "transparent !important",
              },
            }
      }
      {...iconProps}
    >
      {children}
    </IconButton>
  );
};

export default StyledIconButton;
