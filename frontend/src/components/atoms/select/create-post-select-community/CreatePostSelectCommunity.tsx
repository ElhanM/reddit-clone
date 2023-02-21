// PLUGINS IMPORTS //
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Typography } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./select-community.module.scss";
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

type SelectCommunityProps = {
  setCommunity: (value: string) => void;
  emptyCommunity?: boolean;
};

const SelectCommunity = ({ emptyCommunity, setCommunity }: SelectCommunityProps) => {
  const userCommunities = useSelector(selectAllCommunities);

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
    setCommunity(value as string);
  };

  return (
    <>
      <FormControl
        sx={{
          backgroundColor: "#1a1a1b",
          width: "100%",
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
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: emptyCommunity && "#f44336",
                  }}
                >
                  Communities
                </Typography>
              );
            } else {
              return (
                <Typography variant="subtitle1">
                  {/* find element in userCommunities array with communityId of selected[0] and display the name */}
                  {selected[0] === "Create Community"
                    ? "Create Community"
                    : `r/${userCommunities.find(community => community.communityId === selected[0])?.name}`}
                </Typography>
              );
            }
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            height: "34px",
            padding: "0 !important",
            ".MuiOutlinedInput-notchedOutline": {
              border: emptyCommunity && "1px solid #f44336",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: emptyCommunity && "1px solid #f44336",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: emptyCommunity && "1px solid #f44336",
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
          {userCommunities.map(community => (
            <MenuItem
              key={community.communityId}
              value={community.communityId}
              style={getStyles(community.name, personName, theme)}
            >
              r/{community.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {emptyCommunity && (
        <Typography
          variant="subtitle1"
          sx={{
            color: "#f44336",
            fontSize: "0.75rem",
            marginLeft: "0.7rem",
          }}
        >
          Please select a community
        </Typography>
      )}
    </>
  );
};

export default SelectCommunity;
