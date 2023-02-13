// PLUGINS IMPORTS //
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

// COMPONENTS IMPORTS //
import { SelectCommunity, StyledIconButton } from "components/atoms";
import { RedditLogo } from "components/molecules";
import { NavUser } from "components/organisms";
import { Search, SearchIconWrapper, StyledInputBase } from "./index";
import IconLink from "./CreatePostLinks";

// EXTRA IMPORTS //
import styles from "./navbar.module.css";
import { ELink } from "types/pages";

/////////////////////////////////////////////////////////////////////////////

type NavLGProps = {
  menuId: string;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
};

const NavLG = ({ menuId, handleProfileMenuOpen }: NavLGProps) => {
  return (
    <>
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
        <IconLink link={ELink.ICON} />
        <StyledIconButton
          ariaLabel="account of current user"
          iconProps={{
            edge: "end",
            // we cant use '-' in a prop name, so we need quotes
            "aria-controls": menuId,
            "aria-haspopup": "true",
            onClick: handleProfileMenuOpen,
          }}
        >
          <NavUser />
        </StyledIconButton>
      </Box>
    </>
  );
};

export default NavLG;
