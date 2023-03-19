// PLUGINS IMPORTS //
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// COMPONENTS IMPORTS //
import { NavSelectCommunity, StyledIconButton } from "components/atoms";
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
  // select query params from the url
  const { search } = useLocation();
  const history = useNavigate();
  // extract the name from the query params
  const name = new URLSearchParams(search).get("name");

  const [searchValue, setSearchValue] = useState(name || "");

  useEffect(() => {
    // when we press the home button for example, we want to clear the search input
    // since it changes the alue of name, aka changes the query params
    // we can do this to reset the search input
    setSearchValue(name || "");
  }, [name]);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    history(`/search-communities?name=${searchValue}`);
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
          className={`${styles["search"]} nav-search`}
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
            sx={{
              // make same width as parent
              width: "100% !important",
            }}
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
