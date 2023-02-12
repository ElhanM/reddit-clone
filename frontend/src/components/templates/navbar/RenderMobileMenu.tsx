// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import { StyledRenderMenu } from "components/atoms";
import IconLink from "./IconLink";

// EXTRA IMPORTS //
import { ELink } from "types/pages";

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
      <IconLink link={ELink.TEXT} handleClick={handleMobileMenuClose} renderIconText />
    </StyledRenderMenu>
  );
};

export default RenderMobileMenu;
