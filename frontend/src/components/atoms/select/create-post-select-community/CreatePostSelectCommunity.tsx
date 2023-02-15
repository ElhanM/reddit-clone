// PLUGINS IMPORTS //
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Typography } from "@mui/material";
import { RSlash } from "components/molecules";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./select-community.module.scss";

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

const names = [
  // reddit communities
  "AskReddit",
  "aww",
  "Coronavirus",
  "memes",
  "NoStupidQuestions",
  "PoliticalHumor",
  "mildlyinteresting",
  "nextfuckinglevel",
  "oddlysatisfying",
  "wholesomememes",
  "woahdude",
];

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
            console.log({ selected });
            if (selected.length === 0) {
              return <Typography variant="subtitle1">Communities</Typography>;
            } else {
              return <Typography variant="subtitle1">r/{selected[0]}</Typography>;
            }
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            height: "34px",
            padding: "0 !important",
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
          <MenuItem key={"create-community"} value={"Create Community"}>
            <Typography variant="subtitle1">Create Community</Typography>
          </MenuItem>
          {names.map(name => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              r/{name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {emptyCommunity && "Please select a community"}
    </>
  );
};

export default SelectCommunity;
