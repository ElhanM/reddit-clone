// PLUGINS IMPORTS //
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Typography } from "@mui/material";
import { RSlash } from "components/molecules";
import { useNavigate } from "react-router-dom";

// COMPONENTS IMPORTS //
import PlainLink from "components/atoms/links/PlainLink";

// EXTRA IMPORTS //
import styles from "./nav-select-community.module.scss";
import { useSelector } from "react-redux";
import { selectAllCommunities } from "features/slices/communitySlice";

/////////////////////////////////////////////////////////////////////////////

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

type NavSelectCommunityProps = {};

const NavSelectCommunity = ({}: NavSelectCommunityProps) => {
  const userCommunities = useSelector(selectAllCommunities);
  const history = useNavigate();

  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };
  return (
    <>
      <FormControl
        sx={{
          backgroundColor: "#1a1a1b",
          width: "95% !important",
          "@media (max-width: 600px)": {
            width: "45% !important",
          },
        }}
      >
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={selected => {
            if (selected.length === 0) {
              return (
                <>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      "@media (max-width: 600px)": {
                        display: "none",
                      },
                    }}
                  >
                    Communities
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      "@media (min-width: 601px)": {
                        display: "none",
                      },
                      "& svg": {
                        width: "1.3rem",
                        marginTop: ".5rem !important",
                      },
                    }}
                  >
                    <RSlash />
                  </Typography>
                </>
              );
            } else {
              return (
                <>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      "@media (max-width: 600px)": {
                        display: "none",
                      },
                    }}
                  >
                    {selected[0] === "Create Community"
                      ? "Create Community"
                      : `r/${userCommunities.find(community => community.communityId === selected[0])?.name}`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      "@media (min-width: 601px)": {
                        display: "none",
                      },
                      "& svg": {
                        width: "1.3rem",
                        marginTop: ".5rem !important",
                      },
                    }}
                  >
                    <RSlash />
                  </Typography>
                </>
              );
            }
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            height: "34px",
            padding: "0 !important",
            "@media (max-width: 600px)": {
              // move select to the left since for some reason it has a huge margin
              // using vw in order to make it responsive, so that it not goes over logo
              marginLeft: "-5vw !important",
              width: "4em !important",
            },
          }}
        >
          <MenuItem disabled>
            <Typography
              variant="subtitle1"
              sx={{
                // small font size and bold
                fontSize: "0.7rem",
                fontWeight: "bold",
              }}
            >
              YOUR COMMUNITIES
            </Typography>
          </MenuItem>
          <MenuItem
            key={"create-community"}
            value={"Create Community"}
            // here, i can not wrap menuItem with a Link component, since then when I press an element
            // it invokes the link but does not invoke the menuItem onClick effect that closes the modal
            // but if I put the link component inside the menuItem, then the link is only clickable on the text
            // so instead I will navigate the user using history and onClick
            onClick={() => {
              history("/create-community");
            }}
          >
            <Typography variant="subtitle1">Create Community</Typography>
          </MenuItem>
          {userCommunities.map(community => (
            <MenuItem
              key={community.communityId}
              value={community.communityId}
              style={getStyles(community.name, personName, theme)}
              onClick={() => {
                history(`/search-communities?name=${community.name}`);
              }}
            >
              r/{community.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default NavSelectCommunity;
