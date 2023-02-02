// PLUGINS IMPORTS //
import { Button } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type CreateButtonProps = {

};

const CreateButton = (props: CreateButtonProps) => {
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={() => {}}
      sx={[
        {
          "&:hover": {
            backgroundColor: "#000",
            color: "#fff",
          },
          color: "#000",
          backgroundColor: "#fff",
          borderColor: "#000",
          border: "2px solid #000",
          transition: "background-color 0.2s ease",
          height: "2em",
        },
      ]}
    >
      Create Post
    </Button>
  );
};

export default CreateButton;
