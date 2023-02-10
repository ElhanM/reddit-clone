// PLUGINS IMPORTS //
import { MenuItem } from "@mui/material";

// COMPONENTS IMPORTS //
import { StyledRenderMenu } from "components/atoms";

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////
type RenderMenuProps = {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  menuId: string;
};

const RenderMenu = ({ anchorEl, isMenuOpen, handleMenuClose, menuId }: RenderMenuProps) => {
  return (
    <StyledRenderMenu anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} menuId={menuId}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </StyledRenderMenu>
  );
};

export default RenderMenu;
