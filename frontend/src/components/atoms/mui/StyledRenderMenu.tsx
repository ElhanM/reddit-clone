// PLUGINS IMPORTS //
import { Menu } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type StyledIconButtonProps = {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  menuId: string;
  children: React.ReactNode;
};

const StyledRenderMenu = ({ anchorEl, isMenuOpen, handleMenuClose, menuId, children }: StyledIconButtonProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        marginTop: "2em !important",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {children}
    </Menu>
  );
};

export default StyledRenderMenu;
