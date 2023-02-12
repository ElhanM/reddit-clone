// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import { StyledRenderMenu } from "components/atoms";
import IconLink from "./IconLink";

// EXTRA IMPORTS //
import { ELink } from "types/pages";

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
      <IconLink link={ELink.TEXT} handleClick={handleMenuClose} linkOnly lgScreenRenderText />
    </StyledRenderMenu>
  );
};

export default RenderMenu;
