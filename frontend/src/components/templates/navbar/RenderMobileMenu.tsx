// PLUGINS IMPORTS //
import { Menu, MenuItem } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type RenderMobileMenuProps = {
  mobileMoreAnchorEl: null | HTMLElement;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  mobileMenuId: string;
};

const RenderMobileMenu = ({ mobileMoreAnchorEl, isMobileMenuOpen, handleMobileMenuClose, mobileMenuId }: RenderMobileMenuProps) => {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>Create Post</MenuItem>
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
    </Menu>
  );
};

export default RenderMobileMenu;
