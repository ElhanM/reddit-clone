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

/////////////////////////////////////////////////////////////////////////////

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  // reddit communities
  "r/AskReddit",
  "r/aww",
  "r/Coronavirus",
  "r/memes",
  "r/NoStupidQuestions",
  "r/PoliticalHumor",
  "r/mildlyinteresting",
  "r/nextfuckinglevel",
  "r/oddlysatisfying",
  "r/wholesomememes",
  "r/woahdude",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

type SelectCommunityProps = {};

const SelectCommunity = (props: SelectCommunityProps) => {
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
    <div>
      <FormControl
        sx={{
          m: 1,
          width: 300,
          mt: 3,
          marginBottom: 3,
        }}
      >
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={selected => {
            if (selected.length === 0) {
              return <p>Communities</p>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          sx={{ height: "34px", width: "268px" }}
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
          <MenuItem>
            <Typography variant="subtitle1">Create Community</Typography>
          </MenuItem>
          {names.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCommunity;
