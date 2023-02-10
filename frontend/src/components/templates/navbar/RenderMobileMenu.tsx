// PLUGINS IMPORTS //
import { Menu, MenuItem } from "@mui/material";

// COMPONENTS IMPORTS //
import { StyledRenderMenu } from "components/atoms";

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
    <StyledRenderMenu anchorEl={mobileMoreAnchorEl} isMenuOpen={isMobileMenuOpen} handleMenuClose={handleMobileMenuClose} menuId={mobileMenuId}>
      <MenuItem>Create Post</MenuItem>
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
    </StyledRenderMenu>
  );
};

export default RenderMobileMenu;
