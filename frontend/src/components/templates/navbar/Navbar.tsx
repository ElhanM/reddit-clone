// PLUGINS IMPORTS //
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// COMPONENTS IMPORTS //
import { Search, SearchIconWrapper, StyledInputBase } from "./index";
import { RedditLogo } from "components/molecules";
import { SelectCommunity, StyledIconButton } from "components/atoms";
import { NavUser } from "components/organisms";
import RenderMenu from "./RenderMenu";
import RenderMobileMenu from "./RenderMobileMenu";

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
          <div className={`${styles["logo"]}`}>
            <RedditLogo />
          </div>
          <section className={`${styles["nav-main"]}`}>
            <div className={`${styles["select"]}`}>
              <SelectCommunity />
            </div>
            {/* //TODO add search to menu on sm screens and either make search opet up a new page and search there, or make it search from nav on lg and on new page on sm */}
            <Search
              className={`${styles["search"]}`}
              sx={{
                height: "40px !important",
                borderRadius: "20px !important",
                width: "100% !important",
                // "@media (max-width: 600px)": {
                //   display: "none",
                // },
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
            </Search>
          </section>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <StyledIconButton ariaLabel="add-post" icon>
              <AddOutlinedIcon />
            </StyledIconButton>
            <StyledIconButton
              ariaLabel="account of current user"
              iconProps={{
                edge: "end",
                // we cant use - in a prop name, so we need quotes
                "aria-controls": menuId,
                "aria-haspopup": "true",
                onClick: handleProfileMenuOpen,
              }}
            >
              <NavUser />
            </StyledIconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
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
