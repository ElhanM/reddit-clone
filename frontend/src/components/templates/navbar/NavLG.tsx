// PLUGINS IMPORTS //
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

// COMPONENTS IMPORTS //
import { NavSelectCommunity, StyledIconButton } from "components/atoms";
import { RedditLogo } from "components/molecules";
import { NavUser } from "components/organisms";
import { Search, SearchIconWrapper, StyledInputBase } from "./index";
import IconLink from "./CreatePostLinks";

// EXTRA IMPORTS //
import styles from "./navbar.module.css";
import { ELink } from "types/pages";
import { useState } from "react";

/////////////////////////////////////////////////////////////////////////////

type NavLGProps = {
  menuId: string;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
};

const NavLG = ({ menuId, handleProfileMenuOpen }: NavLGProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // navigate user to search route and add searchValue as query
    window.location.href = `/search-communities?name=${searchValue}`;
  };
  return (
    <>
      <div
        className={`${styles["logo"]}`}
        // onclick scroll to top, with smooth animation
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <RedditLogo />
      </div>
      <section className={`${styles["nav-main"]}`}>
        <div className={`${styles["select"]}`}>
          <NavSelectCommunity />
        </div>
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
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            // handle submit on enter
            onKeyDown={e => e.key === "Enter" && handleSubmit(e)}
          />
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
