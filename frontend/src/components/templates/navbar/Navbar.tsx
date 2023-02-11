// PLUGINS IMPORTS //
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";

// COMPONENTS IMPORTS //
import RenderMenu from "./RenderMenu";
import RenderMobileMenu from "./RenderMobileMenu";
import NavLG from "./NavLG";
import NavSM from "./NavSM";

// EXTRA IMPORTS //
import styles from "./navbar.module.scss";

/////////////////////////////////////////////////////////////////////////////

type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            height: "48px !important",
            maxHeight: "48px !important",
            // we need minHeight here in order to override the existing mui min-height
            // it also will not work without !important
            minHeight: "48px !important",
            backgroundColor: "#1a1a1b",
          }}
        >
          <NavLG menuId={menuId} handleProfileMenuOpen={handleProfileMenuOpen} />
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <NavSM handleMobileMenuOpen={handleMobileMenuOpen} mobileMenuId={mobileMenuId} />
          </Box>
        </Toolbar>
      </AppBar>
      <RenderMobileMenu
        mobileMenuId={mobileMenuId}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
      />
      <RenderMenu anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} menuId={menuId} />
    </Box>
  );
};

export default Navbar;
